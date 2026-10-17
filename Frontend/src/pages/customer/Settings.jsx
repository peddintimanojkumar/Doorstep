import {
  Bell,
  Globe,
  Lock,
  Settings as SettingsIcon,
  ChevronRight,
  Mail,
  Smartphone,
  ShieldCheck,
  Check,
  X,
  Eye,
  EyeOff,
} from "lucide-react";
import { useState } from "react";

import { usePageMeta } from "../../hooks/usePageMeta";
import brand from "../../config/brand";

export default function CustomerSettings() {
  usePageMeta({
    title: `Settings — ${brand.name}`,
  });

  // -----------------------------
  // SETTINGS STATE
  // -----------------------------

  const [language, setLanguage] = useState("English");

  const [notifications, setNotifications] = useState(true);

  const [marketing, setMarketing] = useState(false);

  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const [showMobileForm, setShowMobileForm] = useState(false);

  const [showSavedMessage, setShowSavedMessage] = useState(false);

  const [mobileNumber, setMobileNumber] = useState("");

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  const [showNewPassword, setShowNewPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // -----------------------------
  // PASSWORD HANDLERS
  // -----------------------------

  function updatePasswordField(event) {
    const { name, value } = event.target;

    setPasswordForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handlePasswordSubmit(event) {
    event.preventDefault();

    if (!passwordForm.currentPassword) {
      alert("Please enter your current password.");
      return;
    }

    if (!passwordForm.newPassword) {
      alert("Please enter a new password.");
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      alert("New password must contain at least 8 characters.");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    alert("Password changed successfully.");

    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    setShowPasswordForm(false);
  }

  // -----------------------------
  // MOBILE HANDLER
  // -----------------------------

  function handleMobileSubmit(event) {
    event.preventDefault();

    if (!mobileNumber.trim()) {
      alert("Please enter your mobile number.");
      return;
    }

    if (!/^\d{10}$/.test(mobileNumber.trim())) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    alert("Mobile number updated successfully.");

    setShowMobileForm(false);
  }

  // -----------------------------
  // SAVE SETTINGS
  // -----------------------------

  function handleSaveSettings() {
    setShowSavedMessage(true);

    setTimeout(() => {
      setShowSavedMessage(false);
    }, 3000);
  }

  return (
    <div className="min-h-full bg-[#F5F7FA] p-5 sm:p-8 lg:p-10">
      {/* =========================================
          PAGE HEADER
      ========================================== */}

      <div className="max-w-5xl">
        <p className="text-sm font-semibold text-[#1268E8]">ACCOUNT SETTINGS</p>

        <h1 className="mt-1 text-3xl font-bold text-[#012663]">Settings</h1>

        <p className="mt-2 text-sm text-slate-500">
          Manage your account preferences, notifications and security settings.
        </p>
      </div>

      {/* =========================================
          SUCCESS MESSAGE
      ========================================== */}

      {showSavedMessage && (
        <div className="mt-6 flex max-w-5xl items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-5 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
            <Check className="h-4 w-4 text-green-600" />
          </div>

          <div>
            <p className="text-sm font-semibold text-green-800">
              Settings saved
            </p>

            <p className="text-xs text-green-700">
              Your preferences have been updated successfully.
            </p>
          </div>
        </div>
      )}

      {/* =========================================
          PREFERENCES
      ========================================== */}

      <section className="mt-8 max-w-5xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Section Header */}

        <div className="border-b border-slate-100 p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#1268E8]">
              <SettingsIcon className="h-6 w-6" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#102A54]">Preferences</h2>

              <p className="mt-1 text-sm text-slate-500">
                Manage your Doorstep experience.
              </p>
            </div>
          </div>
        </div>

        {/* Language */}

        <div className="flex flex-col gap-5 border-b border-slate-100 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="mt-1">
              <Globe className="h-5 w-5 text-[#1268E8]" />
            </div>

            <div>
              <p className="font-semibold text-[#102A54]">Language</p>

              <p className="mt-1 text-sm text-slate-500">
                Choose the language used throughout Doorstep.
              </p>
            </div>
          </div>

          <select
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
            className="h-11 min-w-[150px] rounded-xl border border-slate-300 bg-white px-4 text-sm text-[#102A54] outline-none transition focus:border-[#1268E8] focus:ring-2 focus:ring-blue-100"
          >
            <option value="English">English</option>

            <option value="Telugu">Telugu</option>

            <option value="Hindi">Hindi</option>
          </select>
        </div>

        {/* Notifications */}

        <SettingToggle
          icon={Bell}
          title="Notifications"
          description="Get updates about your bookings, services and offers."
          enabled={notifications}
          onChange={() => setNotifications((current) => !current)}
        />

        {/* Marketing */}

        <SettingToggle
          icon={Mail}
          title="Marketing Communications"
          description="Receive offers, new services and promotional updates."
          enabled={marketing}
          onChange={() => setMarketing((current) => !current)}
        />

        {/* Save */}

        <div className="border-t border-slate-100 bg-slate-50 p-6">
          <button
            type="button"
            onClick={handleSaveSettings}
            className="rounded-xl bg-[#012663] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#023B91]"
          >
            Save Preferences
          </button>
        </div>
      </section>

      {/* =========================================
          SECURITY
      ========================================== */}

      <section className="mt-6 max-w-5xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Header */}

        <div className="border-b border-slate-100 p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#1268E8]">
              <ShieldCheck className="h-6 w-6" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#102A54]">Security</h2>

              <p className="mt-1 text-sm text-slate-500">
                Keep your Doorstep account secure.
              </p>
            </div>
          </div>
        </div>

        {/* Change Password */}

        <button
          type="button"
          onClick={() => setShowPasswordForm((current) => !current)}
          className="flex w-full items-center gap-4 border-b border-slate-100 p-6 text-left transition hover:bg-slate-50"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 text-[#012663]">
            <Lock className="h-5 w-5" />
          </div>

          <div className="flex-1">
            <p className="font-semibold text-[#102A54]">Change Password</p>

            <p className="mt-1 text-sm text-slate-500">
              Update your password regularly for better security.
            </p>
          </div>

          <ChevronRight
            className={[
              "h-5 w-5 text-slate-400 transition",
              showPasswordForm ? "rotate-90" : "",
            ].join(" ")}
          />
        </button>

        {/* Password Form */}

        {showPasswordForm && (
          <form
            onSubmit={handlePasswordSubmit}
            className="border-b border-slate-100 bg-slate-50 p-6"
          >
            <div className="max-w-xl space-y-5">
              <PasswordField
                label="Current Password"
                name="currentPassword"
                value={passwordForm.currentPassword}
                onChange={updatePasswordField}
                visible={showCurrentPassword}
                setVisible={setShowCurrentPassword}
              />

              <PasswordField
                label="New Password"
                name="newPassword"
                value={passwordForm.newPassword}
                onChange={updatePasswordField}
                visible={showNewPassword}
                setVisible={setShowNewPassword}
              />

              <PasswordField
                label="Confirm New Password"
                name="confirmPassword"
                value={passwordForm.confirmPassword}
                onChange={updatePasswordField}
                visible={showConfirmPassword}
                setVisible={setShowConfirmPassword}
              />

              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  className="rounded-xl bg-[#012663] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#023B91]"
                >
                  Update Password
                </button>

                <button
                  type="button"
                  onClick={() => setShowPasswordForm(false)}
                  className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-[#102A54] hover:bg-slate-100"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Mobile Number */}

        <button
          type="button"
          onClick={() => setShowMobileForm((current) => !current)}
          className="flex w-full items-center gap-4 p-6 text-left transition hover:bg-slate-50"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 text-[#012663]">
            <Smartphone className="h-5 w-5" />
          </div>

          <div className="flex-1">
            <p className="font-semibold text-[#102A54]">Mobile Number</p>

            <p className="mt-1 text-sm text-slate-500">
              Manage your registered mobile number.
            </p>
          </div>

          <ChevronRight
            className={[
              "h-5 w-5 text-slate-400 transition",
              showMobileForm ? "rotate-90" : "",
            ].join(" ")}
          />
        </button>

        {/* Mobile Form */}

        {showMobileForm && (
          <form
            onSubmit={handleMobileSubmit}
            className="border-t border-slate-100 bg-slate-50 p-6"
          >
            <div className="max-w-xl">
              <label
                htmlFor="mobileNumber"
                className="text-sm font-semibold text-[#31476A]"
              >
                Mobile Number
              </label>

              <div className="relative mt-2">
                <Smartphone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                <input
                  id="mobileNumber"
                  value={mobileNumber}
                  onChange={(event) => setMobileNumber(event.target.value)}
                  maxLength={10}
                  inputMode="numeric"
                  placeholder="Enter 10-digit mobile number"
                  className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-11 pr-4 text-sm outline-none focus:border-[#1268E8] focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="mt-4 flex gap-3">
                <button
                  type="submit"
                  className="rounded-xl bg-[#012663] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#023B91]"
                >
                  Update Number
                </button>

                <button
                  type="button"
                  onClick={() => setShowMobileForm(false)}
                  className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-[#102A54]"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        )}
      </section>

      {/* =========================================
          PRIVACY
      ========================================== */}

      <section className="mt-6 max-w-5xl rounded-2xl border border-blue-100 bg-blue-50 p-6">
        <div className="flex gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#1268E8]">
            <ShieldCheck className="h-5 w-5" />
          </div>

          <div>
            <h2 className="font-bold text-[#102A54]">Your privacy matters</h2>

            <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-600">
              Doorstep keeps your personal information secure and only uses it
              to provide and improve your services.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

/* =====================================================
   TOGGLE COMPONENT
===================================================== */

function SettingToggle({ icon: Icon, title, description, enabled, onChange }) {
  return (
    <div className="flex items-center justify-between gap-5 border-b border-slate-100 p-6">
      <div className="flex items-start gap-4">
        <div className="mt-1">
          <Icon className="h-5 w-5 text-[#1268E8]" />
        </div>

        <div>
          <p className="font-semibold text-[#102A54]">{title}</p>

          <p className="mt-1 max-w-xl text-sm leading-5 text-slate-500">
            {description}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onChange}
        aria-label={`${title} ${enabled ? "enabled" : "disabled"}`}
        aria-pressed={enabled}
        className={[
          "relative h-7 w-12 shrink-0 rounded-full transition-colors",
          enabled ? "bg-[#012663]" : "bg-slate-300",
        ].join(" ")}
      >
        <span
          className={[
            "absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all",
            enabled ? "left-6" : "left-1",
          ].join(" ")}
        />
      </button>
    </div>
  );
}

/* =====================================================
   PASSWORD FIELD
===================================================== */

function PasswordField({ label, name, value, onChange, visible, setVisible }) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-semibold text-[#31476A]">
        {label}
      </label>

      <div className="relative mt-2">
        <input
          id={name}
          name={name}
          type={visible ? "text" : "password"}
          value={value}
          onChange={onChange}
          className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 pr-12 text-sm outline-none focus:border-[#1268E8] focus:ring-2 focus:ring-blue-100"
        />

        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#012663]"
        >
          {visible ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      </div>
    </div>
  );
}
