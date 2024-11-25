import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";

export const Steps = () => {
   const dispatch = useDispatch<AppDispatch>();
  const { currentLocale, translations } = useSelector(
    (state: RootState) => state.locale
  );

  const steps = [
    { id: 1, label: translations.checkout.login, href: "/checkout/login" },
    { id: 2, label: translations.checkout.address, href: "/checkout/address" },
    { id: 3, label: translations.checkout.payment, href: "/checkout/payment" },
  ];

  return steps;
};
