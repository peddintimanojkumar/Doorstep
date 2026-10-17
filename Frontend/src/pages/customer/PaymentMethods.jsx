import {
  CreditCard,
  Plus,
  ShieldCheck,
  Trash2,
  WalletCards,
} from "lucide-react";
import { useState } from "react";

import { usePageMeta } from "../../hooks/usePageMeta";
import brand from "../../config/brand";

export default function PaymentMethods() {
  usePageMeta({
    title: `Payment Methods — ${brand.name}`,
  });

  const [cards, setCards] = useState([
    {
      id: 1,
      type: "Visa",
      last4: "4242",
      expiry: "12/28",
      isDefault: true,
    },
  ]);

  const [showForm, setShowForm] = useState(false);

  function addCard(event) {
    event.preventDefault();

    setCards((current) => [
      ...current,
      {
        id: Date.now(),
        type: "Visa",
        last4: "1234",
        expiry: "12/29",
        isDefault: false,
      },
    ]);

    setShowForm(false);
  }

  function removeCard(id) {
    setCards((current) => current.filter((card) => card.id !== id));
  }

  return (
    <div className="min-h-full p-5 sm:p-8 lg:p-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-[#1268E8]">ACCOUNT</p>

          <h1 className="mt-1 text-3xl font-bold text-[#012663]">
            Payment Methods
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage your cards and payment options.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowForm((value) => !value)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#012663] px-5 py-3 text-sm font-semibold text-white hover:bg-[#023B91]"
        >
          <Plus className="h-4 w-4" />
          Add Payment Method
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={addCard}
          className="mt-6 max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <h2 className="text-lg font-bold text-[#102A54]">
            Add Payment Method
          </h2>

          <div className="mt-5">
            <label className="text-sm font-medium text-[#31476A]">
              Card Number
            </label>

            <div className="relative mt-2">
              <CreditCard className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

              <input
                required
                placeholder="1234 5678 9012 3456"
                className="h-12 w-full rounded-xl border border-slate-300 pl-11 pr-4 text-sm outline-none focus:border-[#1268E8]"
              />
            </div>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <input
              placeholder="MM / YY"
              className="h-12 rounded-xl border border-slate-300 px-4 text-sm outline-none focus:border-[#1268E8]"
            />

            <input
              placeholder="CVV"
              className="h-12 rounded-xl border border-slate-300 px-4 text-sm outline-none focus:border-[#1268E8]"
            />
          </div>

          <div className="mt-5 flex gap-3">
            <button
              type="submit"
              className="rounded-xl bg-[#012663] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#023B91]"
            >
              Save Card
            </button>

            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-[#102A54]"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="mt-8 max-w-3xl space-y-5">
        {cards.map((card) => (
          <div
            key={card.id}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#1268E8]">
                  <CreditCard className="h-6 w-6" />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-bold text-[#102A54]">{card.type}</h2>

                    {card.isDefault && (
                      <span className="rounded-full bg-green-50 px-2 py-1 text-[11px] font-semibold text-green-700">
                        Default
                      </span>
                    )}
                  </div>

                  <p className="mt-1 text-sm text-slate-500">
                    •••• •••• •••• {card.last4}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Expires {card.expiry}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => removeCard(card.id)}
                className="rounded-lg p-2 text-red-500 hover:bg-red-50"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 max-w-3xl rounded-2xl border border-green-100 bg-green-50 p-5">
        <div className="flex gap-3">
          <ShieldCheck className="h-6 w-6 shrink-0 text-green-600" />

          <div>
            <h3 className="font-semibold text-green-800">
              Your payments are secure
            </h3>

            <p className="mt-1 text-sm leading-6 text-green-700">
              Your payment details are protected and are not displayed publicly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
