import {
  Home,
  MapPin,
  Plus,
  BriefcaseBusiness,
  MoreVertical,
  Pencil,
  Trash2,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";
import { usePageMeta } from "../../hooks/usePageMeta";
import brand from "../../config/brand";

const INITIAL_ADDRESSES = [
  {
    id: 1,
    type: "Home",
    icon: Home,
    address: "",
    city: "Hyderabad",
    pincode: "",
    landmark: "",
    isDefault: true,
  },
  {
    id: 2,
    type: "Work",
    icon: BriefcaseBusiness,
    address: "",
    city: "Hyderabad",
    pincode: "",
    landmark: "",
    isDefault: false,
  },
];

export default function Addresses() {
  usePageMeta({
    title: `Addresses — ${brand.name}`,
  });

  const [addresses, setAddresses] = useState(INITIAL_ADDRESSES);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    type: "Home",
    address: "",
    city: "Hyderabad",
    pincode: "",
    landmark: "",
  });

  function updateField(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function addAddress(event) {
    event.preventDefault();

    const newAddress = {
      id: Date.now(),
      type: form.type,
      icon: form.type === "Work" ? BriefcaseBusiness : Home,
      address: form.address,
      city: form.city,
      pincode: form.pincode,
      landmark: form.landmark,
      isDefault: addresses.length === 0,
    };

    setAddresses((current) => [...current, newAddress]);

    setForm({
      type: "Home",
      address: "",
      city: "Hyderabad",
      pincode: "",
      landmark: "",
    });

    setShowForm(false);
  }

  function deleteAddress(id) {
    setAddresses((current) => current.filter((address) => address.id !== id));
  }

  function makeDefault(id) {
    setAddresses((current) =>
      current.map((address) => ({
        ...address,
        isDefault: address.id === id,
      })),
    );
  }

  return (
    <div className="min-h-full p-5 sm:p-8 lg:p-10">
      {/* Header */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-[#1268E8]">ACCOUNT</p>

          <h1 className="mt-1 text-3xl font-bold text-[#012663]">
            My Addresses
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage your saved addresses for faster bookings.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowForm((value) => !value)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#012663] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#023B91]"
        >
          <Plus className="h-4 w-4" />
          Add Address
        </button>
      </div>

      {/* Add Address Form */}

      {showForm && (
        <form
          onSubmit={addAddress}
          className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <h2 className="text-lg font-bold text-[#102A54]">Add New Address</h2>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-[#31476A]">
                Address Type
              </label>

              <select
                name="type"
                value={form.type}
                onChange={updateField}
                className="mt-2 h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm outline-none focus:border-[#1268E8]"
              >
                <option>Home</option>
                <option>Work</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-[#31476A]">City</label>

              <input
                name="city"
                value={form.city}
                onChange={updateField}
                className="mt-2 h-11 w-full rounded-xl border border-slate-300 px-3 text-sm outline-none focus:border-[#1268E8]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-medium text-[#31476A]">
                Complete Address
              </label>

              <textarea
                name="address"
                value={form.address}
                onChange={updateField}
                required
                rows={3}
                placeholder="House / Flat number, street, area..."
                className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-3 text-sm outline-none focus:border-[#1268E8]"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-[#31476A]">
                PIN Code
              </label>

              <input
                name="pincode"
                value={form.pincode}
                onChange={updateField}
                maxLength={6}
                placeholder="500000"
                className="mt-2 h-11 w-full rounded-xl border border-slate-300 px-3 text-sm outline-none focus:border-[#1268E8]"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-[#31476A]">
                Landmark
              </label>

              <input
                name="landmark"
                value={form.landmark}
                onChange={updateField}
                placeholder="Near..."
                className="mt-2 h-11 w-full rounded-xl border border-slate-300 px-3 text-sm outline-none focus:border-[#1268E8]"
              />
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              type="submit"
              className="rounded-xl bg-[#012663] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#023B91]"
            >
              Save Address
            </button>

            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-[#102A54] hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Address Cards */}

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        {addresses.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#1268E8]">
                    <Icon className="h-6 w-6" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-bold text-[#102A54]">{item.type}</h2>

                      {item.isDefault && (
                        <span className="rounded-full bg-green-50 px-2 py-1 text-[11px] font-semibold text-green-700">
                          Default
                        </span>
                      )}
                    </div>

                    <p className="mt-1 text-sm text-slate-500">{item.city}</p>
                  </div>
                </div>

                <button
                  type="button"
                  className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-[#012663]"
                >
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-5 flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" />

                <div>
                  <p className="text-sm text-[#31476A]">
                    {item.address || "No address added yet"}
                  </p>

                  {item.pincode && (
                    <p className="mt-1 text-sm text-slate-500">
                      {item.city} - {item.pincode}
                    </p>
                  )}

                  {item.landmark && (
                    <p className="mt-1 text-xs text-slate-400">
                      Landmark: {item.landmark}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-3 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1268E8]"
                >
                  <Pencil className="h-4 w-4" />
                  Edit
                </button>

                {!item.isDefault && (
                  <button
                    type="button"
                    onClick={() => makeDefault(item.id)}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    Make default
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => deleteAddress(item.id)}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
