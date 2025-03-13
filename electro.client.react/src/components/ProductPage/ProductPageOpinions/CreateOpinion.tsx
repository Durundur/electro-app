import { Button, Card, Grid2, Stack, Typography } from "@mui/material";
import { FC, useState } from "react";
import CreateOpinionModal from "./CreateOpinionModal";
import { useSelector } from "@/libs/Store";

interface CreateOpinionProps {
	productId?: string;
}

const CreateOpinion: FC<CreateOpinionProps> = ({ productId }) => {
	const productSelector = useSelector((store) => store.ProductPageStore.product.data);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<Grid2 container spacing={2} justifyContent={"center"}>
				<Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
					<Card>
						<Stack spacing={2} padding={2}>
							<Typography align="center">Masz ten produkt?</Typography>
							<Button fullWidth variant="outlined" onClick={handleOpenModal}>
								Dodaj opinie
							</Button>
						</Stack>
					</Card>
				</Grid2>
			</Grid2>
			<CreateOpinionModal open={isModalOpen} onClose={handleCloseModal} productId={productId ?? ""} productName={productSelector?.name ?? ""} productImage={productSelector?.photos?.[0]} />
		</>
	);
};

export default CreateOpinion;
