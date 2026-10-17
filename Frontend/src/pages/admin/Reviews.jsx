import {
  CalendarDays,
  ChevronDown,
  Eye,
  MessageSquare,
  Search,
  Star,
  ThumbsUp,
  UserRound,
} from "lucide-react";
import { useMemo, useState } from "react";

import { usePageMeta } from "../../hooks/usePageMeta";
import brand from "../../config/brand";

const REVIEWS = [
  {
    id: "REV-1001",
    customer: "Ananya Rao",
    service: "Home Cleaning",
    professional: "Rajesh Kumar",
    rating: 5,
    date: "2026-10-01",
    title: "Excellent service",
    comment:
      "The professional arrived on time and completed the cleaning very carefully. The service was excellent.",
    status: "Published",
  },
  {
    id: "REV-1002",
    customer: "Rahul Nair",
    service: "Plumbing",
    professional: "Suresh Reddy",
    rating: 4,
    date: "2026-09-29",
    title: "Good service",
    comment:
      "The plumbing issue was identified quickly and fixed properly. Overall, a good experience.",
    status: "Published",
  },
  {
    id: "REV-1003",
    customer: "Meera Iyer",
    service: "Pet Care",
    professional: "Priya Sharma",
    rating: 5,
    date: "2026-09-27",
    title: "Very professional",
    comment:
      "Very friendly and professional service. My pet was handled with great care.",
    status: "Published",
  },
  {
    id: "REV-1004",
    customer: "Vikram Shah",
    service: "Elder Care",
    professional: "Lakshmi Devi",
    rating: 4,
    date: "2026-09-25",
    title: "Helpful service",
    comment:
      "The caregiver was polite, punctual and helpful throughout the booking.",
    status: "Published",
  },
  {
    id: "REV-1005",
    customer: "Sneha Gupta",
    service: "Electrical",
    professional: "Manoj Tiwari",
    rating: 3,
    date: "2026-09-23",
    title: "Average experience",
    comment:
      "The issue was resolved, although the service took longer than expected.",
    status: "Pending",
  },
  {
    id: "REV-1006",
    customer: "Priya Menon",
    service: "Vehicle Cleaning",
    professional: "Arun Kumar",
    rating: 5,
    date: "2026-09-20",
    title: "Great work",
    comment:
      "The vehicle was cleaned very well. I would definitely use this service again.",
    status: "Published",
  },
  {
    id: "REV-1007",
    customer: "Farhan Ahmed",
    service: "Carpenter",
    professional: "Imran Qureshi",
    rating: 2,
    date: "2026-09-18",
    title: "Needs improvement",
    comment:
      "The work was completed but the finishing quality could have been better.",
    status: "Pending",
  },
  {
    id: "REV-1008",
    customer: "Pooja Desai",
    service: "Salon Women",
    professional: "Neha Singh",
    rating: 5,
    date: "2026-09-16",
    title: "Amazing experience",
    comment:
      "Very professional and friendly service. Everything was handled perfectly.",
    status: "Published",
  },
];

const STATUS_OPTIONS = ["All", "Published", "Pending"];

const RATING_OPTIONS = [
  "All ratings",
  "5 Stars",
  "4 Stars",
  "3 Stars",
  "2 Stars",
  "1 Star",
];

