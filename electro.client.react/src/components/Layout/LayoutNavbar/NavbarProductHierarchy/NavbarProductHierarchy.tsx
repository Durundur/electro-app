import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "@/libs/Store";
import { fetchProductHierarchy } from "@/libs/Layout/thunks";
import { Box, Button, Card, ListItemText, MenuItem, MenuList, Popper, Stack } from "@mui/material";
import { ChevronRightRounded } from "@mui/icons-material";
import Link from "next/link";

const NavbarProductHierarchy: FC = () => {
	const dispatch = useDispatch();
	const layoutState = useSelector((state) => state.Layout);
	const productHierarchy = layoutState.data.groups || [];

	const [activeGroupElement, setActiveGroupElement] = useState<HTMLElement | undefined>(undefined);
	const [activeGroupId, setActiveGroupId] = useState<number | undefined>(undefined);
	const [activeCategoryId, setActiveCategoryId] = useState<number | undefined>(undefined);

	const activeGroup = productHierarchy.find((group) => group.id == activeGroupId);
	const activeCategory = activeGroup?.categories?.find((category) => category.id == activeCategoryId);
	const categoriesToShow = activeGroup?.categories!;
	const subCategoriesToShow = activeCategory?.subCategories!;

	useEffect(() => {
		dispatch(fetchProductHierarchy());
	}, [dispatch]);

	return (
		<Box
			onMouseLeave={() => {
				setActiveGroupId(undefined);
				setActiveGroupElement(undefined);
			}}
		>
			<Stack direction="row" sx={{ marginBottom: 0.5 }}>
				{productHierarchy.map((group) => (
					<Button
						key={group.name}
						onMouseEnter={(e) => {
							setActiveGroupElement(e.currentTarget);
							setActiveGroupId(group.id);
							setActiveCategoryId(undefined);
						}}
						variant="text"
						color="inherit"
						sx={{ fontWeight: 400, paddingX: 1.5, paddingY: 1.25, lineHeight: 1, textAlign: 'center' }}
						LinkComponent={Link}
						href={`/search?group=${group.id}`}
					>
						{group.name}
					</Button>
				))}
			</Stack>
			<Popper
				sx={{ zIndex: 1 }}
				open={!!activeGroupElement && !!activeGroupId}
				placement="bottom-start"
				anchorEl={activeGroupElement}
				onMouseLeave={() => {
					setActiveGroupElement(undefined);
					setActiveGroupId(undefined);
					setActiveCategoryId(undefined);
				}}
			>
				<Card elevation={4}>
					<Stack sx={{ width: 600 }} spacing={1} direction={"row"}>
						<MenuList dense sx={{ width: "100%" }}>
							<Stack paddingX={2} paddingY={0.5} direction={"row"} justifyContent={"space-between"} alignItems={"center"} width={"100%"}>
								<ListItemText>{activeGroup?.name}</ListItemText>
								<Button size="small" variant="text" LinkComponent={Link} href={`/search?group=${activeGroup?.id}`}>
									wszyskie
								</Button>
							</Stack>
							{categoriesToShow &&
								categoriesToShow.map((category) => (
									<MenuItem
										key={category.name}
										onMouseEnter={() => setActiveCategoryId(category.id)}
										sx={(theme) => ({
											backgroundColor: category.id === activeCategoryId ? theme.palette.action.hover : "inherit",
										})}
										component={Link}
										href={`/search?group=${activeGroup?.id}&category=${category.id}`}
									>
										<Stack direction={"row"} justifyContent={"space-between"} width={"100%"}>
											{category.name}
											{!!category?.subCategories?.length && <ChevronRightRounded />}
										</Stack>
									</MenuItem>
								))}
						</MenuList>
						<Box sx={{ width: "100%" }}>
							{activeCategoryId && (
								<MenuList dense>
									<Stack paddingX={2} paddingY={0.5} direction={"row"} justifyContent={"space-between"} alignItems={"center"} width={"100%"}>
										<ListItemText>{activeCategory?.name}</ListItemText>
										<Button size="small" variant="text" component={Link} href={`/search?group=${activeGroup?.id}&category=${activeCategory?.id}`}>
											wszyskie
										</Button>
									</Stack>
									{subCategoriesToShow && subCategoriesToShow.length ? (
										subCategoriesToShow.map((subCategory) => (
											<MenuItem key={subCategory.name} component={Link} href={`/search?group=${activeGroup?.id}&category=${activeCategory?.id}&subCategory=${subCategory.id}`}>
												{subCategory.name}
											</MenuItem>
										))
									) : (
										<Box sx={{ marginX: 2, marginY: 0.5 }}>
											<Button
												sx={{ width: "100%" }}
												size="small"
												variant="outlined"
												color="inherit"
												LinkComponent={Link}
												href={`/search?group=${activeGroup?.id}&category=${activeCategory?.id}`}
											>
												Pokaż {activeCategory?.name}
											</Button>
										</Box>
									)}
								</MenuList>
							)}
						</Box>
					</Stack>
				</Card>
			</Popper>
		</Box>
	);
};

export default NavbarProductHierarchy;
