import Button from "@/components/Button";
import Heading from "@/components/Heading";
import { formatPrice } from "@/data/formatPrice";
import { useCart } from "@/hooks/useCart";
import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
interface CheckoutFormProps {
  clientSecret: string;
  handleSetPaymentSuccess: (val: boolean) => void;
}

const CheckoutForm: FC<CheckoutFormProps> = ({
  clientSecret,
  handleSetPaymentSuccess,
}) => {
  const { totalAmount, handleClearCart, handleSetPaymentIntent } = useCart();
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const formattedPrice = formatPrice(totalAmount);

  useEffect(() => {
    if (!stripe) {
      return;
    }
    if (!clientSecret) {
      return;
    }

    handleSetPaymentSuccess(false);
  }, [stripe, clientSecret, handleSetPaymentSuccess]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    stripe
      .confirmPayment({
        elements,
        redirect: "if_required",
      })
      .then((result) => {
        if (!result.error) {
          toast.success("Checkout Success");
          handleClearCart();
          handleSetPaymentSuccess(true);
          handleSetPaymentIntent(null);
        }
        setIsLoading(false);
      });
  };
  return (
    <form onSubmit={handleSubmit} id="payment-form">
      <div className="mb-6">
        <Heading title="Enter your details to complete checkout" />
      </div>
      <h2 className="font-semibold  mb-2">Payment Information</h2>
      <AddressElement
        options={{
          mode: "shipping",
          allowedCountries: ["US", "KE"],
        }}
      />
      <h2 className="font-semibold  mt-4 mb-2">Payment Information</h2>
      <PaymentElement id="payment-element" options={{ layout: `tabs` }} />
      <div className="py-4 text-center text-slate-700 text-xl font-bold">
        Total: {formattedPrice}
      </div>

      <Button
        label={isLoading ? "Processing..." : "Pay now"}
        disabled={isLoading || !stripe || !elements}
        onClick={() => {}}
      />
    </form>
  );
};

export default CheckoutForm;
