import { FC, useState } from "react";
import { Card, Stack, Typography, Button } from "@mui/material";
import { ShoppingCartOutlined, CheckCircleOutlineRounded, AccessTimeRounded, LocalShippingOutlined } from "@mui/icons-material";
import { GetProductResult } from "@/libs/api-contract/api-contract";
import { formatAmount } from "@/libs/Helpers/Formatters";
import QuantityInput from "@/components/Shared/QuantityInput/QuantityInput";

interface ProductPageActionCardProps {
    product: GetProductResult;
    onAddToCart: (quantity: number) => void;
}

const ProductPageActionCard: FC<ProductPageActionCardProps> = ({ product, onAddToCart }) => {
    const [quantity, setQuantity] = useState(1);

    return (
        <Card sx={{ padding: 2 }}>
            <Stack spacing={1}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <QuantityInput 
                        value={quantity} 
                        id={product.id!} 
                        onChange={(q) => setQuantity(q)}
                    />
                    <Typography variant="h6" textAlign="end">
                        {formatAmount(product.amount!, product.currency!)}
                    </Typography>
                </Stack>
                <Button 
                    onClick={() => onAddToCart(quantity)} 
                    variant="contained" 
                    color="success" 
                    startIcon={<ShoppingCartOutlined />}
                >
                    Dodaj do koszyka
                </Button>
                <Stack direction="row" sx={{ padding: 1 }} spacing={2} alignItems="center">
                    <CheckCircleOutlineRounded />
                    <div>
                        <Typography variant="body2">Dostępny</Typography>
                        <Typography variant="caption">Dowiedz się więcej</Typography>
                    </div>
                </Stack>
                <Stack direction="row" sx={{ padding: 1 }} spacing={2} alignItems="center">
                    <AccessTimeRounded />
                    <div>
                        <Typography variant="body2">Kup teraz, a otrzymasz jutro</Typography>
                        <Typography variant="caption">Dowiedz się więcej</Typography>
                    </div>
                </Stack>
                <Stack direction="row" sx={{ padding: 1 }} spacing={2} alignItems="center">
                    <LocalShippingOutlined />
                    <div>
                        <Typography variant="body2">Darmowa dostawa</Typography>
                        <Typography variant="caption">Sprawdz szczegóły</Typography>
                    </div>
                </Stack>
            </Stack>
        </Card>
    );
};

export default ProductPageActionCard;