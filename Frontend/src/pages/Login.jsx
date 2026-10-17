import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useAuth } from "../hooks/useAuth";
import { ROUTES } from "../constants/routes";

const loginSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Enter a valid email address."),
  password: z.string().min(1, "Password is required."),
});

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation;
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  async function onSubmit(data) {
    try {
      setSubmitError("");
      setIsSubmitting(true);

      const user = await login({
        email: data.identifier,
        password: data.password,
      });

      const destinationByRole = {
        customer: ROUTES.DASHBOARD,
        professional: ROUTES.PROFESSIONAL,
        admin: ROUTES.ADMIN,
      };

      const destination = destinationByRole[user.role] || ROUTES.HOME;
      const requestedPath = location.state?.from;

      const nextDestination =
        user.role === "customer" &&
        typeof requestedPath === "string" &&
        requestedPath.startsWith(ROUTES.BOOKING)
          ? requestedPath
          : destination;

      navigate(nextDestination, { replace: true });
    } catch (error) {
      setSubmitError(
        error.response?.data?.message ||
          error.message ||
          "Unable to log in. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#DBDBDB] px-4 py-10">
      <section className="w-full max-w-md rounded-2xl bg-[#F3F4F6] p-6 shadow-lg sm:p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#012663]">Welcome Back</h1>

          <p className="mt-2 text-sm text-gray-600">
            Sign in to your Doorstep account
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label
              htmlFor="identifier"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>

            <input
              id="identifier"
              type="email"
              autoComplete="email"
              placeholder="Enter your registered email"
              {...register("identifier")}
              aria-invalid={Boolean(errors.identifier)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-[#012663] focus:ring-2 focus:ring-[#012663]/20"
            />

            {errors.identifier && (
              <p className="mt-1 text-sm text-red-600">
                {errors.identifier.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Password
            </label>

            <div className="flex overflow-hidden rounded-lg border border-gray-300 bg-white focus-within:border-[#012663] focus-within:ring-2 focus-within:ring-[#012663]/20">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Enter your password"
                {...register("password")}
                aria-invalid={Boolean(errors.password)}
                className="min-w-0 flex-1 bg-transparent px-4 py-3 outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="px-4 text-sm font-medium text-[#012663] hover:bg-gray-100"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          {submitError && (
            <p
              role="alert"
              className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
            >
              {submitError}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-[#012663] px-4 py-3 font-semibold text-white transition hover:bg-[#023B91] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Logging In..." : "Log In"}
          </button>
        </form>

        {/* Sign-up link for new users */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have account?{" "}
          <Link
            to={ROUTES.REGISTER}
            className="font-semibold text-[#012663] transition-colors hover:text-[#023B91] hover:underline"
          >
            Sign up
          </Link>
        </p>
      </section>
    </main>
  );
}
