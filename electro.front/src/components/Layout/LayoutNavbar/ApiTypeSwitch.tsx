import { FC } from "react";
import { Button, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "@/libs/Store";
import { toggleApiType } from "@/libs/ApiClient/slice";

const ApiTypeSwitch: FC = () => {
	const dispatch = useDispatch();
	const apiType = useSelector((store) => store.ApiClientStore.apiType);

	return (
		<Tooltip title={`Przełącz na ${apiType === "rest" ? "GraphQL" : "REST"} API`}>
			<Button size="small" variant="outlined" onClick={() => dispatch(toggleApiType())}>
				{apiType.toUpperCase()}
			</Button>
		</Tooltip>
	);
};

export default ApiTypeSwitch;
