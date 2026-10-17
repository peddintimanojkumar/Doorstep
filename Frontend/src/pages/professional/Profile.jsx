import { useEffect, useState } from "react";
import { Mail, MapPin, Phone, Save, UserRound } from "lucide-react";
import { ProfessionalPage } from "../../components/professional/ProfessionalPage";
import { useAuth } from "../../hooks/useAuth";

export default function ProfessionalProfile() {
  const { session, updateSession } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    bio: "",
    services: "",
  });
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    if (session)
      setForm({
        name: session.name || "",
        email: session.email || "",
        mobile: session.mobile || "",
        address: session.address || "",
        bio: session.bio || "",
        services: session.services || "",
      });
  }, [session]);
  function change(e) {
    setSaved(false);
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }
  function save(e) {
    e.preventDefault();
    updateSession({
      ...session,
      ...form,
      name: form.name.trim(),
      email: form.email.trim(),
      mobile: form.mobile.trim(),
      address: form.address.trim(),
      bio: form.bio.trim(),
      services: form.services.trim(),
    });
    setSaved(true);
  }
  const initials = (form.name || "Professional")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((x) => x[0])
    .join("")
    .toUpperCase();
  return (
    <ProfessionalPage
      title="Professional Profile"
      description="Keep your professional information accurate so customers know who they are booking."
    >
      <form
        onSubmit={save}
        className="grid gap-5 xl:grid-cols-[300px_minmax(0,1fr)]"
      >
        <section className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-[#DCEAFF] text-3xl font-bold text-[#012663]">
            {initials}
          </div>
          <h2 className="mt-4 text-xl font-bold text-[#102A54]">
            {form.name || "Professional"}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Verified service professional
          </p>
          <div className="mt-5 rounded-xl bg-[#F3F6FA] p-4 text-left text-sm text-slate-600">
            <p className="font-semibold text-[#102A54]">Profile tip</p>
            <p className="mt-1">
              Add your services and a short bio to improve customer confidence.
            </p>
          </div>
        </section>
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-5 md:grid-cols-2">
            <Field
              label="Full name"
              name="name"
              value={form.name}
              onChange={change}
              icon={UserRound}
              required
            />
            <Field
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={change}
              icon={Mail}
              required
            />
            <Field
              label="Mobile"
              name="mobile"
              value={form.mobile}
              onChange={change}
              icon={Phone}
            />
            <Field
              label="Service area"
              name="address"
              value={form.address}
              onChange={change}
              icon={MapPin}
            />
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-[#263B5B]">
                Services offered
              </label>
              <input
                name="services"
                value={form.services}
                onChange={change}
                placeholder="Home cleaning, plumbing, electrical"
                className="h-12 w-full rounded-xl border border-slate-300 px-4 text-sm outline-none focus:border-[#1268E8] focus:ring-4 focus:ring-[#1268E8]/10"
              />
            </div>
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-[#263B5B]">
                Professional bio
              </label>
              <textarea
                name="bio"
                value={form.bio}
                onChange={change}
                rows="5"
                placeholder="Tell customers about your experience..."
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-[#1268E8] focus:ring-4 focus:ring-[#1268E8]/10"
              />
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-5">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-[#012663] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#023B91]"
            >
              <Save className="h-4 w-4" />
              Save profile
            </button>
            {saved && (
              <span className="text-sm font-semibold text-green-600">
                Profile saved.
              </span>
            )}
          </div>
        </section>
      </form>
    </ProfessionalPage>
  );
}
function Field({
  label,
  name,
  value,
  onChange,
  icon: Icon,
  type = "text",
  required,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-[#263B5B]">
        {label}
      </label>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          required={required}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="h-12 w-full rounded-xl border border-slate-300 pl-11 pr-4 text-sm outline-none focus:border-[#1268E8] focus:ring-4 focus:ring-[#1268E8]/10"
        />
      </div>
    </div>
  );
}
