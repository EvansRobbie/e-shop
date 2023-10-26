import { formatPrice } from "@/data/formatPrice";
import { useCart } from "@/hooks/useCart";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import React, { FC, useEffect, useState } from "react";
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
  return <div>CheckoutForm</div>;
};

export default CheckoutForm;
