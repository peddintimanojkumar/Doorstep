import { useEffect, useState } from "react";
import Button from "../common/Button";
import { getAddresses, createAddress } from "../../services/api/addressesApi";

const FIELD_CLASS =
  "w-full rounded-control border border-stone-300 px-3 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fern-200";

const EMPTY_ADDRESS = {
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  pincode: "",
  landmark: "",
};

export default function LocationSelector({ value, onNext, onBack }) {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(
    value?.addressId ? String(value.addressId) : "",
  );
  const [showNewAddress, setShowNewAddress] = useState(false);
  const [newAddress, setNewAddress] = useState(EMPTY_ADDRESS);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadAddresses() {
      try {
        setIsLoading(true);
        setError("");

        const result = await getAddresses();

        if (cancelled) return;

        setAddresses(result);

        const previousSelection = result.find(
          (address) => String(address.id) === String(value?.addressId),
        );

        const defaultAddress = result.find((address) => address.isDefault);

        const selected = previousSelection || defaultAddress || result[0];

        if (selected) {
          setSelectedAddressId(String(selected.id));
        } else {
          setSelectedAddressId("");
          setShowNewAddress(true);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err.response?.data?.message ||
              "Unable to load saved addresses. Please try again.",
          );
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    loadAddresses();

    return () => {
      cancelled = true;
    };
  }, [value?.addressId]);

  function updateNewAddress(event) {
    const { name, value } = event.target;

    setNewAddress((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleContinue(event) {
    event.preventDefault();
    setError("");

    if (isLoading || isSaving) return;

    try {
      let selectedAddress;

      if (showNewAddress) {
        const { addressLine1, city, state, pincode } = newAddress;

        if (
          !addressLine1.trim() ||
          !city.trim() ||
          !state.trim() ||
          !/^\d{6}$/.test(pincode.trim())
        ) {
          setError(
            "Enter the address, city, state, and a valid 6-digit PIN code.",
          );
          return;
        }

        setIsSaving(true);

        selectedAddress = await createAddress({
          ...newAddress,
          addressLine1: addressLine1.trim(),
          addressLine2: newAddress.addressLine2.trim() || null,
          city: city.trim(),
          state: state.trim(),
          pincode: pincode.trim(),
          landmark: newAddress.landmark.trim() || null,
          isDefault: addresses.length === 0,
        });

        setAddresses((current) => [selectedAddress, ...current]);
        setSelectedAddressId(String(selectedAddress.id));
        setShowNewAddress(false);
        setNewAddress(EMPTY_ADDRESS);
      } else {
        selectedAddress = addresses.find(
          (address) => String(address.id) === String(selectedAddressId),
        );
      }

      if (!selectedAddress?.id) {
        setError("Please select a saved address or add a new one.");
        return;
      }

      onNext({
        addressId: selectedAddress.id,
        address: selectedAddress.addressLine1,
        city: selectedAddress.city,
        state: selectedAddress.state,
        pincode: selectedAddress.pincode,
        landmark: selectedAddress.landmark || "",
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to save the address. Please try again.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form onSubmit={handleContinue} noValidate>
      <h2 className="text-2xl">Where should we send the professional?</h2>

      <p className="mt-1 text-sm text-ink-500">
        Choose a saved address or add a new one.
      </p>

      {isLoading ? (
        <p className="mt-6 text-sm text-ink-500">
          Loading your saved addresses...
        </p>
      ) : (
        <div className="mt-6 grid max-w-xl gap-4">
          {!showNewAddress && (
            <>
              {addresses.length > 0 ? (
                <div className="grid gap-3">
                  {addresses.map((address) => (
                    <label
                      key={address.id}
                      className={`flex cursor-pointer gap-3 rounded-card border p-4 ${
                        selectedAddressId === String(address.id)
                          ? "border-fern-600 bg-fern-50"
                          : "border-stone-200 bg-white"
                      }`}
                    >
                      <input
                        type="radio"
                        name="savedAddress"
                        value={address.id}
                        checked={selectedAddressId === String(address.id)}
                        onChange={() =>
                          setSelectedAddressId(String(address.id))
                        }
                        className="mt-1"
                      />

                      <span className="text-sm text-ink-700">
                        <span className="block font-medium">
                          {address.addressLine1}
                        </span>
                        {address.addressLine2 && (
                          <span className="block">{address.addressLine2}</span>
                        )}
                        <span className="block">
                          {address.city}, {address.state} - {address.pincode}
                        </span>
                        {address.landmark && (
                          <span className="block text-ink-500">
                            Landmark: {address.landmark}
                          </span>
                        )}
                        {address.isDefault && (
                          <span className="mt-1 block text-xs text-fern-700">
                            Default address
                          </span>
                        )}
                      </span>
                    </label>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-ink-500">
                  You don't have any saved addresses yet.
                </p>
              )}

              <button
                type="button"
                onClick={() => {
                  setError("");
                  setShowNewAddress(true);
                }}
                className="text-left text-sm font-medium text-fern-700 hover:underline"
              >
                + Add a new address
              </button>
            </>
          )}

          {showNewAddress && (
            <>
              <div>
                <label className="mb-1.5 block text-sm text-ink-600">
                  Address line 1
                </label>
                <textarea
                  name="addressLine1"
                  rows={2}
                  value={newAddress.addressLine1}
                  onChange={updateNewAddress}
                  required
                  className={FIELD_CLASS}
                  placeholder="House number, street, area"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm text-ink-600">
                  Address line 2 (optional)
                </label>
                <input
                  name="addressLine2"
                  value={newAddress.addressLine2}
                  onChange={updateNewAddress}
                  className={FIELD_CLASS}
                  placeholder="Apartment, floor, etc."
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm text-ink-600">
                    City
                  </label>
                  <input
                    name="city"
                    value={newAddress.city}
                    onChange={updateNewAddress}
                    required
                    className={FIELD_CLASS}
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm text-ink-600">
                    State
                  </label>
                  <input
                    name="state"
                    value={newAddress.state}
                    onChange={updateNewAddress}
                    required
                    className={FIELD_CLASS}
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm text-ink-600">
                    PIN code
                  </label>
                  <input
                    name="pincode"
                    inputMode="numeric"
                    maxLength={6}
                    value={newAddress.pincode}
                    onChange={updateNewAddress}
                    required
                    className={FIELD_CLASS}
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm text-ink-600">
                    Landmark (optional)
                  </label>
                  <input
                    name="landmark"
                    value={newAddress.landmark}
                    onChange={updateNewAddress}
                    className={FIELD_CLASS}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setError("");
                  setShowNewAddress(false);
                }}
                className="text-left text-sm text-fern-700 hover:underline"
              >
                Back to saved addresses
              </button>
            </>
          )}
        </div>
      )}

      {error && (
        <p role="alert" className="mt-3 text-sm text-red-600">
          {error}
        </p>
      )}

      <div className="mt-8 flex gap-3">
        <Button type="button" variant="secondary" onClick={onBack}>
          Back
        </Button>

        <Button type="submit" disabled={isLoading || isSaving}>
          {isSaving ? "Saving Address..." : "Continue"}
        </Button>
      </div>
    </form>
  );
}
