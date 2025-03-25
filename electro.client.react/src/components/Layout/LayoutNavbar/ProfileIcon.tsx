import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Tooltip } from "@mui/material";
import { FC, useState } from "react";
import { PersonOutlineRounded, Settings, AdminPanelSettings, StickyNote2, Logout } from "@mui/icons-material";
import Link from "next/link";
import { useDispatch } from "@/libs/Store";
import { logoutUser } from "@/libs/Auth/thunks";

const ProfileIcon: FC = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const dispatch = useDispatch();

	const handleOpenProfileMenu = (event: React.MouseEvent<HTMLElement>) => {
		event.stopPropagation();
		setAnchorEl(event.currentTarget);
	};

	const handleCloseProfileMenu = (event: React.MouseEvent<HTMLElement>) => {
		event.stopPropagation();
		setAnchorEl(null);
	};

	const handleLogout = () => {
		dispatch(logoutUser());
		setAnchorEl(null);
	};

	return (
		<div>
			<Tooltip title="Moje konto">
				<IconButton onClick={handleOpenProfileMenu}>
					<PersonOutlineRounded />
				</IconButton>
			</Tooltip>
			<Menu
				sx={{
					"&.MuiPopover-root": {
						position: "absolute",
					},
				}}
				anchorEl={anchorEl}
				transformOrigin={{ horizontal: "right", vertical: "top" }}
				anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
				open={open}
				onClose={handleCloseProfileMenu}
			>
				<MenuList sx={{ p: 0 }}>
					<Link href="/account/settings">
						<MenuItem>
							<ListItemIcon>
								<Settings></Settings>
							</ListItemIcon>
							<ListItemText>Ustawienia</ListItemText>
						</MenuItem>
					</Link>
					<MenuItem onClick={handleLogout}>
						<ListItemIcon>
							<Logout></Logout>
						</ListItemIcon>
						<ListItemText>Wyloguj</ListItemText>
					</MenuItem>
					<Link href="/admin">
						<MenuItem LinkComponent={Link} href="/admin">
							<ListItemIcon>
								<AdminPanelSettings></AdminPanelSettings>
							</ListItemIcon>
							<ListItemText>Panel administratora</ListItemText>
						</MenuItem>
					</Link>
					<Link href="/account/orders">
						<MenuItem LinkComponent={Link} href="/account/orders">
							<ListItemIcon>
								<StickyNote2></StickyNote2>
							</ListItemIcon>
							<ListItemText>Zamówienia</ListItemText>
						</MenuItem>
					</Link>
				</MenuList>
			</Menu>
		</div>
	);
};

export default ProfileIcon;
