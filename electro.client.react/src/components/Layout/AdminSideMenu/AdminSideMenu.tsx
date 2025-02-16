import React, { FC, useState } from "react";
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Collapse, IconButton, Drawer, Stack, Typography } from "@mui/material";
import { AccountTreeOutlined, ChevronLeft, ChevronRight, ExpandLess, ExpandMore, PlaylistAddOutlined, ShoppingCart } from "@mui/icons-material";
import { usePathname, useRouter } from "next/navigation";
import Logo from "../LayoutNavbar/Logo";

interface IMenuItem {
	text: string;
	path: string;
	icon: JSX.Element;
	subItems?: IMenuItem[];
}

const MenuItem: FC<{
	item: IMenuItem;
	isCollapsed: boolean;
	level?: number;
	isOpen?: boolean;
	onToggle?: () => void;
}> = ({ item, isCollapsed, level = 0, isOpen, onToggle }) => {
	const pathname = usePathname();
	const router = useRouter();
	const [subMenuOpen, setSubMenuOpen] = useState(false);
	const hasSubItems = item.subItems && item.subItems.length > 0;
	const isActive = pathname === item.path || (hasSubItems && item.subItems?.some((subItem) => pathname === subItem.path));

	const handleClick = () => {
		if (hasSubItems) {
			setSubMenuOpen(!subMenuOpen);
		} else {
			router.push(item.path);
		}
	};

	return (
		<>
			<ListItem
				disablePadding
				sx={(theme) => ({
					display: "block",
					backgroundColor: isActive ? theme.palette.action.active2 : "transparent",
				})}
			>
				<ListItemButton
					onClick={handleClick}
					sx={{
						justifyContent: isCollapsed ? "center" : "initial",
						pl: level * 2 + 2,
						"&:hover": {
							backgroundColor: "action.hover",
						},
					}}
				>
					<ListItemIcon sx={{ minWidth: isCollapsed ? "initial" : "unset", marginRight: isCollapsed ? 0 : 2 }}>{item.icon}</ListItemIcon>
					{!isCollapsed && (
						<ListItemText disableTypography sx={{ margin: 0 }}>
							<Typography sx={{ overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: "1", WebkitBoxOrient: "vertical" }}>{item.text}</Typography>
						</ListItemText>
					)}
					{!isCollapsed && hasSubItems && (
						<Box alignSelf={"end"} marginLeft={2}>
							{subMenuOpen ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
						</Box>
					)}
				</ListItemButton>
			</ListItem>
			{hasSubItems && !isCollapsed && (
				<Collapse in={subMenuOpen} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						{item.subItems?.map((subItem, index) => <MenuItem key={index} item={subItem} isCollapsed={isCollapsed} level={level + 1} />)}
					</List>
				</Collapse>
			)}
		</>
	);
};

const AdminSideMenu: FC = () => {
	const [isCollapsed, setIsCollapsed] = useState(false);

	const menuItems: IMenuItem[] = [
		{
			text: "Zamówienia",
			icon: <ShoppingCart />,
			path: "/admin/orders",
		},
		{
			text: "Katalog produktów",
			icon: <PlaylistAddOutlined />,
			path: "/admin/product-catalog",
			subItems: [
				{
					text: "Lista",
					icon: <PlaylistAddOutlined />,
					path: "/admin/product-catalog/list",
				},
				{
					text: "Nowy",
					icon: <PlaylistAddOutlined />,
					path: "/admin/product-catalog/new",
				},
			],
		},
		{
			text: "Hierarchia",
			icon: <AccountTreeOutlined />,
			path: "/admin/product-hierarchy",
		},
	];

	return (
		<Drawer
			anchor="left"
			variant="permanent"
			sx={{
				"& .MuiPaper-root": {
					height: "100vh",
					position: "unset",
				},
			}}
		>
			<Box
				sx={{
					display: "flex",
					justifyContent: isCollapsed ? "center" : "space-between",
					alignItems: "center",
					p: 1,
				}}
			>
				{!isCollapsed && <Logo href="/" />}
				<IconButton onClick={() => setIsCollapsed(!isCollapsed)}>{isCollapsed ? <ChevronRight /> : <ChevronLeft />}</IconButton>
			</Box>
			<List>
				{menuItems.map((item, index) => (
					<MenuItem key={index} item={item} isCollapsed={isCollapsed} />
				))}
			</List>
		</Drawer>
	);
};

export default AdminSideMenu;
