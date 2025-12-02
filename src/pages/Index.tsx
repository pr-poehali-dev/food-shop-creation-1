import { useState } from 'react';
import Icon from '@/components/ui/icon';
import Header from '@/components/Header';
import CartSheet from '@/components/CartSheet';
import CheckoutDialog from '@/components/CheckoutDialog';
import HomeSection from '@/components/HomeSection';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [showOnlyDiscounts, setShowOnlyDiscounts] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderData, setOrderData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    deliveryDate: '',
    deliveryTime: '',
    paymentMethod: 'card',
    comment: ''
  });

  const categories = [
    { id: 'fruits', name: 'Фрукты', icon: 'Apple', color: 'bg-destructive' },
    { id: 'vegetables', name: 'Овощи', icon: 'Carrot', color: 'bg-secondary' },
    { id: 'dairy', name: 'Молочные', icon: 'Milk', color: 'bg-accent' },
    { id: 'meat', name: 'Мясо', icon: 'Beef', color: 'bg-primary' },
    { id: 'bakery', name: 'Хлеб', icon: 'Croissant', color: 'bg-secondary' },
    { id: 'drinks', name: 'Напитки', icon: 'Coffee', color: 'bg-accent' }
  ];

  const products = [
    { id: 1, name: 'Яблоки Гренни Смит', price: 159, category: 'fruits', discount: 15, image: 'https://cdn.poehali.dev/projects/fea5de4e-f362-4bf0-98c1-5dde0cba1a6b/files/0e0a30ab-68d3-4b0d-aac4-463d7f4ebbf6.jpg' },
    { id: 2, name: 'Молоко 3.2%', price: 89, category: 'dairy', image: 'https://cdn.poehali.dev/projects/fea5de4e-f362-4bf0-98c1-5dde0cba1a6b/files/109d168c-673b-4d8e-a43d-1dd89447904b.jpg' },
    { id: 3, name: 'Помидоры черри', price: 249, category: 'vegetables', discount: 20, image: 'https://cdn.poehali.dev/projects/fea5de4e-f362-4bf0-98c1-5dde0cba1a6b/files/0e0a30ab-68d3-4b0d-aac4-463d7f4ebbf6.jpg' },
    { id: 4, name: 'Апельсины', price: 179, category: 'fruits', image: 'https://cdn.poehali.dev/projects/fea5de4e-f362-4bf0-98c1-5dde0cba1a6b/files/0e0a30ab-68d3-4b0d-aac4-463d7f4ebbf6.jpg' },
    { id: 5, name: 'Хлеб бородинский', price: 65, category: 'bakery', image: 'https://cdn.poehali.dev/projects/fea5de4e-f362-4bf0-98c1-5dde0cba1a6b/files/109d168c-673b-4d8e-a43d-1dd89447904b.jpg' },
    { id: 6, name: 'Сок апельсиновый', price: 149, category: 'drinks', discount: 10, image: 'https://cdn.poehali.dev/projects/fea5de4e-f362-4bf0-98c1-5dde0cba1a6b/files/109d168c-673b-4d8e-a43d-1dd89447904b.jpg' }
  ];

  const subscriptionPlans = [
    { id: 1, name: 'Завтрак на неделю', price: 1499, items: ['Молоко', 'Хлеб', 'Яйца', 'Масло', 'Сыр'] },
    { id: 2, name: 'Фруктовая корзина', price: 999, items: ['Яблоки', 'Апельсины', 'Бананы', 'Виноград'] },
    { id: 3, name: 'Здоровое питание', price: 2499, items: ['Овощи', 'Фрукты', 'Молочка', 'Злаки', 'Зелень'] }
  ];

  const addToCart = (product: any) => {
    setCart([...cart, { ...product, cartId: Date.now() }]);
  };

  const removeFromCart = (cartId: number) => {
    setCart(cart.filter(item => item.cartId !== cartId));
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => {
      const price = item.discount 
        ? Math.round(item.price * (1 - item.discount / 100))
        : item.price;
      return sum + price;
    }, 0);
  };

  const getFilteredProducts = () => {
    return products.filter(product => {
      const finalPrice = product.discount 
        ? Math.round(product.price * (1 - product.discount / 100))
        : product.price;
      
      const priceMatch = finalPrice >= priceRange[0] && finalPrice <= priceRange[1];
      const discountMatch = !showOnlyDiscounts || product.discount;
      
      return priceMatch && discountMatch;
    });
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Order submitted:', orderData, 'Cart:', cart);
    alert(`Заказ оформлен! Сумма: ${getTotalPrice()} ₽\nДоставка: ${orderData.deliveryDate} в ${orderData.deliveryTime}`);
    setIsCheckoutOpen(false);
    setCart([]);
    setOrderData({
      name: '',
      phone: '',
      email: '',
      address: '',
      deliveryDate: '',
      deliveryTime: '',
      paymentMethod: 'card',
      comment: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Header
        cart={cart}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        cartSheetContent={
          <CartSheet
            cart={cart}
            removeFromCart={removeFromCart}
            getTotalPrice={getTotalPrice}
            handleCheckout={handleCheckout}
          />
        }
      />

      <HomeSection
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        categories={categories}
        products={products}
        subscriptionPlans={subscriptionPlans}
        addToCart={addToCart}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        showOnlyDiscounts={showOnlyDiscounts}
        setShowOnlyDiscounts={setShowOnlyDiscounts}
        getFilteredProducts={getFilteredProducts}
      />

      <CheckoutDialog
        isCheckoutOpen={isCheckoutOpen}
        setIsCheckoutOpen={setIsCheckoutOpen}
        cart={cart}
        orderData={orderData}
        setOrderData={setOrderData}
        getTotalPrice={getTotalPrice}
        handleOrderSubmit={handleOrderSubmit}
      />

      <footer className="bg-muted mt-20 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="ShoppingBasket" size={28} className="text-primary" />
                <span className="text-xl font-bold">FreshMarket</span>
              </div>
              <p className="text-muted-foreground">Свежие продукты с доставкой на дом</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Каталог</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Фрукты</li>
                <li>Овощи</li>
                <li>Молочные продукты</li>
                <li>Напитки</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Информация</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>О компании</li>
                <li>Доставка и оплата</li>
                <li>Акции</li>
                <li>Подписки</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Контакты</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>+7 (495) 123-45-67</li>
                <li>info@freshmarket.ru</li>
                <li>Москва, ул. Примерная, 123</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>© 2024 FreshMarket. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
