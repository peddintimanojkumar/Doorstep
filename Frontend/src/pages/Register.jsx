import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PageContainer from "../components/layout/PageContainer";
import Button from "../components/common/Button";
import PasswordInput from "../components/common/PasswordInput";
import { useAuth } from "../hooks/useAuth";
import { usePageMeta } from "../hooks/usePageMeta";
import { registerSchema } from "../utils/authSchemas";
import { categoryGroups } from "../data/categories";
import { ROUTES } from "../constants/routes";
import brand from "../config/brand";
import { useState } from "react";

const PREFERENCE_OPTIONS = categoryGroups.filter((group) => group.id !== "all");

const FIELD_CLASS =
  "w-full rounded-control border border-stone-300 px-3 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fern-200";

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm text-ink-600">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-600">
          {error.message}
        </p>
      )}
    </div>
  );
}

export default function Register() {
  usePageMeta({
    title: `Create an account — ${brand.name}`,
    description: `Create a ${brand.name} account.`,
  });

  const navigate = useNavigate();
  const { register: createCustomerAccount } = useAuth();
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      mobile: "",
      email: "",
      password: "",
      confirmPassword: "",
      address: "",
      emergencyContact: "",
      servicePreferences: [],
    },
  });

  const onSubmit = async (data) => {
    try {
      setSubmitError("");

      await createCustomerAccount(data);

      navigate(ROUTES.DASHBOARD, { replace: true });
    } catch (error) {
      setSubmitError(
        error.response?.data?.message ||
          error.message ||
          "Unable to create your account. Please try again.",
      );
    }
  };

  return (
    <section className="py-14 sm:py-20 bg-[#dbdbdb]">
      <PageContainer className="max-w-xl">
        <div className="rounded-2xl border border-slate-200 bg-[#F3F4F6] p-6 shadow-sm sm:p-8">
          <h1 className="text-3xl">Create your account</h1>
          <p className="mt-2 text-sm text-ink-500">
            Book trusted professionals in a few minutes.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="mt-8 space-y-5"
          >
            <Field id="reg-name" label="Full name" error={errors.name}>
              <input
                id="reg-name"
                type="text"
                autoComplete="name"
                {...register("name")}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "reg-name-error" : undefined}
                className={FIELD_CLASS}
              />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                id="reg-mobile"
                label="Mobile number"
                error={errors.mobile}
              >
                <input
                  id="reg-mobile"
                  type="tel"
                  autoComplete="tel"
                  {...register("mobile")}
                  aria-invalid={Boolean(errors.mobile)}
                  aria-describedby={
                    errors.mobile ? "reg-mobile-error" : undefined
                  }
                  className={FIELD_CLASS}
                />
              </Field>
              <Field id="reg-email" label="Email" error={errors.email}>
                <input
                  id="reg-email"
                  type="email"
                  autoComplete="email"
                  {...register("email")}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={
                    errors.email ? "reg-email-error" : undefined
                  }
                  className={FIELD_CLASS}
                />
              </Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <PasswordInput
                id="reg-password"
                label="Password"
                registration={register("password")}
                error={errors.password}
                autoComplete="new-password"
              />
              <PasswordInput
                id="reg-confirm-password"
                label="Confirm password"
                registration={register("confirmPassword")}
                error={errors.confirmPassword}
                autoComplete="new-password"
              />
            </div>

            <Field id="reg-address" label="Address" error={errors.address}>
              <textarea
                id="reg-address"
                rows={2}
                {...register("address")}
                aria-invalid={Boolean(errors.address)}
                aria-describedby={
                  errors.address ? "reg-address-error" : undefined
                }
                className={FIELD_CLASS}
              />
            </Field>

            <Field
              id="reg-emergency-contact"
              label="Emergency contact (optional)"
              error={errors.emergencyContact}
            >
              <input
                id="reg-emergency-contact"
                type="text"
                placeholder="Name and phone number"
                {...register("emergencyContact")}
                className={FIELD_CLASS}
              />
            </Field>

            <fieldset>
              <legend className="mb-2 text-sm text-ink-600">
                Service preferences (optional)
              </legend>
              <div className="grid gap-2 sm:grid-cols-2">
                {PREFERENCE_OPTIONS.map((group) => (
                  <label
                    key={group.id}
                    className="flex items-center gap-2 text-sm text-ink-600"
                  >
                    <input
                      type="checkbox"
                      value={group.id}
                      {...register("servicePreferences")}
                      className="h-4 w-4 rounded border-stone-300 text-fern-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fern-200"
                    />
                    {group.label}
                  </label>
                ))}
              </div>
            </fieldset>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              Create account
            </Button>
          </form>
          {submitError && (
            <p
              role="alert"
              className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
            >
              {submitError}
            </p>
          )}
          <p className="mt-6 text-center text-sm text-ink-500">
            Already have an account?{" "}
            <Button
              to={ROUTES.LOGIN}
              variant="ghost"
              size="sm"
              className="px-1"
            >
              Log in
            </Button>
          </p>
        </div>
      </PageContainer>
    </section>
  );
}
