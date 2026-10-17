import { useEffect, useState } from "react";
import {
  BarChart3,
  Bell,
  Camera,
  CalendarDays,
  Check,
  ChevronDown,
  Globe2,
  Heart,
  LockKeyhole,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Save,
  ShieldCheck,
  Star,
  UserRound,
  X,
} from "lucide-react";

import { useAuth } from "../../hooks/useAuth";
import { useBookings } from "../../hooks/useBookings";
import { usePageMeta } from "../../hooks/usePageMeta";
import brand from "../../config/brand";

export default function CustomerProfile() {
  usePageMeta({
    title: `Your profile — ${brand.name}`,
  });

  const { session, updateSession } = useAuth();
  const { bookings = [] } = useBookings();

  const [editing, setEditing] = useState(true);
  const [saved, setSaved] = useState(false);

  const [notifications, setNotifications] = useState(true);
  const [marketing, setMarketing] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
  });

  useEffect(() => {
    if (!session) return;

    setForm({
      name: session.name || "",
      email: session.email || "",
      mobile: session.mobile || "",
      address: session.address || "",
    });
  }, [session]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setSaved(false);
  }

  async function handleSave() {
    try {
      await updateSession({
        ...session,
        name: form.name.trim(),
        email: form.email.trim(),
        mobile: form.mobile.trim(),
        address: form.address.trim(),
      });

      setSaved(true);
      setEditing(false);

      window.setTimeout(() => {
        setSaved(false);
      }, 3000);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  }

  function handleCancel() {
    setForm({
      name: session?.name || "",
      email: session?.email || "",
      mobile: session?.mobile || "",
      address: session?.address || "",
    });

    setEditing(false);
    setSaved(false);
  }

  const initials =
    form.name
      ?.trim()
      ?.split(/\s+/)
      ?.slice(0, 2)
      ?.map((word) => word[0])
      ?.join("")
      ?.toUpperCase() || "M";

  const totalBookings = Array.isArray(bookings) ? bookings.length : 0;

  return (
    <div className="min-h-screen bg-[#F5F8FC]">
      <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {/* =====================================================
            PAGE HEADER
        ===================================================== */}
        <div className="mb-7 flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#102A54] sm:text-4xl">
              My Profile
            </h1>

            <p className="mt-2 text-base text-slate-500">
              Manage your personal information and account settings.
            </p>
          </div>

          {/* Information notice */}
          <div className="flex max-w-full items-start gap-4 rounded-xl border border-blue-200 bg-[#EFF7FF] px-5 py-4 xl:w-[525px]">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#1268E8] shadow-sm">
              <ShieldCheck className="h-6 w-6" />
            </div>

            <div>
              <p className="font-semibold text-[#123B78]">
                Keep your profile updated
              </p>

              <p className="mt-1 text-sm leading-5 text-[#31598D]">
                This helps us provide a better and faster service experience.
              </p>
            </div>
          </div>
        </div>

        {/* =====================================================
            MAIN GRID
        ===================================================== */}
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.65fr)_minmax(350px,1fr)]">
          {/* ===================================================
              PROFILE INFORMATION
          =================================================== */}
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {/* Card header */}
            <div className="flex flex-col gap-4 border-b border-slate-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between lg:px-8">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EAF4FF] text-[#1268E8]">
                  <UserRound className="h-6 w-6" />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-[#102A54]">
                    Profile Information
                  </h2>

                  <p className="mt-0.5 text-sm text-slate-500">
                    Update your personal details here.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setEditing(true)}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#EAF4FF] px-5 text-sm font-semibold text-[#1268E8] transition hover:bg-[#DCEEFF]"
              >
                <Pencil className="h-4 w-4" />
                Edit
              </button>
            </div>

            {/* Profile body */}
            <div className="px-6 py-7 lg:px-8">
              {/* Avatar */}
              <div className="mb-7 flex items-center gap-5">
                <div className="relative">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#DCEAFF] text-3xl font-semibold text-[#012663]">
                    {initials}
                  </div>

                  <button
                    type="button"
                    className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full border-4 border-white bg-[#012663] text-white shadow-md transition hover:bg-[#023B91]"
                    aria-label="Change profile photo"
                  >
                    <Camera className="h-4 w-4" />
                  </button>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#102A54]">
                    {form.name || "Your Name"}
                  </h3>

                  <p className="mt-1 text-sm font-medium text-slate-500">
                    Customer
                  </p>
                </div>
              </div>

              {/* Form */}
              <div className="space-y-6">
                {/* Full name */}
                <div>
                  <label
                    htmlFor="profile-name"
                    className="mb-2 block text-sm font-medium text-[#263B5B]"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <UserRound className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

                    <input
                      id="profile-name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      disabled={!editing}
                      placeholder="Enter your full name"
                      className="h-13 w-full rounded-xl border border-[#C7D5E7] bg-white pl-12 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#1268E8] focus:ring-4 focus:ring-[#1268E8]/10 disabled:bg-slate-50"
                    />
                  </div>
                </div>

                {/* Email + Mobile */}
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="profile-email"
                      className="mb-2 block text-sm font-medium text-[#263B5B]"
                    >
                      Email Address <span className="text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

                      <input
                        id="profile-email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        disabled={!editing}
                        placeholder="you@example.com"
                        className="h-13 w-full rounded-xl border border-[#C7D5E7] bg-white pl-12 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#1268E8] focus:ring-4 focus:ring-[#1268E8]/10 disabled:bg-slate-50"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="profile-mobile"
                      className="mb-2 block text-sm font-medium text-[#263B5B]"
                    >
                      Mobile Number
                    </label>

                    <div className="relative">
                      <Phone className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

                      <input
                        id="profile-mobile"
                        name="mobile"
                        type="tel"
                        value={form.mobile}
                        onChange={handleChange}
                        disabled={!editing}
                        placeholder="Enter your mobile number"
                        className="h-13 w-full rounded-xl border border-[#C7D5E7] bg-white pl-12 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#1268E8] focus:ring-4 focus:ring-[#1268E8]/10 disabled:bg-slate-50"
                      />
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label
                    htmlFor="profile-address"
                    className="mb-2 block text-sm font-medium text-[#263B5B]"
                  >
                    Address
                  </label>

                  <div className="relative">
                    <MapPin className="pointer-events-none absolute left-4 top-4 h-5 w-5 text-slate-500" />

                    <textarea
                      id="profile-address"
                      name="address"
                      rows={3}
                      value={form.address}
                      onChange={handleChange}
                      disabled={!editing}
                      placeholder="Enter your complete address"
                      className="w-full resize-none rounded-xl border border-[#C7D5E7] bg-white py-3 pl-12 pr-4 text-sm leading-6 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#1268E8] focus:ring-4 focus:ring-[#1268E8]/10 disabled:bg-slate-50"
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              {editing && (
                <div className="mt-7 flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row">
                  <button
                    type="button"
                    onClick={handleSave}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#012663] px-7 text-sm font-semibold text-white shadow-sm transition hover:bg-[#023B91]"
                  >
                    <Save className="h-4 w-4" />
                    Save Changes
                  </button>

                  <button
                    type="button"
                    onClick={handleCancel}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-[#B9C9DD] bg-white px-7 text-sm font-semibold text-[#102A54] transition hover:bg-slate-50"
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </button>
                </div>
              )}

              {saved && (
                <div className="mt-5 flex items-center gap-2 rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                  <Check className="h-4 w-4" />
                  Your profile has been updated successfully.
                </div>
              )}
            </div>
          </section>

          {/* ===================================================
              RIGHT SIDE
          =================================================== */}
          <div className="space-y-5">
            {/* Account Summary */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EAF4FF] text-[#1268E8]">
                  <BarChart3 className="h-6 w-6" />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-[#102A54]">
                    Account Summary
                  </h2>

                  <p className="text-sm text-slate-500">
                    Quick view of your account details.
                  </p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-3 divide-x divide-slate-200 rounded-xl bg-[#F7FAFD] py-4">
                <SummaryItem
                  icon={CalendarDays}
                  value={totalBookings}
                  label="Total Bookings"
                />

                <SummaryItem icon={Heart} value="0" label="Saved Services" />

                <SummaryItem
                  icon={Star}
                  value="Customer"
                  label="Account Type"
                />
              </div>
            </section>

            {/* Preferences */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EAF4FF] text-[#1268E8]">
                  <SettingsIcon />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-[#102A54]">
                    Preferences
                  </h2>

                  <p className="text-sm text-slate-500">
                    Manage your preferences.
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-5">
                {/* Language */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <Globe2 className="h-5 w-5 text-[#263B5B]" />

                    <span className="text-sm font-medium text-slate-800">
                      Language
                    </span>
                  </div>

                  <button
                    type="button"
                    className="flex h-10 min-w-[145px] items-center justify-between rounded-xl border border-[#C7D5E7] bg-white px-4 text-sm text-slate-700"
                  >
                    English
                    <ChevronDown className="h-4 w-4 text-slate-500" />
                  </button>
                </div>

                {/* Notifications */}
                <PreferenceToggle
                  icon={Bell}
                  title="Notifications"
                  description="Get updates about your bookings and offers"
                  checked={notifications}
                  onChange={() => setNotifications((value) => !value)}
                />

                {/* Marketing */}
                <PreferenceToggle
                  icon={Mail}
                  title="Marketing Communications"
                  description="Receive offers, new services and updates"
                  checked={marketing}
                  onChange={() => setMarketing((value) => !value)}
                />
              </div>
            </section>

            {/* Security */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EAF4FF] text-[#1268E8]">
                  <ShieldCheck className="h-6 w-6" />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-[#102A54]">Security</h2>

                  <p className="text-sm text-slate-500">
                    Keep your account safe.
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="mt-6 flex w-full items-center justify-between rounded-xl p-2 text-left transition hover:bg-slate-50"
              >
                <span className="flex items-center gap-4">
                  <LockKeyhole className="h-5 w-5 text-[#263B5B]" />

                  <span>
                    <span className="block text-sm font-medium text-slate-800">
                      Change Password
                    </span>

                    <span className="mt-1 block text-sm text-slate-500">
                      Update your password regularly for better security
                    </span>
                  </span>
                </span>

                <span className="text-xl text-slate-400">›</span>
              </button>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =============================================================
   SMALL COMPONENTS
============================================================= */

function SummaryItem({ icon: Icon, value, label }) {
  return (
    <div className="flex min-w-0 flex-col items-center justify-center px-2 text-center">
      <Icon className="h-5 w-5 text-[#50627D]" />

      <p className="mt-2 truncate text-lg font-bold text-slate-900">{value}</p>

      <p className="mt-1 text-xs text-slate-500 sm:text-sm">{label}</p>
    </div>
  );
}

function PreferenceToggle({
  icon: Icon,
  title,
  description,
  checked,
  onChange,
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex min-w-0 items-start gap-4">
        <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[#263B5B]" />

        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-800">{title}</p>

          <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
            {description}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onChange}
        role="switch"
        aria-checked={checked}
        className={[
          "relative h-7 w-12 shrink-0 rounded-full transition",
          checked ? "bg-[#012663]" : "bg-[#B8C6D8]",
        ].join(" ")}
      >
        <span
          className={[
            "absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition",
            checked ? "left-6" : "left-1",
          ].join(" ")}
        />
      </button>
    </div>
  );
}

function SettingsIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-1.42 1.42-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V21h-2v-.48a1.7 1.7 0 0 0-1.03-1.56 1.7 1.7 0 0 0-1.88.34l-.06.06-1.42-1.42.06-.06A1.7 1.7 0 0 0 9.4 15a1.7 1.7 0 0 0-1.56-1.03H7v-2h.84A1.7 1.7 0 0 0 9.4 10.94a1.7 1.7 0 0 0-.34-1.88L9 9l1.42-1.42.06.06a1.7 1.7 0 0 0 1.88.34 1.7 1.7 0 0 0 1.03-1.56V6h2v.42a1.7 1.7 0 0 0 1.03 1.56 1.7 1.7 0 0 0 1.88-.34l.06-.06L19.78 9l-.06.06a1.7 1.7 0 0 0-.34 1.88 1.7 1.7 0 0 0 1.56 1.03H21v2h-.06A1.7 1.7 0 0 0 19.4 15Z" />
    </svg>
  );
}
