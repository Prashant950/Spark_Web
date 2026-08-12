import { useEffect, useMemo, useState } from "react";
import { Check, Loader } from "lucide-react";
import { useCreateOrderMutation, useVerifyPaymentMutation } from "../../features/api/apiSlice";

const serviceCatalog = [
  { id: 1, title: "Movie Partner", price: 1 },
  { id: 2, title: "In-Person Meeting", price: 1 },
  { id: 3, title: "Elder Care", price: 1000 },
  { id: 4, title: "House Keeping", price: 1500 },
  { id: 5, title: "Clubbing", price: 4500 },
  { id: 6, title: "Shopping Buddy", price: 2000 },
  { id: 7, title: "City Tour Partner", price: 2000 },
  { id: 8, title: "Gaming Partner (Physical)", price: 1800 },
  { id: 9, title: "Concert Partner", price: 2000 },
  { id: 10, title: "Coffee Partner", price: 1500 },
  { id: 11, title: "Cafe & Food Partner", price: 2000 },
  { id: 12, title: "Professional Networking Partner", price: 1500 },
];

const formatCurrency = (value) => `₹${Math.round(value).toLocaleString("en-IN")}`;

const BuyServicesModal = ({ isOpen, onClose, onPaymentSuccess }) => {
  const [selectedIds, setSelectedIds] = useState([]);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [error, setError] = useState(null);
  const [createOrder] = useCreateOrderMutation();
  const [verifyPayment] = useVerifyPaymentMutation();

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const selectedServices = useMemo(
    () => serviceCatalog.filter((service) => selectedIds.includes(service.id)),
    [selectedIds]
  );

  const subtotal = selectedServices.reduce((sum, item) => sum + item.price, 0);
  const gst = subtotal * 0.18;
  const total = subtotal + gst;

  const toggleService = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handlePayment = async () => {
    if (selectedServices.length === 0) {
      setError("Please select at least one service");
      return;
    }

    try {
      setPaymentLoading(true);
      setError(null);

      // Transform services to match backend schema (id → serviceId)
      const transformedServices = selectedServices.map((service) => ({
        serviceId: service.id,
        title: service.title,
        price: service.price,
      }));

      // Step 1: Create order on backend
      const orderResponse = await createOrder({
        services: transformedServices,
        subtotal: subtotal,
        gst: gst,
        total: total
      }).unwrap();

      if (!orderResponse.success) {
        throw new Error(orderResponse.message || "Failed to create order");
      }

      // Step 2: Initialize Razorpay checkout
      const options = {
        key: orderResponse.keyId,
        amount: orderResponse.amount,
        currency: orderResponse.currency,
        order_id: orderResponse.orderId,
        handler: async (response) => {
          try {
            // Step 3: Verify payment on backend
            const verifyResponse = await verifyPayment({
              orderId: orderResponse.orderId,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature
            }).unwrap();

            if (verifyResponse.success) {
              setError(null);
              alert("✅ Payment Successful! Confirmation email has been sent.");
              setSelectedIds([]);
              onClose();
              // Trigger callback to refresh services on parent page
              if (onPaymentSuccess) {
                onPaymentSuccess();
              }
              // Optional: Redirect to dashboard
              // window.location.href = '/dashboard';
            }
          } catch (verifyError) {
            setError("Payment verification failed: " + verifyError.message);
            alert("❌ Payment verification failed");
          }
        },
        modal: {
          ondismiss: () => {
            setPaymentLoading(false);
          }
        },
        theme: {
          color: "#667eea"
        }
      };

      // Open Razorpay checkout
      const razorpay = new window.Razorpay(options);
      razorpay.open();
      
    } catch (err) {
      const errorMessage = err.data?.message || err.message || "Payment failed";
      setError(errorMessage);
      alert("❌ Error: " + errorMessage);
    } finally {
      setPaymentLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-900/50 p-3 backdrop-blur-sm sm:p-6">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-2xl">
        <div className="max-h-[85vh] overflow-y-auto bg-white p-5 sm:p-6">
          
          {/* Top Header - Image Design Matched */}
          <div className="mb-6 text-left">
            <h3 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              Buy Services
            </h3>
            <p className="mt-1 text-sm text-slate-500 font-normal sm:text-base">
              Select services you want to book
            </p>
          </div>

          {/* Service Items Catalog */}
          <div className="space-y-3.5">
            {serviceCatalog.map((service) => {
              const isSelected = selectedIds.includes(service.id);

              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => toggleService(service.id)}
                  className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3.5 text-left transition-all duration-200 ${
                    isSelected
                      ? "border-2 border-purple-600 bg-purple-50/50 shadow-sm"
                      : "border-slate-200 bg-white hover:border-purple-300 hover:bg-slate-50/50"
                  }`}
                >
                  <div className="min-w-0">
                    <div className="text-base font-semibold tracking-tight text-slate-900 sm:text-lg">
                      {service.title}
                    </div>
                    <div className="mt-0.5 text-sm font-bold text-purple-600 sm:text-base">
                      {formatCurrency(service.price)}
                      <span className="font-medium text-purple-500">/session</span>
                    </div>
                  </div>

                  {isSelected && (
                    <span className="ml-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-600 text-white shadow-md shadow-purple-200">
                      <Check size={18} strokeWidth={2.5} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 rounded-lg bg-red-50 border border-red-200 p-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Sticky Bottom Pricing & Actions */}
          <div className="sticky bottom-0 mt-6 rounded-2xl border border-slate-200 bg-white/95 p-4 backdrop-blur-md shadow-lg">
            <div className="flex items-center justify-between text-sm font-medium text-slate-700 sm:text-base">
              <span>{selectedServices.length} services selected</span>
              <span className="text-base font-bold text-purple-600 sm:text-lg">
                {formatCurrency(total)}{" "}
                <span className="text-xs font-normal text-slate-500">(incl. GST)</span>
              </span>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={paymentLoading}
                className="rounded-xl border border-slate-200 bg-white py-2.5 text-base font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handlePayment}
                disabled={paymentLoading || selectedServices.length === 0}
                className="rounded-xl bg-purple-600 py-2.5 text-base font-medium text-white shadow-lg shadow-purple-200 transition hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {paymentLoading && <Loader size={16} className="animate-spin" />}
                {paymentLoading ? "Processing..." : `Pay ${formatCurrency(total)}`}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BuyServicesModal;