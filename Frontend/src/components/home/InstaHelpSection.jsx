import { Zap } from "lucide-react";
import Button from "../common/Button";
import Badge from "../common/Badge";
import { instaHelp } from "../../data/home";
import { getIcon } from "../../utils/iconMap";
import { ROUTES } from "../../constants/routes";

export default function InstaHelpSection() {
  return (
    <section className="pb-16 sm:pb-20">
      <div className="container">
        <div className="grid gap-10 rounded-card bg-fern-800 p-8 text-white sm:p-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Badge tone="inverse">
              <Zap className="h-3.5 w-3.5" aria-hidden="true" />
              InstaHelp
            </Badge>
            <h2 className="mt-5 text-3xl leading-tight tracking-tight text-white sm:text-4xl">
              {instaHelp.title}
            </h2>
            <p className="mt-4 max-w-md text-lg text-fern-100">
              {instaHelp.description}
            </p>
            <Button
              to={`${ROUTES.BOOKING}?service=instahelp`}
              size="lg"
              className="mt-8"
            >
              {instaHelp.cta}
            </Button>
          </div>

          <ul className="grid gap-3 sm:grid-cols-2">
            {instaHelp.items.map((item) => {
              const Icon = getIcon(item.icon);
              return (
                <li
                  key={item.label}
                  className="flex items-center gap-3 rounded-control bg-white/10 px-4 py-3"
                >
                  <Icon
                    className="h-5 w-5 shrink-0 text-marigold-300"
                    aria-hidden="true"
                  />
                  <span className="text-sm">{item.label}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
