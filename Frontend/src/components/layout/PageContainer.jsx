/**
 * PageContainer
 * Consistent max-width + horizontal padding wrapper used by every page.
 * Keeping this in one place means layout width changes happen once.
 *
 * Props:
 *  - children: ReactNode
 *  - className: string (optional extra classes)
 *  - as: element type to render (default "div")
 */
export default function PageContainer({
  children,
  className = "",
  as: Tag = "div",
}) {
  return <Tag className={`container ${className}`}>{children}</Tag>;
}
