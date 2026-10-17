import { useCallback, useEffect, useState } from "react";
import {
  Search,
  RefreshCw,
  CheckCircle,
  XCircle,
  Eye,
  FileText,
  LoaderCircle,
} from "lucide-react";

import apiClient from "../../services/api/apiClient";

const STATUS_OPTIONS = ["ALL", "PENDING", "APPROVED", "REJECTED"];

function StatusBadge({ status }) {
  const styles = {
    PENDING: "bg-amber-50 text-amber-700 ring-amber-200",
    APPROVED: "bg-green-50 text-green-700 ring-green-200",
    REJECTED: "bg-red-50 text-red-700 ring-red-200",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ${
        styles[status] || "bg-slate-100 text-slate-700 ring-slate-200"
      }`}
    >
      {status || "UNKNOWN"}
    </span>
  );
}

export default function ProfessionalApplications() {
  const [applications, setApplications] = useState([]);
  const [status, setStatus] = useState("PENDING");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    totalApplications: 0,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(true);
  const [reviewingId, setReviewingId] = useState(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const loadApplications = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const params = { page, limit: 10 };

      if (status !== "ALL") params.status = status;
      if (search.trim()) params.search = search.trim();

      const response = await apiClient.get("/admin/professional-applications", {
        params,
      });

      const data = response.data;

      setApplications(data.applications || []);
      setPagination({
        totalApplications:
          data.pagination?.totalApplications ?? data.pagination?.total ?? 0,
        totalPages: data.pagination?.totalPages ?? 1,
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to load professional applications. Check the backend API and admin login.",
      );
    } finally {
      setLoading(false);
    }
  }, [page, status, search]);

  useEffect(() => {
    let cancelled = false;

    queueMicrotask(() => {
      if (!cancelled) {
        loadApplications();
      }
    });

    return () => {
      cancelled = true;
    };
  }, [loadApplications]);

  async function reviewApplication(application, decision) {
    const reviewNotes = window.prompt(
      decision === "APPROVED"
        ? "Optional approval notes:"
        : "Enter a reason for rejection:",
      "",
    );

    if (reviewNotes === null) return;

    if (decision === "REJECTED" && !reviewNotes.trim()) {
      window.alert("Please enter a reason for rejection.");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to ${decision.toLowerCase()} ${application.fullName}'s application?`,
    );

    if (!confirmed) return;

    setReviewingId(application.id);
    setError("");
    setNotice("");

    try {
      await apiClient.patch(
        `/admin/professional-applications/${application.id}/review`,
        { status: decision, reviewNotes: reviewNotes.trim() },
      );

      setNotice(
        `${application.fullName}'s application was ${decision.toLowerCase()}.`,
      );

      await loadApplications();
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to update the application.",
      );
    } finally {
      setReviewingId(null);
    }
  }

  function changeStatus(value) {
    setStatus(value);
    setPage(1);
    setNotice("");
  }

  function changeSearch(value) {
    setSearch(value);
    setPage(1);
  }

  return (
    <main className="space-y-6">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-[#023B91]">ADMINISTRATION</p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900">
            Professional Applications
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Review applicants and manage professional verification.
          </p>
        </div>

        <button
          type="button"
          onClick={loadApplications}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </header>

      <section className="grid gap-4 sm:grid-cols-3">
        {[
          {
            label: "Applications shown",
            value: applications.length,
            icon: FileText,
          },
          {
            label: "Total matching applications",
            value: pagination.totalApplications,
            icon: Eye,
          },
          {
            label: "Current page",
            value: `${page} / ${Math.max(pagination.totalPages, 1)}`,
            icon: CheckCircle,
          },
        ].map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">{item.label}</p>
                <span className="rounded-xl bg-blue-50 p-2 text-[#023B91]">
                  <Icon size={19} />
                </span>
              </div>
              <p className="mt-3 text-2xl font-bold text-slate-900">
                {item.value}
              </p>
            </div>
          );
        })}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-100 p-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-sm">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              value={search}
              onChange={(event) => changeSearch(event.target.value)}
              placeholder="Search name, email, phone, category..."
              className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-[#023B91] focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {STATUS_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => changeStatus(option)}
                className={`rounded-xl px-3 py-2 text-xs font-semibold transition ${
                  status === option
                    ? "bg-[#012663] text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {option === "ALL"
                  ? "All applications"
                  : option.charAt(0) + option.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="m-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {notice && (
          <div className="m-4 rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-700">
            {notice}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-5 py-4">Applicant</th>
                <th className="px-5 py-4">Service category</th>
                <th className="px-5 py-4">Experience</th>
                <th className="px-5 py-4">Service area</th>
                <th className="px-5 py-4">Applied on</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center">
                    <LoaderCircle
                      className="mx-auto animate-spin text-[#023B91]"
                      size={25}
                    />
                    <p className="mt-2 text-slate-500">
                      Loading applications...
                    </p>
                  </td>
                </tr>
              ) : applications.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-12 text-center text-slate-500"
                  >
                    No applications found for this filter.
                  </td>
                </tr>
              ) : (
                applications.map((application) => (
                  <tr
                    key={application.id}
                    className="transition hover:bg-slate-50/70"
                  >
                    <td className="px-5 py-4">
                      <p className="font-semibold text-slate-900">
                        {application.fullName}
                      </p>
                      <p className="mt-1 text-slate-500">{application.email}</p>
                      <p className="mt-1 text-slate-500">{application.phone}</p>
                    </td>

                    <td className="px-5 py-4 text-slate-700">
                      {application.serviceCategory || "—"}
                    </td>

                    <td className="px-5 py-4 text-slate-700">
                      {application.experience ?? "—"}
                      {application.experience !== null &&
                      application.experience !== undefined
                        ? " years"
                        : ""}
                    </td>

                    <td className="px-5 py-4 text-slate-700">
                      {application.serviceArea || "—"}
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {application.createdAt
                        ? new Date(application.createdAt).toLocaleDateString()
                        : "—"}
                    </td>

                    <td className="px-5 py-4">
                      <StatusBadge status={application.status} />
                    </td>

                    <td className="px-5 py-4">
                      {application.status === "PENDING" ? (
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            disabled={reviewingId === application.id}
                            onClick={() =>
                              reviewApplication(application, "APPROVED")
                            }
                            className="inline-flex items-center gap-1 rounded-lg bg-green-50 px-3 py-2 text-xs font-semibold text-green-700 hover:bg-green-100 disabled:opacity-50"
                          >
                            <CheckCircle size={14} />
                            Approve
                          </button>

                          <button
                            type="button"
                            disabled={reviewingId === application.id}
                            onClick={() =>
                              reviewApplication(application, "REJECTED")
                            }
                            className="inline-flex items-center gap-1 rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-100 disabled:opacity-50"
                          >
                            <XCircle size={14} />
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400">
                          Already reviewed
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <footer className="flex items-center justify-between gap-3 border-t border-slate-100 px-4 py-4">
          <p className="text-xs text-slate-500">
            {pagination.totalApplications} matching application(s)
          </p>

          <div className="flex gap-2">
            <button
              type="button"
              disabled={page <= 1 || loading}
              onClick={() => setPage((current) => current - 1)}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>

            <button
              type="button"
              disabled={page >= pagination.totalPages || loading}
              onClick={() => setPage((current) => current + 1)}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </footer>
      </section>
    </main>
  );
}
