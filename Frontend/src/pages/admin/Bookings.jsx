import { useCallback, useEffect, useState } from "react";
import SearchField from "../../components/common/SearchField";
import ChipGroup from "../../components/common/ChipGroup";
import DataTable from "../../components/dashboard/DataTable";
import Pagination from "../../components/dashboard/Pagination";
import StatusBadge from "../../components/dashboard/StatusBadge";
import { usePageMeta } from "../../hooks/usePageMeta";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatBookingDate } from "../../utils/bookingFormatters";
import brand from "../../config/brand";
import apiClient from "../../services/api/apiClient";
import { getAdminProfessionals } from "../../services/api/adminBookingApi";

const STATUS_FILTERS = [
  { value: "", label: "All" },
  { value: "PENDING", label: "Pending" },
  { value: "CONFIRMED", label: "Confirmed" },
  { value: "ASSIGNED", label: "Assigned" },
  { value: "IN_PROGRESS", label: "In progress" },
  { value: "COMPLETED", label: "Completed" },
  { value: "CANCELLED", label: "Cancelled" },
];

function getCustomerName(booking) {
  const user = booking.user ?? booking.customer;

  if (!user) return "—";

  const name = [user.firstName, user.lastName].filter(Boolean).join(" ");

  return name || user.name || user.email || "—";
}

function getServiceName(booking) {
  return (
    booking.service?.name ??
    booking.service?.title ??
    booking.serviceName ??
    "—"
  );
}

function getBookingAmount(booking) {
  return Number(booking.price ?? booking.totalAmount ?? booking.amount ?? 0);
}

function getStatusLabel(status) {
  return String(status ?? "UNKNOWN").toLowerCase();
}

