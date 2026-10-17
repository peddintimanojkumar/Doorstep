import { useMemo, useState } from "react";
import SearchField from "../../components/common/SearchField";
import ChipGroup from "../../components/common/ChipGroup";
import Badge from "../../components/common/Badge";
import DataTable from "../../components/dashboard/DataTable";
import Pagination from "../../components/dashboard/Pagination";
import { usePagination } from "../../hooks/usePagination";
import { usePageMeta } from "../../hooks/usePageMeta";
import { payments } from "../../data/admin";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatBookingDate } from "../../utils/bookingFormatters";
import brand from "../../config/brand";

const STATUS_FILTERS = [
  { value: "", label: "All" },
  { value: "paid", label: "Paid" },
  { value: "pending", label: "Pending" },
  { value: "refunded", label: "Refunded" },
];

const STATUS_TONES = { paid: "fern", pending: "marigold", refunded: "neutral" };

export default function AdminPayments() {
  usePageMeta({ title: `Payments — ${brand.name} Admin` });

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return payments.filter((payment) => {
      const matchesQuery =
        !needle ||
        payment.customerName.toLowerCase().includes(needle) ||
        payment.bookingId.toLowerCase().includes(needle);
      const matchesStatus = !status || payment.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [query, status]);

  const { page, setPage, pageCount, pageItems } = usePagination(filtered, 6);

  const columns = [
    { key: "id", label: "Payment" },
    { key: "bookingId", label: "Booking" },
    { key: "customerName", label: "Customer" },
    {
      key: "amount",
      label: "Amount",
      render: (row) => formatCurrency(row.amount),
    },
    { key: "method", label: "Method" },
    {
      key: "date",
      label: "Date",
      render: (row) => formatBookingDate(row.date),
    },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <Badge tone={STATUS_TONES[row.status]}>
          {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
        </Badge>
      ),
    },
  ];

  return (
    <div className="p-6 sm:p-10">
      <h1 className="text-2xl">Payments</h1>
      <p className="mt-1 text-sm text-ink-500">
        {payments.length} transactions on the platform.
      </p>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SearchField
          value={query}
          onChange={setQuery}
          placeholder="Search by customer or booking ID"
          className="sm:max-w-xs"
        />
        <ChipGroup
          options={STATUS_FILTERS}
          value={status}
          onChange={setStatus}
          ariaLabel="Filter by status"
        />
      </div>

      <div className="mt-6">
        <DataTable
          columns={columns}
          rows={pageItems}
          emptyMessage="No payments match your search."
        />
        <Pagination page={page} pageCount={pageCount} onChange={setPage} />
      </div>
    </div>
  );
}
