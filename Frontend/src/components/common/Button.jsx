import { Link } from "react-router-dom";

const VARIANTS = {
  primary: "bg-[#012663] text-white hover:bg-[#012663] shadow-rest",

  secondary:
    "border border-[#012663] bg-white text-[#012663] hover:bg-[#012663] hover:text-white",

  ghost: "bg-transparent text-[#012663] hover:bg-[#012663] hover:text-white",
};

const SIZES = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

export default function Button({
  to,
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}) {
  const classes = `
    inline-flex
    items-center
    justify-center
    gap-2
    rounded-control
    font-medium
    transition-all
    duration-200
    ${VARIANTS[variant]}
    ${SIZES[size]}
    ${className}
  `;

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
