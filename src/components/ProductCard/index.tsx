import { Add } from "@mui/icons-material";
import { Paper, Rating, Typography } from "@mui/material";
import { Button } from "components";
import { Link, useNavigate } from "react-router-dom";
import { formatCurrency } from "utils";

export const ProductCard = ({
  item,
  onClick,
}: {
  item: Product;
  onClick?: () => void;
}) => {
  const navigate = useNavigate();

  return (
    <Paper className="flex flex-col space-x-1 space-y-4 rounded-lg p-4 shadow-md hover:scale-105">
      <div className="flex h-72 w-64 items-center justify-center self-center p-6">
        <img
          className="max-h-64 w-auto cursor-pointer rounded-md"
          src={item.image}
          alt={item.title.toString()}
          onClick={() => navigate(`/product/${item.id}`)}
        />
      </div>
      <Link to={`/product/${item.id}`}>
        <Typography className="h-12 cursor-pointer overflow-hidden font-bold hover:underline">
          {item.title}
        </Typography>
      </Link>
      <div className="flex items-center space-x-1">
        <Rating
          precision={0.1}
          value={item.rating.rate}
          readOnly
          size="small"
        />
        <Typography className="text-xs">
          {item.rating.count} avaliações
        </Typography>
      </div>
      <div className="space-y-1">
        <Typography className="font-bold">
          R$ {formatCurrency(item.price)}
        </Typography>
        <Typography className="text-xs">
          Em até 10x sem juros no cartão de crédito
        </Typography>
      </div>
      <Button
        name="Adicionar ao carrinho"
        endIcon={<Add />}
        variant="outlined"
        onClick={onClick}
      />
    </Paper>
  );
};
