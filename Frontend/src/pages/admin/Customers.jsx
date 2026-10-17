import { useEffect, useState } from "react";

import SearchField from "../../components/common/SearchField";
import ChipGroup from "../../components/common/ChipGroup";
import Badge from "../../components/common/Badge";
import DataTable from "../../components/dashboard/DataTable";
import Pagination from "../../components/dashboard/Pagination";
import { usePageMeta } from "../../hooks/usePageMeta";
import { formatBookingDate } from "../../utils/bookingFormatters";
import brand from "../../config/brand";
import apiClient from "../../services/api/apiClient";

const STATUS_FILTERS = [
  { value: "", label: "All" },
  { value: "active", label: "Active" },
  { value: "suspended", label: "Suspended" },
];

const PAGE_SIZE = 6;

export default function AdminCustomers() {
  usePageMeta({ title: `Customers — ${brand.name} Admin` });

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  const [customers, setCustomers] = useState([]);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const loadCustomers = async () => {
      setLoading(true);
      setError("");

      try {
        const params = {
          page,
          limit: PAGE_SIZE,
          role: "CUSTOMER",
        };

        if (query.trim()) {
          params.search = query.trim();
        }

        if (status === "active") {
          params.isActive = "true";
        } else if (status === "suspended") {
          params.isActive = "false";
        }

        const response = await apiClient.get("/admin/users", { params });
        const data = response.data;

        if (cancelled) return;

        const users = Array.isArray(data.users) ? data.users : [];

        const mappedCustomers = users.map((user) => ({
          id: user.id,
          name:
            [user.firstName, user.lastName].filter(Boolean).join(" ") ||
            "Unnamed Customer",
          email: user.email || "—",
          mobile: user.phone || "—",
          joinedDate: user.createdAt,
          totalBookings: user._count?.bookings ?? 0,
          status: user.isActive ? "active" : "suspended",
        }));

        setCustomers(mappedCustomers);
        setTotalCustomers(data.pagination?.totalUsers ?? users.length);
        setPageCount(Math.max(1, data.pagination?.totalPages ?? 1));
      } catch (err) {
        if (cancelled) return;

        console.error(
          "Failed to load customers:",
          err.response?.data || err,
        );

        setError(
          err.response?.data?.message ||
            "Unable to load customers. Check the backend connection and try again.",
        );

        setCustomers([]);
        setTotalCustomers(0);
        setPageCount(1);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadCustomers();

    return () => {
      cancelled = true;
    };
  }, [page, query, status]);

  const handleSearch = (value) => {
    setQuery(value);
    setPage(1);
  };

  const handleStatusChange = (value) => {
    setStatus(value);
    setPage(1);
  };

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "mobile", label: "Mobile" },
    {
      key: "joinedDate",
      label: "Joined",
      render: (row) =>
        row.joinedDate ? formatBookingDate(row.joinedDate) : "—",
    },
    { key: "totalBookings", label: "Bookings" },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <Badge tone={row.status === "active" ? "fern" : "neutral"}>
          {row.status === "active" ? "Active" : "Suspended"}
        </Badge>
      ),
    },
  ];

  return (
    <div className="p-6 sm:p-10">
      <h1 className="text-2xl">Customers</h1>

      <p className="mt-1 text-sm text-ink-500">
        {totalCustomers} customers found.
      </p>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SearchField
          value={query}
          onChange={handleSearch}
          placeholder="Search by name or email"
          className="sm:max-w-xs"
        />

        <ChipGroup
          options={STATUS_FILTERS}
          value={status}
          onChange={handleStatusChange}
          ariaLabel="Filter by status"
        />
      </div>

      <div className="mt-6">
        {error ? (
          <div
            className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
            role="alert"
          >
            <p>{error}</p>
            <button
              type="button"
              className="mt-2 font-medium underline"
              onClick={() => setPage((current) => current)}
            >
              Try again
            </button>
          </div>
        ) : loading ? (
          <p className="py-10 text-center text-sm text-ink-500">
            Loading customers from the database...
          </p>
        ) : (
          <>
            <DataTable
              columns={columns}
              rows={customers}
              emptyMessage="No customers match your search."
            />

            {totalCustomers > 0 && (
              <Pagination
                page={page}
                pageCount={pageCount}
                onChange={setPage}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}