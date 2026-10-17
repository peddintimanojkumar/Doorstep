
import { useCallback, useEffect, useMemo, useState } from "react";
import DataTable from "../../components/dashboard/DataTable";
import Button from "../../components/common/Button";
import Skeleton from "../../components/common/Skeleton";
import ErrorState from "../../components/common/ErrorState";
import { usePageMeta } from "../../hooks/usePageMeta";
import { formatCurrency } from "../../utils/formatCurrency";
import brand from "../../config/brand";
import {
  getAdminServices,
  getAdminCategories,
  createAdminService,
  updateAdminService,
  updateAdminServiceStatus,
} from "../../services/api/adminServicesApi";

const EMPTY_FORM = {
  categoryId: "",
  name: "",
  description: "",
  image: "",
  price: "",
  duration: "",
};

function getErrorMessage(error) {
  return (
    error.response?.data?.message ||
    error.message ||
    "Something went wrong. Please try again."
  );
}

function getInitialForm(service) {
  if (!service) return { ...EMPTY_FORM };

  return {
    categoryId: String(service.categoryId ?? service.category?.id ?? ""),
    name: service.name ?? "",
    description: service.description ?? "",
    image: service.image ?? "",
    price: service.price ?? "",
    duration: service.duration ?? "",
  };
}

