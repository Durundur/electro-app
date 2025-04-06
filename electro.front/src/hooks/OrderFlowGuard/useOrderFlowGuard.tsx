import { useSelector } from "@/libs/Store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface useOrderFlowGuardProps {
	requiredStep: "cart" | "checkout" | "confirm" | "success";
}

export const useOrderFlowGuard = ({ requiredStep }: useOrderFlowGuardProps) => {
	const router = useRouter();

	const cartSelector = useSelector((store) => store.CartStore.cart.data);
	const cartValidationErrors = useSelector((store) => store.CartStore.cart.validationErrors);
	const paymentOption = useSelector((store) => store.CartStore.checkout.paymentOption);
	const deliveryOption = useSelector((store) => store.CartStore.checkout.deliveryOption);
	const recipientOption = useSelector((store) => store.CartStore.checkout.recipientOption);
	const createOrderResult = useSelector((store) => store.CartStore.createOrder.result);

	useEffect(() => {
		const hasValidCart = cartSelector && cartSelector.products && cartSelector.products.length > 0;

		const hasCheckoutOptions = !!(paymentOption?.value && deliveryOption?.value && recipientOption?.id);

		const hasNoValidationErrors = cartValidationErrors.length === 0;

		switch (requiredStep) {
			case "cart":
				break;

			case "checkout":
				if (!hasValidCart || !hasNoValidationErrors) {
					router.replace("/cart");
				}
				break;

			case "confirm":
				if (!hasValidCart || !hasNoValidationErrors || !hasCheckoutOptions) {
					router.replace("/cart");
				}
				break;

			case "success":
				if (!createOrderResult?.orderId) {
					router.replace("/cart");
				}
				break;
		}
	}, [cartSelector, cartValidationErrors, paymentOption, deliveryOption, recipientOption, createOrderResult]);
};
