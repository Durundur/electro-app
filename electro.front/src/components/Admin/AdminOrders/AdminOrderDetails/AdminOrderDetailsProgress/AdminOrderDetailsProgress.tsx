import { translateOrderStatus } from "@/libs/Helpers/Translations/OrdersTranslations";
import { OrderStatus } from "@/libs/api-contract/api-contract";
import { Step, StepLabel, Stepper } from "@mui/material";
import { FC } from "react";

interface AdminOrderDetailsProgressProps {
	currentStatus: OrderStatus;
}

const AdminOrderDetailsProgress: FC<AdminOrderDetailsProgressProps> = ({ currentStatus }) => {
	const steps = Object.values(OrderStatus).map((status) => ({ status, label: translateOrderStatus(status) }));
	const activeStep = steps.findIndex((step) => step.status === currentStatus);

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

export default AdminOrderDetailsProgress;