export default function AdminServices() {
  usePageMeta({ title: `Manage Services — ${brand.name} Admin` });

  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [isPending, setIsPending] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [form, setForm] = useState({ ...EMPTY_FORM });

  const loadData = useCallback(async () => {
    setIsPending(true);
    setIsError(false);
    setErrorMessage("");

    try {
      const [serviceResponse, categoryResponse] = await Promise.all([
        getAdminServices({ page: 1, limit: 100 }),
        getAdminCategories(),
      ]);

      setServices(
        Array.isArray(serviceResponse.services)
          ? serviceResponse.services
          : [],
      );

      setCategories(
        Array.isArray(categoryResponse)
          ? categoryResponse
          : categoryResponse.categories ?? [],
      );
    } catch (error) {
      setIsError(true);
      setErrorMessage(getErrorMessage(error));
    } finally {
      setIsPending(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const filteredServices = useMemo(() => {
    const search = query.trim().toLowerCase();

    return services.filter((service) => {
      const matchesSearch =
        !search ||
        service.name?.toLowerCase().includes(search) ||
        service.description?.toLowerCase().includes(search) ||
        service.category?.name?.toLowerCase().includes(search);

      const matchesCategory =
        categoryFilter === "all" ||
        String(service.categoryId) === categoryFilter;

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && service.isActive === true) ||
        (statusFilter === "inactive" && service.isActive === false);

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [services, query, categoryFilter, statusFilter]);

  function openCreateForm() {
    setEditingService(null);
    setForm({ ...EMPTY_FORM });
    setSubmitError("");
    setSuccessMessage("");
    setIsFormOpen(true);
  }

  function openEditForm(service) {
    setEditingService(service);
    setForm(getInitialForm(service));
    setSubmitError("");
    setSuccessMessage("");
    setIsFormOpen(true);
  }

  function closeForm() {
    if (isSaving) return;
    setIsFormOpen(false);
    setEditingService(null);
    setForm({ ...EMPTY_FORM });
    setSubmitError("");
  }

  function handleFormChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitError("");
    setSuccessMessage("");

    if (!form.categoryId || !form.name.trim()) {
      setSubmitError("Please select a category and enter a service name.");
      return;
    }

    const price = Number(form.price);
    const duration = Number(form.duration);

    if (form.price === "" || !Number.isFinite(price) || price < 0) {
      setSubmitError("Enter a valid price greater than or equal to zero.");
      return;
    }

    if (
      form.duration === "" ||
      !Number.isInteger(duration) ||
      duration <= 0
    ) {
      setSubmitError("Duration must be a positive whole number of minutes.");
      return;
    }

    const payload = {
      categoryId: Number(form.categoryId),
      name: form.name.trim(),
      description: form.description.trim(),
      image: form.image.trim(),
      price,
      duration,
    };

    setIsSaving(true);

    try {
      if (editingService) {
        await updateAdminService(editingService.id, payload);
        setSuccessMessage("Service updated successfully.");
      } else {
        await createAdminService(payload);
        setSuccessMessage("Service created successfully.");
      }

      setIsFormOpen(false);
      setEditingService(null);
      setForm({ ...EMPTY_FORM });
      await loadData();
    } catch (error) {
      setSubmitError(getErrorMessage(error));
    } finally {
      setIsSaving(false);
    }
  }

  async function handleStatusToggle(service) {
    const action = service.isActive ? "deactivate" : "activate";

    if (
      !window.confirm(
        `Are you sure you want to ${action} "${service.name}"?`,
      )
    ) {
      return;
    }

    setSubmitError("");
    setSuccessMessage("");

    try {
      await updateAdminServiceStatus(service.id, !service.isActive);
      setSuccessMessage(
        `"${service.name}" has been ${service.isActive ? "deactivated" : "activated"}.`,
      );
      await loadData();
    } catch (error) {
      setSubmitError(getErrorMessage(error));
    }
  }

  const columns = [
    {
      key: "name",
      label: "Service",
      render: (service) => (
        <div className="min-w-40">
          <p className="font-semibold text-ink-900">{service.name}</p>
          <p className="mt-1 max-w-xs truncate text-xs text-ink-500">
            {service.description || "No description"}
          </p>
        </div>
      ),
    },
    {
      key: "category",
      label: "Category",
      render: (service) =>
        service.category?.name ||
        categories.find(
          (category) => Number(category.id) === Number(service.categoryId),
        )?.name ||
        "Uncategorized",
    },
    {
      key: "price",
      label: "Price",
      render: (service) =>
        service.price != null ? formatCurrency(Number(service.price)) : "—",
    },
    {
      key: "duration",
      label: "Duration",
      render: (service) =>
        service.duration ? `${service.duration} min` : "—",
    },
    {
      key: "isActive",
      label: "Status",
      render: (service) => (
        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
            service.isActive
              ? "bg-emerald-50 text-emerald-700"
              : "bg-stone-100 text-stone-600"
          }`}
        >
          {service.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (service) => (
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            size="sm"
            variant="secondary"
            onClick={() => openEditForm(service)}
          >
            Edit
          </Button>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() => handleStatusToggle(service)}
          >
            {service.isActive ? "Deactivate" : "Activate"}
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-full p-6 sm:p-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-ink-900">
            Manage Services
          </h1>
          <p className="mt-1 text-sm text-ink-500">
            Create, update, and manage the services available to customers.
          </p>
        </div>

        <Button type="button" onClick={openCreateForm}>
          + Add Service
        </Button>
      </div>

      {successMessage && (
        <div
          role="status"
          className="mt-5 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800"
        >
          {successMessage}
        </div>
      )}

      {submitError && !isFormOpen && (
        <div
          role="alert"
          className="mt-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
        >
          {submitError}
        </div>
      )}

      {isFormOpen && (
        <section className="mt-6 rounded-card border border-stone-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-ink-900">
                {editingService ? "Edit Service" : "Add New Service"}
              </h2>
              <p className="mt-1 text-sm text-ink-500">
                Enter the service details below.
              </p>
            </div>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={closeForm}
              disabled={isSaving}
            >
              Close
            </Button>
          </div>

          {submitError && (
            <div
              role="alert"
              className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
            >
              {submitError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <label className="block text-sm font-medium text-ink-700">
                Service name *
                <input
                  name="name"
                  value={form.name}
                  onChange={handleFormChange}
                  required
                  maxLength={150}
                  placeholder="e.g. Plumbing Repair"
                  className="mt-2 w-full rounded-control border border-stone-300 px-3 py-2.5 outline-none focus:border-[#012663] focus:ring-1 focus:ring-[#012663]"
                />
              </label>

              <label className="block text-sm font-medium text-ink-700">
                Category *
                <select
                  name="categoryId"
                  value={form.categoryId}
                  onChange={handleFormChange}
                  required
                  className="mt-2 w-full rounded-control border border-stone-300 bg-white px-3 py-2.5 outline-none focus:border-[#012663] focus:ring-1 focus:ring-[#012663]"
                >
                  <option value="">Select a category</option>
                  {categories
                    .filter((category) => category.isActive !== false)
                    .map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                </select>
              </label>

              <label className="block text-sm font-medium text-ink-700">
                Price (₹) *
                <input
                  name="price"
                  type="number"
                  value={form.price}
                  onChange={handleFormChange}
                  required
                  min="0"
                  step="0.01"
                  placeholder="e.g. 499"
                  className="mt-2 w-full rounded-control border border-stone-300 px-3 py-2.5 outline-none focus:border-[#012663] focus:ring-1 focus:ring-[#012663]"
                />
              </label>

              <label className="block text-sm font-medium text-ink-700">
                Duration (minutes) *
                <input
                  name="duration"
                  type="number"
                  value={form.duration}
                  onChange={handleFormChange}
                  required
                  min="1"
                  step="1"
                  placeholder="e.g. 60"
                  className="mt-2 w-full rounded-control border border-stone-300 px-3 py-2.5 outline-none focus:border-[#012663] focus:ring-1 focus:ring-[#012663]"
                />
              </label>

              <label className="block text-sm font-medium text-ink-700 md:col-span-2">
                Image path or URL
                <input
                  name="image"
                  value={form.image}
                  onChange={handleFormChange}
                  maxLength={500}
                  placeholder="/images/services/plumbing.png"
                  className="mt-2 w-full rounded-control border border-stone-300 px-3 py-2.5 outline-none focus:border-[#012663] focus:ring-1 focus:ring-[#012663]"
                />
              </label>

              <label className="block text-sm font-medium text-ink-700 md:col-span-2">
                Description
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleFormChange}
                  rows={4}
                  maxLength={2000}
                  placeholder="Describe what this service includes..."
                  className="mt-2 w-full rounded-control border border-stone-300 px-3 py-2.5 outline-none focus:border-[#012663] focus:ring-1 focus:ring-[#012663]"
                />
              </label>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button type="submit" disabled={isSaving}>
                {isSaving
                  ? "Saving..."
                  : editingService
                    ? "Save Changes"
                    : "Create Service"}
              </Button>

              <Button
                type="button"
                variant="secondary"
                disabled={isSaving}
                onClick={closeForm}
              >
                Cancel
              </Button>
            </div>
          </form>
        </section>
      )}

      <section className="mt-7 rounded-card border border-stone-200 bg-white p-4 sm:p-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <label className="block text-sm font-medium text-ink-700">
            Search
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search name or description..."
              className="mt-2 w-full rounded-control border border-stone-300 px-3 py-2.5 outline-none focus:border-[#012663] focus:ring-1 focus:ring-[#012663]"
            />
          </label>

          <label className="block text-sm font-medium text-ink-700">
            Category
            <select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
              className="mt-2 w-full rounded-control border border-stone-300 bg-white px-3 py-2.5 outline-none focus:border-[#012663]"
            >
              <option value="all">All categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-sm font-medium text-ink-700">
            Status
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="mt-2 w-full rounded-control border border-stone-300 bg-white px-3 py-2.5 outline-none focus:border-[#012663]"
            >
              <option value="all">All statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </label>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-ink-500">
          <p>
            Showing <strong>{filteredServices.length}</strong> of{" "}
            <strong>{services.length}</strong> services
          </p>
          <Button
            type="button"
            size="sm"
            variant="secondary"
            onClick={() => {
              setQuery("");
              setCategoryFilter("all");
              setStatusFilter("all");
            }}
          >
            Clear Filters
          </Button>
        </div>
      </section>

      <div className="mt-6">
        {isPending ? (
          <Skeleton className="h-64" />
        ) : isError ? (
          <div>
            <p className="mb-3 text-sm text-red-700">{errorMessage}</p>
            <ErrorState onRetry={loadData} />
          </div>
        ) : (
          <DataTable
            columns={columns}
            rows={filteredServices}
            emptyMessage="No services match your filters. Add a service or clear the filters."
          />
        )}
      </div>
    </div>
  );
}
