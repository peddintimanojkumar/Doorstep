const STATUS_STYLES = {
  // Professional job status
  pending: {
    label: "New request",
    className: "bg-[#012663]/10 text-[#012663]",
  },

  // Customer booking / professional scheduled status
  upcoming: {
    label: "Upcoming",
    className: "bg-blue-50 text-[#012663]",
  },

  // Active service/job
  active: {
    label: "Active",
    className: "bg-fern-50 text-fern-700",
  },

  // Completed service/job
  completed: {
    label: "Completed",
    className: "bg-stone-100 text-ink-600",
  },

  // Customer booking
  cancelled: {
    label: "Cancelled",
    className: "bg-red-50 text-red-700",
  },

  // Professional job
  declined: {
    label: "Declined",
    className: "bg-stone-100 text-ink-600",
  },
};

export default function StatusBadge({ status }) {
  const config = STATUS_STYLES[status] || {
    label: status || "Unknown",
    className: "bg-stone-100 text-ink-600",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  );
}
