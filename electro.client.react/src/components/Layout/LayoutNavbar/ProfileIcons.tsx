import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Tooltip } from "@mui/material";
import { FC, useState } from "react";
import { PersonOutlineRounded, Settings, AdminPanelSettings, StickyNote2, Logout, ShoppingCartOutlined, SearchOutlined } from "@mui/icons-material";
import Link from "next/link";

const ProfileIcons: FC = () => {
	const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

	const handleOpenProfileMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseProfileMenu = () => {
		setAnchorElNav(null);
	};

	return (
		<div>
			<Tooltip title="My cart">
				<IconButton>
					<ShoppingCartOutlined></ShoppingCartOutlined>
				</IconButton>
			</Tooltip>
			<Tooltip title="My account">
				<IconButton onClick={handleOpenProfileMenu}>
					<PersonOutlineRounded/>
				</IconButton>
			</Tooltip>
			<Menu open={Boolean(anchorElNav)} anchorEl={anchorElNav} onClose={handleCloseProfileMenu}>
				<MenuList sx={{ p: 0 }}>
					<Link href="/account/settings">
						<MenuItem>
							<ListItemIcon>
								<Settings></Settings>
							</ListItemIcon>
							<ListItemText>Settings</ListItemText>
						</MenuItem>
					</Link>
					<MenuItem>
						<ListItemIcon>
							<Logout></Logout>
						</ListItemIcon>
						<ListItemText>Logout</ListItemText>
					</MenuItem>
					<Link href="/admin">
						<MenuItem LinkComponent={Link} href="/admin">
							<ListItemIcon>
								<AdminPanelSettings></AdminPanelSettings>
							</ListItemIcon>
							<ListItemText>Admin panel</ListItemText>
						</MenuItem>
					</Link>
					<Link href="/account/orders">
						<MenuItem LinkComponent={Link} href="/account/orders">
							<ListItemIcon>
								<StickyNote2></StickyNote2>
							</ListItemIcon>
							<ListItemText>Orders</ListItemText>
						</MenuItem>
					</Link>
				</MenuList>
			</Menu>
		</div>
	);
};

export default ProfileIcons;