export default function AdminBookings() {
  usePageMeta({ title: `Bookings — ${brand.name} Admin` });

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  const [bookings, setBookings] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalBookings: 0,
    totalPages: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [assignBooking, setAssignBooking] = useState(null);
  const [professionals, setProfessionals] = useState([]);
  const [professionalSearch, setProfessionalSearch] = useState("");
  const [selectedProfessionalId, setSelectedProfessionalId] = useState("");
  const [loadingProfessionals, setLoadingProfessionals] = useState(false);
  const [savingAssignment, setSavingAssignment] = useState(false);
  const [professionalError, setProfessionalError] = useState("");
  const fetchBookings = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await apiClient.get("/admin/bookings", {
        params: {
          page,
          limit: 10,
          search: query.trim() || undefined,
          status: status || undefined,
        },
      });

      const data = response.data;

      setBookings(data.bookings ?? []);
      setPagination(
        data.pagination ?? {
          page,
          limit: 10,
          totalBookings: data.bookings?.length ?? 0,
          totalPages: 1,
        },
      );
    } catch (err) {
      setError(
        err.response?.data?.message ??
          "Unable to load bookings. Please check your login and backend.",
      );
    } finally {
      setLoading(false);
    }
  }, [page, query, status]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  function handleSearch(value) {
    setQuery(value);
    setPage(1);
  }

  function handleStatusChange(value) {
    setStatus(value);
    setPage(1);
  }

  async function openAssignModal(booking) {
    setAssignBooking(booking);
    setSelectedProfessionalId("");
    setProfessionalSearch("");
    setProfessionalError("");
    setLoadingProfessionals(true);

    try {
      const data = await getAdminProfessionals();

      // Only offer active, verified professionals.
      const eligible = data.filter((professional) => {
        const user = professional.user ?? {};
        return (
          professional.isActive === true &&
          professional.isVerified === true &&
          user.isActive !== false &&
          (!user.role || user.role === "PROFESSIONAL")
        );
      });

      setProfessionals(eligible);
    } catch (err) {
      setProfessionals([]);
      setProfessionalError(
        err.response?.data?.message ??
          "Could not load professionals. Please try again.",
      );
    } finally {
      setLoadingProfessionals(false);
    }
  }

  async function confirmAssignment() {
    if (!assignBooking || !selectedProfessionalId) {
      setProfessionalError("Please select a professional first.");
      return;
    }

    setSavingAssignment(true);
    setProfessionalError("");

    try {
      await apiClient.patch(`/bookings/${assignBooking.id}/assign`, {
        professionalId: Number(selectedProfessionalId),
      });

      setAssignBooking(null);
      await fetchBookings();
    } catch (err) {
      setProfessionalError(
        err.response?.data?.message ?? "Assignment failed. Please try again.",
      );
    } finally {
      setSavingAssignment(false);
    }
  }

  const columns = [
    {
      key: "id",
      label: "Booking",
      render: (row) => `#${row.id}`,
    },
    {
      key: "customer",
      label: "Customer",
      render: (row) => (
        <div>
          <p className="font-medium text-ink-900">{getCustomerName(row)}</p>
          <p className="text-xs text-ink-500">
            {row.user?.email ?? row.customer?.email ?? ""}
          </p>
        </div>
      ),
    },
    {
      key: "service",
      label: "Service",
      render: (row) => getServiceName(row),
    },
    {
      key: "date",
      label: "Date",
      render: (row) => {
        const date = row.bookingDate ?? row.date;
        return date ? formatBookingDate(date) : "—";
      },
    },
    {
      key: "amount",
      label: "Amount",
      render: (row) => formatCurrency(getBookingAmount(row)),
    },
    {
      key: "status",
      label: "Status",
      render: (row) => <StatusBadge status={getStatusLabel(row.status)} />,
    },
    {
      key: "professional",
      label: "Professional",
      render: (row) => {
        const professional = row.professional?.user ?? row.professional;

        const name = professional
          ? [professional.firstName, professional.lastName]
              .filter(Boolean)
              .join(" ")
          : "";

        return (
          name ||
          (row.professionalId ? `ID ${row.professionalId}` : "Unassigned")
        );
      },
    },
    {
      key: "actions",
      label: "Actions",
      render: (row) => {
        const canAssign = ["PENDING", "CONFIRMED"].includes(
          String(row.status ?? "").toUpperCase(),
        );

        return canAssign ? (
          <button
            type="button"
            onClick={() => openAssignModal(row)}
            className="rounded-lg border border-[#012663] px-3 py-1.5 text-sm font-medium text-[#012663] hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Assign
          </button>
        ) : (
          <span className="text-sm text-ink-500"></span>
        );
      },
    },
  ];

  return (
    <div className="p-6 sm:p-10">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Booking Management</h1>
          <p className="mt-1 text-sm text-ink-500">
            {pagination.totalBookings} bookings across the platform.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchBookings}
          disabled={loading}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50 disabled:opacity-50"
        >
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SearchField
          value={query}
          onChange={handleSearch}
          placeholder="Search by customer or service"
          className="sm:max-w-xs"
        />

        <ChipGroup
          options={STATUS_FILTERS}
          value={status}
          onChange={handleStatusChange}
          ariaLabel="Filter bookings by status"
        />
      </div>

      {error && (
        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <p>{error}</p>
          <button
            type="button"
            onClick={fetchBookings}
            className="mt-2 font-semibold underline"
          >
            Try again
          </button>
        </div>
      )}

      <div className="mt-6">
        {loading ? (
          <div className="rounded-xl border border-gray-200 bg-white p-8 text-center text-sm text-ink-500">
            Loading bookings from the database...
          </div>
        ) : (
          <>
            <DataTable
              columns={columns}
              rows={bookings}
              emptyMessage="No bookings match your search or status filter."
            />

            {pagination.totalPages > 1 && (
              <Pagination
                page={page}
                pageCount={pagination.totalPages}
                onChange={setPage}
              />
            )}
          </>
        )}
      </div>

      {assignBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  Assign Professional
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Select a professional for booking #{assignBooking.id}.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setAssignBooking(null)}
                disabled={savingAssignment}
                className="rounded-lg px-3 py-1 text-xl text-slate-500 hover:bg-slate-100"
                aria-label="Close assignment dialog"
              >
                ×
              </button>
            </div>

            <input
              type="search"
              value={professionalSearch}
              onChange={(event) => setProfessionalSearch(event.target.value)}
              placeholder="Search by professional name or email"
              className="mt-5 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-[#012663]"
            />

            {professionalError && (
              <p className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                {professionalError}
              </p>
            )}

            <div className="mt-4 max-h-72 space-y-2 overflow-y-auto">
              {loadingProfessionals ? (
                <p className="py-8 text-center text-sm text-slate-500">
                  Loading professionals...
                </p>
              ) : professionals.filter((professional) => {
                  const user = professional.user ?? {};
                  const name = [
                    user.firstName ?? professional.firstName,
                    user.lastName ?? professional.lastName,
                  ]
                    .filter(Boolean)
                    .join(" ");

                  const searchText =
                    `${name} ${user.email ?? professional.email ?? ""}`.toLowerCase();

                  return searchText.includes(
                    professionalSearch.trim().toLowerCase(),
                  );
                }).length === 0 ? (
                <p className="py-8 text-center text-sm text-slate-500">
                  No eligible professionals found.
                </p>
              ) : (
                professionals
                  .filter((professional) => {
                    const user = professional.user ?? {};
                    const name = [
                      user.firstName ?? professional.firstName,
                      user.lastName ?? professional.lastName,
                    ]
                      .filter(Boolean)
                      .join(" ");

                    const searchText =
                      `${name} ${user.email ?? professional.email ?? ""}`.toLowerCase();

                    return searchText.includes(
                      professionalSearch.trim().toLowerCase(),
                    );
                  })
                  .map((professional) => {
                    const user = professional.user ?? {};
                    const name =
                      [
                        user.firstName ?? professional.firstName,
                        user.lastName ?? professional.lastName,
                      ]
                        .filter(Boolean)
                        .join(" ") || "Unnamed Professional";

                    return (
                      <label
                        key={professional.id}
                        className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                          String(selectedProfessionalId) ===
                          String(professional.id)
                            ? "border-[#012663] bg-blue-50"
                            : "border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="professional"
                          value={professional.id}
                          checked={
                            String(selectedProfessionalId) ===
                            String(professional.id)
                          }
                          onChange={(event) =>
                            setSelectedProfessionalId(event.target.value)
                          }
                        />

                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-slate-900">{name}</p>
                          <p className="truncate text-sm text-slate-500">
                            {user.email ??
                              professional.email ??
                              "No email provided"}
                          </p>
                        </div>

                        <span className="text-xs font-medium text-green-700">
                          Verified
                        </span>
                      </label>
                    );
                  })
              )}
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                disabled={savingAssignment}
                onClick={() => setAssignBooking(null)}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={
                  savingAssignment ||
                  loadingProfessionals ||
                  !selectedProfessionalId
                }
                onClick={confirmAssignment}
                className="rounded-lg bg-[#012663] px-5 py-2 text-sm font-semibold text-white hover:bg-[#023B91] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {savingAssignment ? "Assigning..." : "Confirm Assignment"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
