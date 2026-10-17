const bcrypt = require("bcryptjs");
const prisma = require("../src/config/prisma");

const TEST_PASSWORD = "Doorstep@Test123";

const customers = Array.from({ length: 20 }, (_, index) => {
  const number = String(index + 1).padStart(2, "0");

  return {
    firstName: `TestCustomer${number}`,
    lastName: "Doorstep",
    email: `test.customer${number}@doorstep.test`,
    phone: `888880${String(1000 + index)}`,
    role: "CUSTOMER",
  };
});

const professionals = Array.from({ length: 10 }, (_, index) => {
  const number = String(index + 1).padStart(2, "0");

  return {
    firstName: `TestProfessional${number}`,
    lastName: "Doorstep",
    email: `test.professional${number}@doorstep.test`,
    phone: `888881${String(1000 + index)}`,
    role: "PROFESSIONAL",
    experienceYears: (index % 8) + 1,
    isVerified: index < 7,
  };
});

async function seedTestAccounts() {
  const hashedPassword = await bcrypt.hash(TEST_PASSWORD, 10);

  let customerCount = 0;
  let professionalCount = 0;

  for (const customer of customers) {
    await prisma.user.upsert({
      where: { email: customer.email },
      update: {
        firstName: customer.firstName,
        lastName: customer.lastName,
        phone: customer.phone,
        password: hashedPassword,
        role: "CUSTOMER",
        isActive: true,
      },
      create: {
        ...customer,
        password: hashedPassword,
        isActive: true,
      },
    });

    customerCount++;
  }

  for (const professional of professionals) {
    const user = await prisma.user.upsert({
      where: { email: professional.email },
      update: {
        firstName: professional.firstName,
        lastName: professional.lastName,
        phone: professional.phone,
        password: hashedPassword,
        role: "PROFESSIONAL",
        isActive: true,
      },
      create: {
        firstName: professional.firstName,
        lastName: professional.lastName,
        email: professional.email,
        phone: professional.phone,
        password: hashedPassword,
        role: "PROFESSIONAL",
        isActive: true,
      },
    });

    await prisma.professional.upsert({
      where: { userId: user.id },
      update: {
        bio: `Test professional profile ${professional.firstName}`,
        experienceYears: professional.experienceYears,
        isVerified: professional.isVerified,
        isActive: true,
      },
      create: {
        userId: user.id,
        bio: `Test professional profile ${professional.firstName}`,
        experienceYears: professional.experienceYears,
        isVerified: professional.isVerified,
        isActive: true,
      },
    });

    professionalCount++;
  }

  console.log("\nTest accounts seeded successfully.");
  console.log(`Customers processed: ${customerCount}`);
  console.log(`Professionals processed: ${professionalCount}`);
  console.log(`Shared password: ${TEST_PASSWORD}`);
  console.log("Existing non-test accounts were not targeted.");
  console.log("\nProfessional verification setup:");
  console.log("Professionals 01–07: Verified");
  console.log("Professionals 08–10: Not verified");
  console.log("\nCustomer login: test.customer01@doorstep.test");
  console.log("Professional login: test.professional01@doorstep.test");
}

seedTestAccounts()
  .catch((error) => {
    console.error("Failed to seed test accounts:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });