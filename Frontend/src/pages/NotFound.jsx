import { Link } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer";
import { ROUTES } from "../constants/routes";

export default function NotFound() {
  return (
    <PageContainer className="flex flex-col items-start gap-4 py-24">
      <p className="text-sm font-medium text-fern-600">404</p>
      <h1 className="text-3xl">We can't find that page</h1>
      <p className="max-w-prose text-ink-500">
        The page you're looking for may have moved or no longer exists. Head
        back home and we'll help you find what you need.
      </p>
      <Link
        to={ROUTES.HOME}
        className="mt-2 inline-flex items-center rounded-control bg-fern-600 px-5 py-2.5 text-sm font-medium text-white shadow-rest transition-colors hover:bg-fern-700"
      >
        Back to home
      </Link>
    </PageContainer>
  );
}
