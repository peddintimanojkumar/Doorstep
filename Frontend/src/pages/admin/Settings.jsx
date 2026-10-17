import {
  Bell,
  CheckCircle2,
  Globe,
  LockKeyhole,
  Save,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useState } from "react";

import { usePageMeta } from "../../hooks/usePageMeta";
import brand from "../../config/brand";

export default function AdminSettings() {
  usePageMeta({
    title: `Settings — ${brand.name} Admin`,
    description: "Manage Doorstep administrator settings.",
  });

  const [settings, setSettings] = useState({
    name: "Manupeddinti",
    email: "admin@doorstep.com",
    phone: "",
    notifications: true,
    bookingNotifications: true,
    paymentNotifications: true,
    professionalNotifications: true,
    language: "English",
    timezone: "Asia/Kolkata",
  });

  const [saved, setSaved] = useState(false);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setSettings((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));

    setSaved(false);
  }

  function handleSubmit(event) {
    event.preventDefault();

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  }

  return (
    <div className="min-h-screen bg-[#F5F8FC] p-5 sm:p-7 lg:p-10">

      {/* HEADER */}
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-[#1268E8]">
          Administration
        </p>

        <h1 className="mt-1 text-3xl font-bold text-[#012663]">
          Settings
        </h1>

        <p className="mt-2 text-sm text-[#60728D]">
          Manage your administrator account and platform preferences.
        </p>
      </div>

      {/* SUCCESS */}
      {saved && (
        <div className="mt-6 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4">

          <CheckCircle2 className="h-5 w-5 text-green-600" />

          <div>
            <p className="text-sm font-semibold text-green-800">
              Settings saved successfully
            </p>

            <p className="mt-0.5 text-xs text-green-700">
              Your administrator preferences have been updated.
            </p>
          </div>

        </div>
      )}

      <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_360px]">

        {/* LEFT */}
        <div className="space-y-6">

          {/* PROFILE */}
          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-200 p-6">

              <div className="flex items-center gap-4">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#1268E8]">
                  <UserRound className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-[#102A54]">
                    Administrator Profile
                  </h2>

                  <p className="mt-1 text-sm text-[#60728D]">
                    Manage your administrator account information.
                  </p>
                </div>

              </div>

            </div>

            <form onSubmit={handleSubmit} className="p-6">

              <div className="grid gap-5 sm:grid-cols-2">

                <FormField
                  label="Full Name"
                  name="name"
                  value={settings.name}
                  onChange={handleChange}
                />

                <FormField
                  label="Email Address"
                  name="email"
                  type="email"
                  value={settings.email}
                  onChange={handleChange}
                />

                <FormField
                  label="Mobile Number"
                  name="phone"
                  type="tel"
                  value={settings.phone}
                  onChange={handleChange}
                  placeholder="Enter mobile number"
                />

                <SelectField
                  label="Language"
                  name="language"
                  value={settings.language}
                  onChange={handleChange}
                  options={["English", "Telugu", "Hindi"]}
                />

                <SelectField
                  label="Timezone"
                  name="timezone"
                  value={settings.timezone}
                  onChange={handleChange}
                  options={[
                    "Asia/Kolkata",
                    "Asia/Dubai",
                    "Asia/Singapore",
                  ]}
                />

              </div>

              <div className="mt-6 flex justify-end">

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#012663] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#023B91]"
                >
                  <Save className="h-4 w-4" />
                  Save Changes
                </button>

              </div>

            </form>

          </section>

          {/* NOTIFICATIONS */}
          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-200 p-6">

              <div className="flex items-center gap-4">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                  <Bell className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-[#102A54]">
                    Notifications
                  </h2>

                  <p className="mt-1 text-sm text-[#60728D]">
                    Choose which platform notifications you receive.
                  </p>
                </div>

              </div>

            </div>

            <div className="divide-y divide-slate-100">

              <ToggleRow
                title="All notifications"
                description="Receive important Doorstep administrator notifications."
                name="notifications"
                checked={settings.notifications}
                onChange={handleChange}
              />

              <ToggleRow
                title="Booking notifications"
                description="Receive updates about new and changed bookings."
                name="bookingNotifications"
                checked={settings.bookingNotifications}
                onChange={handleChange}
              />

              <ToggleRow
                title="Payment notifications"
                description="Receive updates about successful and failed payments."
                name="paymentNotifications"
                checked={settings.paymentNotifications}
                onChange={handleChange}
              />

              <ToggleRow
                title="Professional notifications"
                description="Receive updates about professional registrations and verification."
                name="professionalNotifications"
                checked={settings.professionalNotifications}
                onChange={handleChange}
              />

            </div>

          </section>

        </div>

        {/* RIGHT */}
        <div className="space-y-6">

          {/* SECURITY */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#1268E8]">
              <ShieldCheck className="h-5 w-5" />
            </div>

            <h2 className="mt-5 text-lg font-bold text-[#102A54]">
              Security
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#60728D]">
              Keep your administrator account protected with secure
              account settings.
            </p>

            <button
              type="button"
              className="mt-6 flex w-full items-center gap-3 rounded-xl border border-slate-200 p-4 text-left transition hover:border-[#1268E8] hover:bg-[#F7FAFF]"
            >

              <LockKeyhole className="h-5 w-5 text-[#1268E8]" />

              <div>
                <p className="text-sm font-semibold text-[#102A54]">
                  Change Password
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Update your administrator password.
                </p>
              </div>

            </button>

          </section>

          {/* PLATFORM */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <Globe className="h-5 w-5" />
            </div>

            <h2 className="mt-5 text-lg font-bold text-[#102A54]">
              Platform
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#60728D]">
              Current Doorstep platform configuration.
            </p>

            <div className="mt-6 space-y-4">

              <InfoRow
                label="Platform"
                value="Doorstep"
              />

              <InfoRow
                label="Environment"
                value="Development"
              />

              <InfoRow
                label="Version"
                value="1.0.0"
              />

              <InfoRow
                label="Currency"
                value="INR (₹)"
              />

            </div>

          </section>

        </div>

      </div>

    </div>
  );
}

function FormField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-[#31476A]"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-[#102A54] outline-none transition placeholder:text-slate-400 focus:border-[#1268E8] focus:ring-4 focus:ring-[#1268E8]/10"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-[#31476A]"
      >
        {label}
      </label>

      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-[#102A54] outline-none focus:border-[#1268E8] focus:ring-4 focus:ring-[#1268E8]/10"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function ToggleRow({
  title,
  description,
  name,
  checked,
  onChange,
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-5 p-5 hover:bg-[#F8FAFD]">

      <div>
        <p className="text-sm font-semibold text-[#102A54]">
          {title}
        </p>

        <p className="mt-1 text-xs leading-5 text-[#60728D]">
          {description}
        </p>
      </div>

      <span className="relative shrink-0">

        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          className="peer sr-only"
        />

        <span className="block h-6 w-11 rounded-full bg-slate-300 transition peer-checked:bg-[#1268E8]" />

        <span className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm transition peer-checked:translate-x-5" />

      </span>

    </label>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0 last:pb-0">

      <span className="text-sm text-[#60728D]">
        {label}
      </span>

      <span className="text-sm font-semibold text-[#31476A]">
        {value}
      </span>

    </div>
  );
}