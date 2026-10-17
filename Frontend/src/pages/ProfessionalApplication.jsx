import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, BriefcaseBusiness, Eye, EyeOff } from "lucide-react";
import Button from "../components/common/Button";
import { ROUTES } from "../constants/routes";

export default function ProfessionalApplication() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    serviceCategory: "",
    experience: "",
    serviceArea: "",
    skills: "",
    availability: "Full-time",
    description: "",
    password: "",
    confirmPassword: "",
    identityDocument: null,
    addressProof: null,
    certificate: null,
  });

  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  function updateField(event) {
    const { name, value, files } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: files ? files[0] : value,
    }));

    setMessage("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (isSubmitted) return;

    if (form.password.length < 8) {
      setMessage("Password must contain at least 8 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setMessage("Passwords do not match. Please try again.");
      return;
    }

    setMessage("Submitting your application...");

    const formData = new FormData();

    formData.append("fullName", form.fullName.trim());
    formData.append("email", form.email.trim());
    formData.append("phone", form.phone.trim());
    formData.append("serviceCategory", form.serviceCategory);
    formData.append("experience", form.experience);
    formData.append("serviceArea", form.serviceArea.trim());
    formData.append("skills", form.skills.trim());
    formData.append("availability", form.availability);
    formData.append("description", form.description.trim());
    formData.append("password", form.password);
    formData.append("confirmPassword", form.confirmPassword);

    if (form.identityDocument) {
      formData.append("identityDocument", form.identityDocument);
    }

    if (form.addressProof) {
      formData.append("addressProof", form.addressProof);
    }

    if (form.certificate) {
      formData.append("certificate", form.certificate);
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/professional-applications",
        {
          method: "POST",
          body: formData,
        },
      );

      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.success || !result.application) {
        throw new Error(
          result.message || `Application failed (HTTP ${response.status})`,
        );
      }

      setIsSubmitted(true);
      setMessage(
        `Application submitted successfully! Reference ID: ${result.application.id}`,
      );
    } catch (error) {
      console.error("Professional application submission error:", error);
      setIsSubmitted(false);
      setMessage(
        error.message || "Unable to submit your application. Please try again.",
      );
    }
  }

  const inputClass =
    "mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#012663] focus:ring-2 focus:ring-blue-100";

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-4xl">
        <Link
          to={ROUTES.HOME}
          className="inline-flex items-center gap-2 text-sm text-[#012663] hover:underline"
        >
          <ArrowLeft size={17} />
          Back to home
        </Link>

        <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="bg-[#012663] px-6 py-8 text-white sm:px-10">
            <BriefcaseBusiness size={34} />
            <h1 className="mt-4 text-2xl font-bold sm:text-3xl">
              Become a Doorstep Professional
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-blue-100">
              Tell us about your skills and experience. Our team will review
              your application before professional access is granted.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 p-6 sm:p-10">
            <section>
              <h2 className="text-lg font-semibold text-slate-900">
                Personal details
              </h2>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-medium">
                  Full name *
                  <input
                    className={inputClass}
                    name="fullName"
                    value={form.fullName}
                    onChange={updateField}
                    required
                    autoComplete="name"
                  />
                </label>

                <label className="text-sm font-medium">
                  Email address *
                  <input
                    className={inputClass}
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={updateField}
                    required
                    autoComplete="email"
                  />
                </label>

                <label className="text-sm font-medium">
                  Password *
                  <div className="relative mt-1">
                    <input
                      className={`${inputClass} pr-11`}
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={form.password}
                      onChange={updateField}
                      required
                      minLength={8}
                      autoComplete="new-password"
                      placeholder="At least 8 characters"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((previous) => !previous)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-[#012663]"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                    </button>
                  </div>
                </label>

                <label className="text-sm font-medium">
                  Re-enter password *
                  <div className="relative mt-1">
                    <input
                      className={`${inputClass} pr-11`}
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={form.confirmPassword}
                      onChange={updateField}
                      required
                      minLength={8}
                      autoComplete="new-password"
                      placeholder="Enter the same password again"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword((previous) => !previous)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-[#012663]"
                      aria-label={
                        showConfirmPassword
                          ? "Hide re-entered password"
                          : "Show re-entered password"
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}
                    </button>
                  </div>
                </label>

                <label className="text-sm font-medium">
                  Mobile number *
                  <input
                    className={inputClass}
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={updateField}
                    required
                    autoComplete="tel"
                  />
                </label>

                <label className="text-sm font-medium">
                  Service category *
                  <select
                    className={inputClass}
                    name="serviceCategory"
                    value={form.serviceCategory}
                    onChange={updateField}
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="Home Cleaning Services">
                      Home Cleaning Services
                    </option>
                    <option value="Plumbing Services">Plumbing Services</option>
                    <option value="Electrical Services">
                      Electrical Services
                    </option>
                    <option value="Home Maintenance Services">
                      Home Maintenance Services
                    </option>
                    <option value="Child and Elderly Care">
                      Child and Elderly Care
                    </option>
                    <option value="Other">Other</option>
                  </select>
                </label>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900">
                Professional details
              </h2>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-medium">
                  Years of experience *
                  <input
                    className={inputClass}
                    type="number"
                    name="experience"
                    min="0"
                    max="60"
                    value={form.experience}
                    onChange={updateField}
                    required
                  />
                </label>

                <label className="text-sm font-medium">
                  Service area *
                  <input
                    className={inputClass}
                    name="serviceArea"
                    value={form.serviceArea}
                    onChange={updateField}
                    required
                    placeholder="City or areas you cover"
                  />
                </label>

                <label className="text-sm font-medium">
                  Availability *
                  <select
                    className={inputClass}
                    name="availability"
                    value={form.availability}
                    onChange={updateField}
                    required
                  >
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Weekends</option>
                    <option>Flexible</option>
                  </select>
                </label>

                <label className="text-sm font-medium">
                  Skills *
                  <input
                    className={inputClass}
                    name="skills"
                    value={form.skills}
                    onChange={updateField}
                    required
                    placeholder="e.g. pipe repair, leak detection"
                  />
                </label>
              </div>

              <label className="mt-4 block text-sm font-medium">
                Experience and services description *
                <textarea
                  className={inputClass}
                  name="description"
                  value={form.description}
                  onChange={updateField}
                  required
                  rows={4}
                  placeholder="Describe your skills, experience and services."
                />
              </label>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900">
                Verification documents
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Upload clear PDF, JPG or PNG files. Submit genuine documents
                only. Required documents may vary by service category.
              </p>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {[
                  ["identityDocument", "Government ID"],
                  ["addressProof", "Address proof"],
                  [
                    "certificate",
                    "Experience or qualification certificate",
                    false,
                  ],
                ].map(
                  ([
                    name,
                    label,

                    //  Required document that a professional need to upload the doctument for sure
                    // for testing purpose we are commenting it
                    //  required
                  ]) => (
                    <label
                      key={name}
                      className="rounded-xl border border-dashed border-slate-300 p-4 text-sm font-medium"
                    >
                      {label} (optional)
                      {/* {required ? "*" : "(optional)"} */}
                      <input
                        className="mt-3 block w-full text-sm"
                        type="file"
                        name={name}
                        accept=".pdf,.jpg,.jpeg,.png"
                        // required={required}
                        onChange={updateField}
                      />
                    </label>
                  ),
                )}
              </div>
            </section>

            <label className="flex items-start gap-3 text-sm text-slate-600">
              <input type="checkbox" required className="mt-1" />I confirm that
              the information provided is accurate and consent to the
              verification of my application.
            </label>

            {message && (
              <p
                role="status"
                className="rounded-lg bg-blue-50 p-3 text-sm text-[#012663]"
              >
                {message}
              </p>
            )}

            <div className="flex flex-wrap gap-3">
              <Button
                type={isSubmitted ? "button" : "submit"}
                size="lg"
                onClick={() => {
                  if (isSubmitted) {
                    navigate(ROUTES.LOGIN, {
                      state: { email: form.email },
                    });
                  }
                }}
              >
                {isSubmitted ? "Review application" : "Submit"}
              </Button>

              <Button to={ROUTES.HOME} variant="secondary" size="lg">
                Cancel
              </Button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
