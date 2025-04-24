import { FC } from "react";
import { Button, Tooltip } from "@mui/material";
import { useApiType } from "@/contexts/ApiType/ApiTypeContext";

const ApiTypeSwitch: FC = () => {
	const { apiType, toggleApiType } = useApiType();

	return (
		<Tooltip title={`Przełącz na ${apiType === "rest" ? "GraphQL" : "REST"} API`}>
			<Button size="small" variant="outlined" onClick={toggleApiType}>
				{apiType.toUpperCase()}
			</Button>
		</Tooltip>
	);
};

export default ApiTypeSwitch;
