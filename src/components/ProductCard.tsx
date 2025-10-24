import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

interface ProductCardProps {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  stock: number;
}

export const ProductCard = ({ id, name, description, price, image_url, stock }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (stock <= 0) {
      toast.error('Product is out of stock');
      return;
    }
    addToCart({ id, name, price, image_url: image_url || '/placeholder.svg' });
    toast.success(`${name} added to cart`);
  };

  return (
    <Card className="group overflow-hidden hover:shadow-elegant transition-all duration-300">
      <Link to={`/products/${id}`}>
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={image_url || '/placeholder.svg'}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      </Link>
      <CardContent className="p-4">
        <Link to={`/products/${id}`}>
          <h3 className="font-semibold text-lg mb-1 hover:text-primary transition-colors">{name}</h3>
        </Link>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-2">{description}</p>
        <p className="text-2xl font-bold text-primary">${price.toFixed(2)}</p>
        {stock <= 0 && <p className="text-destructive text-sm mt-1">Out of stock</p>}
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleAddToCart}
          className="w-full"
          disabled={stock <= 0}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};