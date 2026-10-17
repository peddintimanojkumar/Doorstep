import { useEffect, useMemo, useState } from "react";
import SearchField from "../../components/common/SearchField";
import ChipGroup from "../../components/common/ChipGroup";
import Badge from "../../components/common/Badge";
import DataTable from "../../components/dashboard/DataTable";
import Pagination from "../../components/dashboard/Pagination";
import { usePagination } from "../../hooks/usePagination";
import { usePageMeta } from "../../hooks/usePageMeta";
import brand from "../../config/brand";
import apiClient from "../../services/api/apiClient";

const VERIFICATION_FILTERS = [
  { value: "", label: "All" },
  { value: "verified", label: "Verified" },
  { value: "pending", label: "Pending" },
];

export default function AdminProfessionals() {
  usePageMeta({ title: `Professionals — ${brand.name} Admin` });

  const [professionals, setProfessionals] = useState([]);
  const [query, setQuery] = useState("");
  const [verification, setVerification] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadProfessionals() {
      setLoading(true);
      setError("");

      try {
        const limit = 100;
        const firstResponse = await apiClient.get("/admin/professionals", {
          params: { page: 1, limit },
        });

        const firstData = firstResponse.data;
        const allProfessionals = [...(firstData.professionals || [])];
        const totalPages = firstData.pagination?.totalPages || 1;

        for (let page = 2; page <= totalPages; page += 1) {
          const response = await apiClient.get("/admin/professionals", {
            params: { page, limit },
          });

          allProfessionals.push(...(response.data.professionals || []));
        }

        if (!cancelled) {
          setProfessionals(
            allProfessionals.map((professional) => ({
              id: professional.id,
              name: [professional.user?.firstName, professional.user?.lastName]
                .filter(Boolean)
                .join(" "),
              experience:
                professional.experienceYears == null
                  ? "—"
                  : `${professional.experienceYears} years`,
              jobsCompleted: professional._count?.bookings ?? 0,
              verification: professional.isVerified ? "verified" : "pending",
              status:
                professional.isActive && professional.user?.isActive
                  ? "active"
                  : "suspended",
            })),
          );
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err.response?.data?.message ||
              "Unable to load professionals. Please check your admin login.",
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadProfessionals();

    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return professionals.filter((professional) => {
      const matchesQuery =
        !needle || professional.name.toLowerCase().includes(needle);

      const matchesVerification =
        !verification || professional.verification === verification;

      return matchesQuery && matchesVerification;
    });
  }, [professionals, query, verification]);

  const { page, setPage, pageCount, pageItems } = usePagination(filtered, 6);

  const columns = [
    { key: "name", label: "Name" },
    { key: "experience", label: "Experience" },
    {
      key: "jobsCompleted",
      label: "Bookings",
    },
    {
      key: "verification",
      label: "Verification",
      render: (row) => (
        <Badge tone={row.verification === "verified" ? "fern" : "marigold"}>
          {row.verification === "verified" ? "Verified" : "Pending"}
        </Badge>
      ),
    },
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
      <h1 className="text-2xl">Professionals</h1>
      <p className="mt-1 text-sm text-ink-500">
        {professionals.length} total professionals on the platform.
      </p>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SearchField
          value={query}
          onChange={setQuery}
          placeholder="Search by name"
          className="sm:max-w-xs"
        />
        <ChipGroup
          options={VERIFICATION_FILTERS}
          value={verification}
          onChange={setVerification}
          ariaLabel="Filter by verification status"
        />
      </div>

      {error && (
        <p
          role="alert"
          className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700"
        >
          {error}
        </p>
      )}

      <div className="mt-6">
        {loading ? (
          <p className="py-8 text-sm text-ink-500">Loading professionals...</p>
        ) : (
          <>
            <DataTable
              columns={columns}
              rows={pageItems}
              emptyMessage="No professionals match your search."
            />
            <Pagination page={page} pageCount={pageCount} onChange={setPage} />
          </>
        )}
      </div>
    </div>
  );
}
