import React, { FC } from "react";
import { Box, CardContent, CardHeader, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import Image from "next/image";

const AuthAccountBenefits: FC = () => {
	return (
		<Box>
			<CardHeader title="Why is it worth having an account?"></CardHeader>
			<CardContent>
				<List disablePadding>
					<ListItem disableGutters>
						<ListItemIcon>
							<Image src="/fastorder.svg" alt="Fast Order Icon" width={52} height={52} />
						</ListItemIcon>
						<ListItemText sx={{ ml: 1 }} primary="zamawiaj szybciej"></ListItemText>
					</ListItem>
					<ListItem disableGutters>
						<ListItemIcon>
							<Image src="/history.svg" alt="History Icon" width={52} height={52} />
						</ListItemIcon>
						<ListItemText sx={{ ml: 1 }} primary="sprawdzaj poprzednie zamówienia"></ListItemText>
					</ListItem>
					<ListItem disableGutters>
						<ListItemIcon>
							<Image src="/track.svg" alt="Track Order Icon" width={52} height={52} />
						</ListItemIcon>
						<ListItemText sx={{ ml: 1 }} primary="śledź status zamówienia"></ListItemText>
					</ListItem>
					<ListItem disableGutters>
						<ListItemIcon>
							<Image src="/promotions.svg" alt="Promotions Icon" width={52} height={52} />
						</ListItemIcon>
						<ListItemText sx={{ ml: 1 }} primary="korzystaj z rabatów i promocji"></ListItemText>
					</ListItem>
				</List>
			</CardContent>
		</Box>
	);
};

export default AuthAccountBenefits;
