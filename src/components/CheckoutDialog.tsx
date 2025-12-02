import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface CheckoutDialogProps {
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  cart: any[];
  orderData: any;
  setOrderData: (data: any) => void;
  getTotalPrice: () => number;
  handleOrderSubmit: (e: React.FormEvent) => void;
}

const CheckoutDialog = ({
  isCheckoutOpen,
  setIsCheckoutOpen,
  cart,
  orderData,
  setOrderData,
  getTotalPrice,
  handleOrderSubmit
}: CheckoutDialogProps) => {
  return (
    <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Оформление заказа</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleOrderSubmit} className="space-y-6">
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Ваш заказ:</h3>
            <div className="space-y-2">
              {cart.map((item) => {
                const finalPrice = item.discount 
                  ? Math.round(item.price * (1 - item.discount / 100))
                  : item.price;
                return (
                  <div key={item.cartId} className="flex justify-between text-sm">
                    <span>{item.name}</span>
                    <span className="font-semibold">{finalPrice} ₽</span>
                  </div>
                );
              })}
              <div className="border-t pt-2 mt-2 flex justify-between font-bold text-lg">
                <span>Итого:</span>
                <span className="text-primary">{getTotalPrice()} ₽</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Имя *</Label>
              <Input 
                id="name" 
                required 
                value={orderData.name}
                onChange={(e) => setOrderData({...orderData, name: e.target.value})}
                placeholder="Иван Петров"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Телефон *</Label>
              <Input 
                id="phone" 
                type="tel" 
                required
                value={orderData.phone}
                onChange={(e) => setOrderData({...orderData, phone: e.target.value})}
                placeholder="+7 (999) 123-45-67"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email"
              value={orderData.email}
              onChange={(e) => setOrderData({...orderData, email: e.target.value})}
              placeholder="example@mail.ru"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Адрес доставки *</Label>
            <Input 
              id="address" 
              required
              value={orderData.address}
              onChange={(e) => setOrderData({...orderData, address: e.target.value})}
              placeholder="г. Москва, ул. Примерная, д. 10, кв. 5"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="deliveryDate">Дата доставки *</Label>
              <Input 
                id="deliveryDate" 
                type="date" 
                required
                value={orderData.deliveryDate}
                onChange={(e) => setOrderData({...orderData, deliveryDate: e.target.value})}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="deliveryTime">Время доставки *</Label>
              <Select 
                required
                value={orderData.deliveryTime}
                onValueChange={(value) => setOrderData({...orderData, deliveryTime: value})}
              >
                <SelectTrigger id="deliveryTime">
                  <SelectValue placeholder="Выберите время" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="09:00-12:00">09:00 - 12:00</SelectItem>
                  <SelectItem value="12:00-15:00">12:00 - 15:00</SelectItem>
                  <SelectItem value="15:00-18:00">15:00 - 18:00</SelectItem>
                  <SelectItem value="18:00-21:00">18:00 - 21:00</SelectItem>
                  <SelectItem value="21:00-23:00">21:00 - 23:00</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            <Label>Способ оплаты *</Label>
            <RadioGroup 
              value={orderData.paymentMethod} 
              onValueChange={(value) => setOrderData({...orderData, paymentMethod: value})}
            >
              <div className="flex items-center space-x-2 border p-3 rounded-lg hover:bg-muted/50 cursor-pointer">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="flex-1 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Icon name="CreditCard" size={20} className="text-primary" />
                    <span>Картой онлайн</span>
                  </div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 border p-3 rounded-lg hover:bg-muted/50 cursor-pointer">
                <RadioGroupItem value="cash" id="cash" />
                <Label htmlFor="cash" className="flex-1 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Icon name="Banknote" size={20} className="text-primary" />
                    <span>Наличными курьеру</span>
                  </div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 border p-3 rounded-lg hover:bg-muted/50 cursor-pointer">
                <RadioGroupItem value="card-courier" id="card-courier" />
                <Label htmlFor="card-courier" className="flex-1 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Icon name="Smartphone" size={20} className="text-primary" />
                    <span>Картой курьеру</span>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment">Комментарий к заказу</Label>
            <textarea 
              id="comment"
              value={orderData.comment}
              onChange={(e) => setOrderData({...orderData, comment: e.target.value})}
              className="w-full min-h-[80px] px-3 py-2 border rounded-md"
              placeholder="Укажите дополнительные пожелания"
            ></textarea>
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              className="flex-1"
              onClick={() => setIsCheckoutOpen(false)}
            >
              Отмена
            </Button>
            <Button 
              type="submit" 
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              Подтвердить заказ на {getTotalPrice()} ₽
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutDialog;
