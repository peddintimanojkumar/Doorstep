import { Clock } from "lucide-react";
import Button from "../common/Button";
import Badge from "../common/Badge";
import { getIcon } from "../../utils/iconMap";
import { formatCurrency } from "../../utils/formatCurrency";
import { ROUTES } from "../../constants/routes";

// Automatically load all service images
const serviceImages = import.meta.glob("../../assets/services/*.png", {
  eager: true,
  query: "?url",
  import: "default",
});


const SERVICE_IMAGE_ALIASES = {
  "bathroom-cleaning": ["bathroom-cleaning", "bathroom-cleaning (1)"],
  carpenter: ["carpenter", "carpenter-services"],
  "carpenter-services": ["carpenter-services", "carpenter"],
  "long-term-care": ["long-term-care", "long-term-child-elder-care"],
  "move-in-move-out-cleaning": [
    "move-in-move-out-cleaning",
    "move-in-out-cleaning",
  ],
  "move-in-out-cleaning": [
    "move-in-out-cleaning",
    "move-in-move-out-cleaning",
  ],
  "plant-maintenance": [
    "plant-maintenance",
    "regular-plant-maintenance",
  ],
  "salon-for-women": ["salon-for-women", "salon-women"],
  "salon-grooming-for-men": [
    "salon-grooming-for-men",
    "salon-men",
  ],
};

function getServiceImage(slug) {
  if (!slug) return null;

  const filenames = [
    ...(SERVICE_IMAGE_ALIASES[slug] || []),
    slug,
  ];

  for (const filename of filenames) {
    const imagePath = `../../assets/services/${filename}.png`;
    if (serviceImages[imagePath]) {
      return serviceImages[imagePath];
    }
  }

  return null;
}

/**
 * ServiceCard
 * Displays service image, name, description, duration,
 * starting price and booking actions.
 */
export default function ServiceCard({ service }) {
  const Icon = getIcon(service.icon);
  const hasPrice = service.startingPrice !== null;

  const image = getServiceImage(service.slug) || service.image || null;

  return (
    <article
      className=" group 
                  flex
                  h-full
                  flex-col
                  rounded-card
                  border
                  border-stone-200
                  bg-[#F3F4F6]
                  p-6
                  shadow-rest
                  hover:shadow-lifted"
    >
      {/* Service Image */}
      {image ? (
        <img
          src={image}
          alt={service.name}
          loading="lazy"
          className="aspect-[16/9] 
          w-full
          object-cover
          object-center
          transition-transform
          duration-300
          ease-out
          group-hover:scale-[1.05]"
        />
      ) : (
        <span
          className="mb-5
                    flex
                    aspect-[16/9]
                    w-full
                    items-center
                    justify-center
                    rounded-control
                    bg-[#012663]/10
                    text-[#012663]"
        >
          {Icon && <icon className="h-12 w-12" aria-hidden="true" />}
        </span>
      )}

      {/* Category */}
      <Badge className="mt-1 self-start">{service.category}</Badge>

      {/* Service Name */}
      <h3 className="mt-3 text-xl">{service.name}</h3>

      {/* Description */}
      <p className="mt-2 text-sm text-ink-500">{service.shortDescription}</p>

      {/* Duration */}
      {service.duration && (
        <p className="mt-3 flex items-center gap-1.5 text-xs text-ink-500">
          <Clock className="h-3.5 w-3.5" aria-hidden="true" />

          {typeof service.duration === "number"
            ? `${service.duration} minutes`
            : service.duration?.label}
        </p>
      )}

      {/* Price + Buttons */}
      <div className="mt-auto pt-6">
        <p className="text-xs text-ink-400">
          {hasPrice ? "Starting from" : "Pricing"}
        </p>

        <p className="font-display text-2xl text-ink-800">
          {hasPrice ? formatCurrency(service.startingPrice) : "On request"}
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <Button
            to={ROUTES.serviceDetails(service.slug)}
            variant="secondary"
            size="sm"
          >
            View Details
          </Button>

          <Button to={`${ROUTES.BOOKING}?service=${service.slug}`} size="sm">
            Book Now
          </Button>
        </div>
      </div>
    </article>
  );
}
