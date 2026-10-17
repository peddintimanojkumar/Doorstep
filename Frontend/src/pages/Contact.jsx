import {
  ArrowRight,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";

import Button from "../components/common/Button";
import { ROUTES } from "../constants/routes";
import { usePageMeta } from "../hooks/usePageMeta";
import brand from "../config/brand";

const CONTACT_OPTIONS = [
  {
    icon: Phone,
    title: "Call us",
    description: "Speak with our support team.",
    value: "+91 90000 00000",
    action: "tel:+919000000000",
  },
  {
    icon: Mail,
    title: "Email us",
    description: "Send us your questions anytime.",
    value: "support@doorstep.com",
    action: "mailto:support@doorstep.com",
  },
  {
    icon: MessageCircle,
    title: "Chat with us",
    description: "Get help with your Doorstep experience.",
    value: "Start a conversation",
    action: "#contact-form",
  },
];

const FAQ_ITEMS = [
  {
    question: "How do I book a service?",
    answer:
      "Go to the Services page, select the service you need, choose the available package if applicable, and continue through the booking process.",
  },
  {
    question: "How can I become a professional?",
    answer:
      "Visit the Become a Professional page and create your professional profile to get started.",
  },
  {
    question: "How can I contact Doorstep support?",
    answer:
      "You can use the contact form on this page or reach out using the available support contact options.",
  },
  {
    question: "Can I cancel my booking?",
    answer:
      "Booking cancellation depends on the current booking status and the applicable cancellation rules.",
  },
];

export default function Contact() {
  usePageMeta({
    title: `Contact Us — ${brand.name}`,
    description:
      "Get in touch with Doorstep for support, questions and service assistance.",
  });

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    setSubmitted(true);

    setForm({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  }

  return (
    <main className="min-h-screen bg-[#F5F8FC]">
      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative overflow-hidden bg-[#dbdbdb]">
        <div className="absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full bg-[#EAF2FF]" />

        <div className="absolute -bottom-40 -left-40 h-[420px] w-[420px] rounded-full bg-[#F2F7FF]" />

        <div className="relative mx-auto max-w-7xl px-6 py-16 text-center sm:py-20 lg:px-8 lg:py-24">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#EAF2FF] px-4 py-2 text-sm font-semibold text-[#1268E8]">
            <MessageCircle className="h-4 w-4" />
            We're here to help
          </span>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-[#012663] sm:text-5xl lg:text-6xl">
            Contact Doorstep
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#5A6F90] sm:text-lg">
            Have a question, need help with a booking, or want to know more
            about Doorstep? Get in touch with our team.
          </p>
        </div>
      </section>

      {/* =====================================================
          CONTACT OPTIONS
      ===================================================== */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {CONTACT_OPTIONS.map((option) => {
            const Icon = option.icon;

            return (
              <a
                key={option.title}
                href={option.action}
                className="group rounded-2xl border border-slate-200 bg-[#F3F4F6] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#1268E8] transition group-hover:bg-[#1268E8] group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>

                  <div className="min-w-0">
                    <h2 className="font-bold text-[#102A54]">{option.title}</h2>

                    <p className="mt-1 text-sm text-[#60728D]">
                      {option.description}
                    </p>

                    <p className="mt-3 break-words text-sm font-semibold text-[#1268E8]">
                      {option.value}
                    </p>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* =====================================================
          CONTACT FORM + INFO
      ===================================================== */}
      <section
        id="contact-form"
        className="mx-auto max-w-7xl px-6 pb-16 lg:px-8 lg:pb-20"
      >
        <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
          {/* FORM */}
          <div className="rounded-3xl border border-slate-200 bg-[#F3F4F6] p-6 shadow-sm sm:p-8 lg:p-10">
            <div className="mb-8">
              <span className="text-sm font-semibold uppercase tracking-wider text-[#1268E8]">
                Send us a message
              </span>

              <h2 className="mt-3 text-3xl font-bold text-[#012663]">
                How can we help?
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#60728D]">
                Fill out the form below and tell us what you need help with.
              </p>
            </div>

            {submitted && (
              <div className="mb-6 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />

                <div>
                  <p className="text-sm font-semibold text-green-800">
                    Message received
                  </p>

                  <p className="mt-1 text-sm text-green-700">
                    Thank you for contacting Doorstep. Our team will get back to
                    you.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name + Email */}
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField
                  label="Full Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />

                <FormField
                  label="Email Address"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  required
                />
              </div>

              {/* Phone + Subject */}
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField
                  label="Mobile Number"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Enter your mobile number"
                  required
                />

                <FormField
                  label="Subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="What can we help with?"
                  required
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-[#31476A]"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help..."
                  rows={6}
                  required
                  className="w-full resize-y rounded-xl border border-[#CBD8E8] bg-white px-4 py-3 text-sm text-[#102A54] outline-none transition placeholder:text-slate-400 focus:border-[#1268E8] focus:ring-4 focus:ring-[#1268E8]/10"
                />
              </div>

              {/* Submit */}
              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-slate-500">
                  We respect your privacy and will only use your information to
                  respond to your request.
                </p>

                <button
                  type="submit"
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#012663] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#023B91] focus:outline-none focus:ring-4 focus:ring-[#012663]/20"
                >
                  Send Message
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>

          {/* CONTACT INFORMATION */}
          <div className="space-y-5">
            <div className="rounded-3xl bg-[#012663] p-7 text-white sm:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                <MapPin className="h-6 w-6" />
              </div>

              <h2 className="mt-6 text-2xl font-bold">Visit us</h2>

              <p className="mt-3 text-sm leading-6 text-blue-100">
                Our team is here to help with your questions and service
                experience.
              </p>

              <div className="mt-7 flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#88BDF2]" />

                <div>
                  <p className="text-sm font-semibold">Doorstep Support</p>

                  <p className="mt-1 text-sm leading-6 text-blue-100">
                    Hyderabad, Telangana
                    <br />
                    India
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#1268E8]">
                <Clock3 className="h-6 w-6" />
              </div>

              <h2 className="mt-6 text-xl font-bold text-[#102A54]">
                Support hours
              </h2>

              <div className="mt-5 space-y-4">
                <InfoRow label="Monday - Friday" value="9:00 AM - 6:00 PM" />

                <InfoRow label="Saturday" value="10:00 AM - 4:00 PM" />

                <InfoRow label="Sunday" value="Closed" />
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-8">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#1268E8]">
                  <ShieldCheck className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="font-bold text-[#102A54]">
                    Need booking help?
                  </h3>

                  <p className="mt-1 text-sm text-[#60728D]">
                    View your bookings and manage your services.
                  </p>
                </div>
              </div>

              <Button
                to={ROUTES.LOGIN}
                variant="secondary"
                size="sm"
                className="mt-5 w-full"
              >
                View My Bookings
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FAQ
      ===================================================== */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8 lg:py-20">
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-[#1268E8]">
              Frequently asked questions
            </span>

            <h2 className="mt-3 text-3xl font-bold text-[#012663] sm:text-4xl">
              Common questions
            </h2>

            <p className="mt-4 text-base text-[#5A6F90]">
              Here are some quick answers to common questions.
            </p>
          </div>

          <div className="mt-10 space-y-4">
            {FAQ_ITEMS.map((item) => (
              <details
                key={item.question}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <summary className="cursor-pointer list-none font-semibold text-[#102A54]">
                  <div className="flex items-center justify-between gap-4">
                    <span>{item.question}</span>

                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#EAF2FF] text-[#1268E8] transition group-open:rotate-45">
                      +
                    </span>
                  </div>
                </summary>

                <p className="mt-4 max-w-3xl text-sm leading-6 text-[#60728D]">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="rounded-3xl bg-[#012663] px-6 py-14 text-center sm:px-10">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            We're here when you need us.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-blue-100">
            Explore our services or learn more about how Doorstep makes everyday
            service booking easier.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              to={ROUTES.SERVICES}
              variant="secondary"
              size="lg"
              className="border-white bg-white text-[#012663] hover:bg-blue-50"
            >
              Explore Services
              <ArrowRight className="h-5 w-5" />
            </Button>

            <Button
              to={ROUTES.HOW_IT_WORKS}
              size="lg"
              className="border border-white/30 bg-[#023B91] hover:bg-[#0348A7]"
            >
              How It Works
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

/* =============================================================
   FORM FIELD
============================================================= */

function FormField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-[#31476A]"
      >
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="h-12 w-full rounded-xl border border-[#CBD8E8] bg-white px-4 text-sm text-[#102A54] outline-none transition placeholder:text-slate-400 focus:border-[#1268E8] focus:ring-4 focus:ring-[#1268E8]/10"
      />
    </div>
  );
}

/* =============================================================
   INFO ROW
============================================================= */

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-3 last:border-0 last:pb-0">
      <span className="text-sm text-[#60728D]">{label}</span>

      <span className="text-sm font-semibold text-[#31476A]">{value}</span>
    </div>
  );
}
