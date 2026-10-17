import { useEffect, useState } from "react";
import { Bell, LockKeyhole, Save, ShieldCheck } from "lucide-react";
import { ProfessionalPage } from "../../components/professional/ProfessionalPage";

const KEY = "doorstep.professional.settings";
const DEFAULTS = { notifications: true, emailUpdates: true, available: true };
export default function ProfessionalSettings() {
  const [settings, setSettings] = useState(DEFAULTS);
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    try {
      const value = JSON.parse(localStorage.getItem(KEY));
      if (value) setSettings({ ...DEFAULTS, ...value });
    } catch {}
  }, []);
  function toggle(name) {
    setSaved(false);
    setSettings((s) => ({ ...s, [name]: !s[name] }));
  }
  function save() {
    localStorage.setItem(KEY, JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }
  return (
    <ProfessionalPage
      title="Settings"
      description="Control notifications, availability and account preferences."
    >
      <div className="grid gap-5 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <Header icon={Bell} title="Notifications" />
          <Setting
            label="Job requests"
            description="Receive alerts when a new customer request arrives."
            value={settings.notifications}
            onClick={() => toggle("notifications")}
          />
          <Setting
            label="Email updates"
            description="Receive important account and booking updates by email."
            value={settings.emailUpdates}
            onClick={() => toggle("emailUpdates")}
          />
        </section>
        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <Header icon={ShieldCheck} title="Professional availability" />
          <Setting
            label="Accept new jobs"
            description="Allow your account to receive new job requests."
            value={settings.available}
            onClick={() => toggle("available")}
          />
          <div className="flex gap-3 border-t border-slate-100 p-5">
            <LockKeyhole className="h-5 w-5 text-[#1268E8]" />
            <div>
              <p className="font-semibold text-[#102A54]">Account security</p>
              <p className="mt-1 text-sm text-slate-500">
                Password and identity verification can be connected to your
                backend later.
              </p>
            </div>
          </div>
        </section>
      </div>
      <div className="mt-5 flex items-center gap-3">
        <button
          onClick={save}
          className="inline-flex items-center gap-2 rounded-lg bg-[#012663] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#023B91]"
        >
          <Save className="h-4 w-4" />
          Save settings
        </button>
        {saved && (
          <span className="text-sm font-semibold text-green-600">
            Settings saved.
          </span>
        )}
      </div>
    </ProfessionalPage>
  );
}
function Header({ icon: Icon, title }) {
  return (
    <div className="flex items-center gap-3 border-b border-slate-100 p-5">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF4FF] text-[#1268E8]">
        <Icon className="h-5 w-5" />
      </span>
      <h2 className="text-lg font-bold text-[#102A54]">{title}</h2>
    </div>
  );
}
function Setting({ label, description, value, onClick }) {
  return (
    <div className="flex items-center justify-between gap-5 border-b border-slate-100 p-5 last:border-0">
      <div>
        <p className="font-semibold text-[#102A54]">{label}</p>
        <p className="mt-1 text-sm leading-5 text-slate-500">{description}</p>
      </div>
      <button
        type="button"
        onClick={onClick}
        aria-pressed={value}
        className={`relative h-7 w-12 shrink-0 rounded-full transition ${value ? "bg-[#1268E8]" : "bg-slate-300"}`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${value ? "left-6" : "left-1"}`}
        />
      </button>
    </div>
  );
}
