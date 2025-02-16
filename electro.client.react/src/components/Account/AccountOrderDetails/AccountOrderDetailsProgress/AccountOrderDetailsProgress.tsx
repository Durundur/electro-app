import { OrderStatus } from "@/libs/api-contract/api-contract";
import { Step, StepLabel, Stepper } from "@mui/material";
import { FC } from "react";

interface AccountOrderDetailsProgressProps {
	status: OrderStatus;
}

const AccountOrderDetailsProgress: FC<AccountOrderDetailsProgressProps> = ({ status }) => {
	const steps = [
		{ status: OrderStatus.Created, label: "Utworzono" },
		{ status: OrderStatus.PaymentPending, label: "Oczekiwanie na płatność" },
		{ status: OrderStatus.Paid, label: "Opłacono" },
		{ status: OrderStatus.Shipped, label: "Wysłano" },
		{ status: OrderStatus.Delivered, label: "Dostarczono" },
	];

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