export default function AdminReviews() {
  usePageMeta({
    title: `Reviews — ${brand.name} Admin`,
    description: "Manage customer reviews and ratings.",
  });

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [rating, setRating] = useState("All ratings");

  const filteredReviews = useMemo(() => {
    const query = search.trim().toLowerCase();

    return REVIEWS.filter((review) => {
      const matchesSearch =
        !query ||
        review.customer.toLowerCase().includes(query) ||
        review.service.toLowerCase().includes(query) ||
        review.professional.toLowerCase().includes(query) ||
        review.title.toLowerCase().includes(query);

      const matchesStatus = status === "All" || review.status === status;

      const selectedRating =
        rating === "All ratings" ? null : Number(rating.charAt(0));

      const matchesRating =
        selectedRating === null || review.rating === selectedRating;

      return matchesSearch && matchesStatus && matchesRating;
    });
  }, [search, status, rating]);

  const totalReviews = REVIEWS.length;

  const publishedReviews = REVIEWS.filter(
    (review) => review.status === "Published",
  ).length;

  const pendingReviews = REVIEWS.filter(
    (review) => review.status === "Pending",
  ).length;

  const averageRating =
    REVIEWS.reduce((sum, review) => sum + review.rating, 0) / REVIEWS.length;

  return (
    <div className="min-h-screen bg-[#F5F8FC] p-5 sm:p-7 lg:p-10">
      {/* HEADER */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-[#1268E8]">
            Customer feedback
          </p>

          <h1 className="mt-1 text-3xl font-bold text-[#012663]">Reviews</h1>

          <p className="mt-2 text-sm text-[#60728D]">
            Review customer feedback and monitor service quality.
          </p>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={MessageSquare}
          label="Total Reviews"
          value={totalReviews}
          iconClass="bg-[#EAF2FF] text-[#1268E8]"
        />

        <StatCard
          icon={Star}
          label="Average Rating"
          value={`${averageRating.toFixed(1)} / 5`}
          iconClass="bg-orange-50 text-orange-500"
        />

        <StatCard
          icon={ThumbsUp}
          label="Published"
          value={publishedReviews}
          iconClass="bg-green-50 text-green-600"
        />

        <StatCard
          icon={MessageSquare}
          label="Pending Review"
          value={pendingReviews}
          iconClass="bg-purple-50 text-purple-600"
        />
      </div>

      {/* MAIN CARD */}
      <div className="mt-8 rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* FILTER BAR */}
        <div className="border-b border-slate-200 p-5">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            {/* SEARCH */}
            <div className="relative w-full xl:max-w-md">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search customer, service or professional..."
                className="h-11 w-full rounded-xl border border-slate-200 bg-[#F8FAFD] pl-11 pr-4 text-sm text-[#102A54] outline-none transition placeholder:text-slate-400 focus:border-[#1268E8] focus:ring-4 focus:ring-[#1268E8]/10"
              />
            </div>

            {/* FILTERS */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <SelectFilter
                value={status}
                onChange={setStatus}
                options={STATUS_OPTIONS}
              />

              <SelectFilter
                value={rating}
                onChange={setRating}
                options={RATING_OPTIONS}
              />
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-[#F8FAFD] text-left">
                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Customer
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Service
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Professional
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Rating
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Review
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Date
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredReviews.map((review) => (
                <tr
                  key={review.id}
                  className="border-b border-slate-100 transition hover:bg-[#F8FAFD]"
                >
                  {/* CUSTOMER */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#DCEAFF] font-semibold text-[#1268E8]">
                        {review.customer.charAt(0)}
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-[#102A54]">
                          {review.customer}
                        </p>

                        <p className="text-xs text-slate-500">{review.id}</p>
                      </div>
                    </div>
                  </td>

                  {/* SERVICE */}
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-[#31476A]">
                      {review.service}
                    </p>
                  </td>

                  {/* PROFESSIONAL */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <UserRound className="h-4 w-4 text-slate-400" />

                      <span className="text-sm text-[#31476A]">
                        {review.professional}
                      </span>
                    </div>
                  </td>

                  {/* RATING */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          className={`h-4 w-4 ${
                            index < review.rating
                              ? "fill-[#FFB52E] text-[#FFB52E]"
                              : "text-slate-300"
                          }`}
                        />
                      ))}

                      <span className="ml-1 text-sm font-semibold text-[#31476A]">
                        {review.rating}.0
                      </span>
                    </div>
                  </td>

                  {/* REVIEW */}
                  <td className="max-w-[320px] px-5 py-4">
                    <p className="text-sm font-semibold text-[#102A54]">
                      {review.title}
                    </p>

                    <p className="mt-1 truncate text-xs text-slate-500">
                      {review.comment}
                    </p>
                  </td>

                  {/* DATE */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 whitespace-nowrap">
                      <CalendarDays className="h-4 w-4 text-slate-400" />

                      <span className="text-sm text-[#31476A]">
                        {formatDate(review.date)}
                      </span>
                    </div>
                  </td>

                  {/* STATUS */}
                  <td className="px-5 py-4">
                    <StatusBadge status={review.status} />
                  </td>

                  {/* ACTION */}
                  <td className="px-5 py-4">
                    <button
                      type="button"
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-[#1268E8] transition hover:bg-[#EAF2FF]"
                      title="View review"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* EMPTY STATE */}
        {filteredReviews.length === 0 && (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#EAF2FF] text-[#1268E8]">
              <Search className="h-6 w-6" />
            </div>

            <h3 className="mt-4 text-lg font-semibold text-[#102A54]">
              No reviews found
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Try changing your search or filters.
            </p>
          </div>
        )}

        {/* FOOTER */}
        <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-[#31476A]">
              {filteredReviews.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-[#31476A]">
              {REVIEWS.length}
            </span>{" "}
            reviews
          </p>

          <p className="text-xs text-slate-400">Review management</p>
        </div>
      </div>
    </div>
  );
}

/* =============================================================
   STAT CARD
============================================================= */

function StatCard({ icon: Icon, label, value, iconClass }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClass}`}
        >
          <Icon className="h-5 w-5" />
        </div>

        <ChevronDown className="h-4 w-4 rotate-[-90deg] text-slate-300" />
      </div>

      <p className="mt-5 text-2xl font-bold text-[#012663]">{value}</p>

      <p className="mt-1 text-sm text-slate-500">{label}</p>
    </div>
  );
}

/* =============================================================
   SELECT FILTER
============================================================= */

function SelectFilter({ value, onChange, options }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 min-w-[150px] appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-10 text-sm font-medium text-[#31476A] outline-none transition focus:border-[#1268E8] focus:ring-4 focus:ring-[#1268E8]/10"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
    </div>
  );
}

/* =============================================================
   STATUS BADGE
============================================================= */

function StatusBadge({ status }) {
  const published = status === "Published";

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
        published
          ? "bg-green-50 text-green-600"
          : "bg-orange-50 text-orange-600"
      }`}
    >
      {status}
    </span>
  );
}

/* =============================================================
   DATE FORMATTER
============================================================= */

function formatDate(value) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}
