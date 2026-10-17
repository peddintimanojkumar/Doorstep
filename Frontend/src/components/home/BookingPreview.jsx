import { Check, Home, ShieldCheck, User } from "lucide-react";
import Badge from "../common/Badge";
import { heroPreview } from "../../data/home";
import { formatCurrency } from "../../utils/formatCurrency";

function StepMarker({ state }) {
  if (state === "done") {
    return (
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-fern-600 text-white">
        <Check className="h-3 w-3" aria-hidden="true" />
      </span>
    );
  }
  if (state === "current") {
    return (
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-marigold-100 ring-2 ring-marigold-400">
        <span className="h-2 w-2 rounded-full bg-marigold-500" />
      </span>
    );
  }
  return <span className="h-5 w-5 rounded-full border-2 border-stone-300" />;
}

/**
 * BookingPreview
 * Illustrative "sample booking" card for the hero. Purely decorative, so
 * it is hidden from assistive tech. Content comes from data/home.js.
 */
export default function BookingPreview() {
  return (
    <div aria-hidden="true" className="relative">
      <div className="bg-dots absolute -right-6 -top-6 h-full w-full rounded-card opacity-80" />

      <div className="relative rounded-card border border-stone-200 bg-white p-6 shadow-lifted">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-ink-400">Sample booking</p>
          <Badge tone="fern">Confirmed</Badge>
        </div>

        <div className="mt-5 flex items-center gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-control bg-fern-50 text-fern-700">
            <Home className="h-6 w-6" />
          </span>
          <div className="flex-1">
            <p className="font-display text-lg text-ink-800">
              {heroPreview.serviceName}
            </p>
            <p className="text-sm text-ink-500">{heroPreview.packageName}</p>
          </div>
          <div className="text-right">
            <p className="font-display text-lg text-ink-800">
              {formatCurrency(heroPreview.price)}
            </p>
            <p className="text-xs text-ink-400">Indicative</p>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-3 rounded-control bg-stone-50 p-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-marigold-100 text-marigold-700">
            <User className="h-5 w-5" />
          </span>
          <div className="flex-1">
            <p className="text-sm font-medium text-ink-800">
              Your professional
            </p>
            <p className="text-xs text-ink-500">Matched near your address</p>
          </div>
          <ShieldCheck className="h-5 w-5 text-fern-600" />
        </div>

        <ol className="mt-6 space-y-3">
          {heroPreview.steps.map((step) => (
            <li key={step.label} className="flex items-center gap-3">
              <StepMarker state={step.state} />
              <span
                className={`text-sm ${
                  step.state === "upcoming" ? "text-ink-400" : "text-ink-700"
                } ${step.state === "current" ? "font-medium" : ""}`}
              >
                {step.label}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
