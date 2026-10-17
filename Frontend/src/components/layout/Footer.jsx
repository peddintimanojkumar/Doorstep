import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

import brand from "../../config/brand";
import { footerNav } from "../../data/navigation";

const SOCIAL_ICONS = [
  { key: "instagram", Icon: FaInstagram, label: "Instagram" },
  { key: "twitter", Icon: FaTwitter, label: "Twitter" },
  { key: "facebook", Icon: FaFacebookF, label: "Facebook" },
  { key: "linkedin", Icon: FaLinkedinIn, label: "LinkedIn" },
];

function FooterColumn({ title, links }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-white">{title}</h3>

      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            {link.to ? (
              <Link
                to={link.to}
                className="
                  inline-block
                  text-sm
                  text-white/90
                  transition-all
                  duration-200
                  hover:translate-x-1
                  hover:text-white
                "
              >
                {link.label}
              </Link>
            ) : (
              <span className="text-sm text-white/60" title="Coming soon">
                {link.label}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="border-t  bg-[#012663] text-white">
      <div className="container grid grid-cols-2 gap-x-6 gap-y-10 py-14 md:grid-cols-6">
        {/* Brand */}
        <div className="col-span-2 md:col-span-2">
          <Link to="/" className="flex items-center gap-2">
            <img
              src={brand.logo.iconSrc}
              alt={brand.logo.alt}
              className="h-7 w-7"
            />

            <span className="font-display text-lg font-semibold text-white">
              {brand.name}
            </span>
          </Link>

          <p className="mt-4 max-w-xs text-sm leading-6 text-white/90">
            {brand.description}
          </p>

          {/* Social Icons */}
          <div className="mt-6 flex gap-3">
            {SOCIAL_ICONS.map(({ key, Icon, label }) => (
              <a
                key={key}
                href={brand.social[key]}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="
                  rounded-control
                  border
                  border-white/40
                  bg-white/20
                  p-2
                  text-white
                  transition-all
                  duration-200
                  hover:-translate-y-1
                  hover:scale-110
                  hover:border-white
                  hover:bg-white/30
                  hover:text-white
                "
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        {/* Footer Columns */}
        <FooterColumn title="Company" links={footerNav.company} />

        <FooterColumn title="Services" links={footerNav.services} />

        <FooterColumn title="Support" links={footerNav.support} />

        <FooterColumn title="Legal" links={footerNav.legal} />
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#6FADE8]">
        <div
          className="
            container
            flex
            flex-col
            gap-2
            py-6
            text-sm
            text-white/90
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <p>
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>

          <p>{brand.contact.address}</p>
        </div>
      </div>
    </footer>
  );
}
