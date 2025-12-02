import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface CartSheetProps {
  cart: any[];
  removeFromCart: (cartId: number) => void;
  getTotalPrice: () => number;
  handleCheckout: () => void;
}

const CartSheet = ({ cart, removeFromCart, getTotalPrice, handleCheckout }: CartSheetProps) => {
  return (
    <SheetContent className="w-full sm:max-w-lg">
      <SheetHeader>
        <SheetTitle>Корзина</SheetTitle>
      </SheetHeader>
      <div className="mt-8 flex flex-col h-[calc(100vh-200px)]">
        {cart.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-center">
            <div>
              <Icon name="ShoppingCart" size={64} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Корзина пуста</p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-auto space-y-4 pr-2">
              {cart.map((item) => {
                const finalPrice = item.discount 
                  ? Math.round(item.price * (1 - item.discount / 100))
                  : item.price;
                return (
                  <Card key={item.cartId}>
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                        <div className="flex-1">
                          <h4 className="font-semibold mb-1">{item.name}</h4>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-primary">{finalPrice} ₽</span>
                            {item.discount && (
                              <Badge variant="destructive" className="text-xs">-{item.discount}%</Badge>
                            )}
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => removeFromCart(item.cartId)}
                          className="h-8 w-8"
                        >
                          <Icon name="Trash2" size={18} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            <div className="border-t pt-4 mt-4 space-y-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Итого:</span>
                <span className="text-primary">{getTotalPrice()} ₽</span>
              </div>
              <Button 
                className="w-full bg-primary hover:bg-primary/90" 
                size="lg"
                onClick={handleCheckout}
              >
                Оформить заказ
              </Button>
            </div>
          </>
        )}
      </div>
    </SheetContent>
  );
};

export default CartSheet;
