import { OrderStatus } from "@/libs/api-contract/api-contract";
import { Step, StepLabel, Stepper } from "@mui/material";
import { FC } from "react";

interface AccountOrderDetailsProgressProps {
	status: OrderStatus;
}

const AccountOrderDetailsProgress: FC<AccountOrderDetailsProgressProps> = ({ status }) => {
	const steps = [
		{ status: OrderStatus.Created, label: "Utworzono" },
		{ status: OrderStatus.Processing, label: "Przetwarzanie" },
		{ status: OrderStatus.Paid, label: "Opłacono" },
		{ status: OrderStatus.Shipped, label: "Wysłano" },
		{ status: OrderStatus.Completed, label: "Zakończone" },
		{ status: OrderStatus.Cancelled, label: "Anulowane" },
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
