import { Badge, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Tooltip } from "@mui/material";
import { FC, useState } from "react";
import { PersonOutlineRounded, Settings, AdminPanelSettings, StickyNote2, Logout, ShoppingCartOutlined } from "@mui/icons-material";
import Link from "next/link";
import { useSelector } from "@/libs/Store";

const ProfileIcons: FC = () => {
	const cartTotalItemsSelector = useSelector((store) => store.CartStore.data?.totalQuantity);
	const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

	const handleOpenProfileMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseProfileMenu = () => {
		setAnchorElNav(null);
	};

	return (
		<div>
			<Tooltip title="Koszyk">
				<IconButton LinkComponent={Link} href="/cart">
					<Badge badgeContent={cartTotalItemsSelector ?? null} color="primary">
						<ShoppingCartOutlined></ShoppingCartOutlined>
					</Badge>
				</IconButton>
			</Tooltip>
			<Tooltip title="Moje konto">
				<IconButton onClick={handleOpenProfileMenu}>
					<PersonOutlineRounded />
				</IconButton>
			</Tooltip>
			<Menu open={Boolean(anchorElNav)} anchorEl={anchorElNav} onClose={handleCloseProfileMenu}>
				<MenuList sx={{ p: 0 }}>
					<Link href="/account/settings">
						<MenuItem>
							<ListItemIcon>
								<Settings></Settings>
							</ListItemIcon>
							<ListItemText>Ustawienia</ListItemText>
						</MenuItem>
					</Link>
					<MenuItem>
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

export default ProfileIcons;
