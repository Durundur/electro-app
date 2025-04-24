import { translateOrderStatus } from "@/libs/Helpers/Translations/OrdersTranslations";
import { OrderStatus } from "@/libs/api-contract/rest-api-contract";
import { Step, StepLabel, Stepper } from "@mui/material";
import { FC } from "react";

interface AccountOrderDetailsProgressProps {
	status: OrderStatus;
}

const AccountOrderDetailsProgress: FC<AccountOrderDetailsProgressProps> = ({ status }) => {
	const steps = Object.values(OrderStatus).map((status) => ({ status, label: translateOrderStatus(status) }));
	const activeStep = steps.findIndex((step) => step.status === status);

	return (
		<Stepper activeStep={activeStep} alternativeLabel>
			{steps.map((step) => (
				<Step key={step.status}>
					<StepLabel>{step.label}</StepLabel>
				</Step>
			))}
		</Stepper>
	);
};

export default AccountOrderDetailsProgress;
