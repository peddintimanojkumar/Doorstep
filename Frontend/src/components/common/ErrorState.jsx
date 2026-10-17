import Button from "./Button";

/**
 * ErrorState
 * Inline failure message with an optional retry action.
 * Props: title, message, onRetry (shows a "Try again" button when given).
 */
export default function ErrorState({
  title = "Something went wrong",
  message = "We couldn’t load this right now. Please try again.",
  onRetry,
}) {
  return (
    <div
      role="alert"
      className="rounded-card border border-stone-200 bg-stone-50 p-8 text-center"
    >
      <h3 className="text-lg">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-ink-500">{message}</p>
      {onRetry && (
        <Button
          variant="secondary"
          size="sm"
          className="mt-5"
          onClick={onRetry}
        >
          Try again
        </Button>
      )}
    </div>
  );
}
