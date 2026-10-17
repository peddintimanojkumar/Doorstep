/**
 * Doorstep catalogue seed script.
 * Run from the project root with: node Backend/scripts/seedCatalog.cjs
 * Uses the existing frontend catalogue as the source of truth.
 * Idempotent: updates matching services rather than inserting duplicates.
 */
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const prisma = require('../src/config/prisma');

const legacyCategoryNames = {
  care: 'Home Cleaning Services',
  home: 'Plumbing Services',
};

const durationToMinutes = (duration) => {
  if (!duration || typeof duration !== 'object') return null;
  if (duration.bucket === 'up-to-1h') return 60;
  if (duration.bucket === '1-3h') return 120;
  // Ongoing/recurring services have no single visit duration.
  return null;
};

async function loadFrontendCatalogue() {
  const frontendRoot = path.resolve(__dirname, '../../Frontend/src/data');
  const categoriesUrl = pathToFileURL(path.join(frontendRoot, 'categories.js')).href;
  const detailsUrl = pathToFileURL(path.join(frontendRoot, 'services.js')).href;
  const [categoryModule, detailsModule] = await Promise.all([
    import(categoriesUrl),
    import(detailsUrl),
  ]);
  return {
    serviceCatalog: categoryModule.default,
    categoryGroups: categoryModule.categoryGroups,
    serviceDetails: detailsModule.default,
  };
}

async function ensureGroupCategory(group, categoryIds) {
  let category = await prisma.category.findUnique({ where: { name: group.label } });
  if (category) {
    categoryIds[group.id] = category.id;
    return;
  }

  // Preserve existing category IDs for the two known test categories.
  const legacyName = legacyCategoryNames[group.id];
  if (legacyName) {
    const legacy = await prisma.category.findUnique({ where: { name: legacyName } });
    if (legacy) {
      category = await prisma.category.update({
        where: { id: legacy.id },
        data: { name: group.label, isActive: true },
      });
      categoryIds[group.id] = category.id;
      return;
    }
  }

  category = await prisma.category.create({
    data: {
      name: group.label,
      description: `Doorstep ${group.label.toLowerCase()} services`,
      isActive: true,
    },
  });
  categoryIds[group.id] = category.id;
}

async function main() {
  const { serviceCatalog, categoryGroups, serviceDetails } = await loadFrontendCatalogue();
  const names = new Set(serviceCatalog.map((item) => item.name.toLowerCase()));
  const existingServices = await prisma.service.findMany({
    select: { id: true, name: true, isActive: true },
  });

  // Stop instead of silently reclassifying any unexpected records.
  const unknown = existingServices.filter((service) => !names.has(service.name.toLowerCase()));
  if (unknown.length) {
    throw new Error(
      `Seed stopped: existing service records are not in the frontend catalogue: ${unknown
        .map((service) => `${service.id}:${service.name}`)
        .join(', ')}. Review these records before seeding.`,
    );
  }

  const categoryIds = {};
  for (const group of categoryGroups.filter((item) => item.id !== 'all')) {
    await ensureGroupCategory(group, categoryIds);
  }

  let created = 0;
  let updated = 0;
  for (const item of serviceCatalog) {
    const details = serviceDetails[item.slug] || {};
    const categoryId = categoryIds[item.group];
    if (!categoryId) throw new Error(`No database category for service group: ${item.group}`);

    const data = {
      categoryId,
      name: item.name,
      description: details.shortDescription || `${item.name} provided by Doorstep.`,
      // Images are resolved from the existing Vite asset catalogue by service slug.
      // Avoid storing /src/assets paths as public URLs in the database.
      image: null,
      price: details.startingPrice == null ? null : Number(details.startingPrice),
      duration: durationToMinutes(details.duration),
      isActive: true,
    };

    const existing = await prisma.service.findFirst({ where: { name: item.name } });
    if (existing) {
      await prisma.service.update({ where: { id: existing.id }, data });
      updated += 1;
    } else {
      await prisma.service.create({ data });
      created += 1;
    }
  }

  const [activeCount, activeCategoryCount] = await Promise.all([
    prisma.service.count({ where: { isActive: true } }),
    prisma.category.count({ where: { isActive: true } }),
  ]);
  console.log(`Catalogue seed complete. Created ${created}, updated ${updated} services.`);
  console.log(`Active services: ${activeCount}; active categories: ${activeCategoryCount}.`);
  console.log('Expected catalogue size: 30 services and 4 category groups.');
}

main()
  .catch((error) => {
    console.error('Catalogue seed failed:', error.message || error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
