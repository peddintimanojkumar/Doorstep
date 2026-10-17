import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

/**
 * PasswordInput
 * Password field with a show/hide toggle. Shared by Login and Register so
 * the toggle logic isn't duplicated across three password fields.
 *
 * Props: id, label, registration (the object from react-hook-form's
 * register()), error (RHF field error object), autoComplete.
 */
export default function PasswordInput({
  id,
  label,
  registration,
  error,
  autoComplete = "current-password",
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm text-ink-600">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={visible ? "text" : "password"}
          autoComplete={autoComplete}
          {...registration}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className="w-full rounded-control border border-stone-300 px-3 py-2.5 pr-10 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fern-200"
        />
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-700"
        >
          {visible ? (
            <EyeOff className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Eye className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-600">
          {error.message}
        </p>
      )}
    </div>
  );
}
