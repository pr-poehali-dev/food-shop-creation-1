import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

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
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="ShoppingBasket" size={32} className="text-primary" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                FreshMarket
              </h1>
            </div>
            
            <nav className="hidden md:flex gap-6">
              <button onClick={() => setActiveSection('home')} className="hover:text-primary transition-colors">Главная</button>
              <button onClick={() => setActiveSection('catalog')} className="hover:text-primary transition-colors">Каталог</button>
              <button onClick={() => setActiveSection('deals')} className="hover:text-primary transition-colors">Акции</button>
              <button onClick={() => setActiveSection('delivery')} className="hover:text-primary transition-colors">Доставка</button>
              <button onClick={() => setActiveSection('contacts')} className="hover:text-primary transition-colors">Контакты</button>
            </nav>

            <div className="flex items-center gap-3">
              <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Icon name="ShoppingCart" size={22} />
                    {cart.length > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-primary">
                        {cart.length}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
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
              </Sheet>
              <Button variant="ghost" size="icon">
                <Icon name="User" size={22} />
              </Button>
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Icon name="Menu" size={22} />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Меню</SheetTitle>
                  </SheetHeader>
                  <nav className="flex flex-col gap-4 mt-8">
                    <button 
                      onClick={() => { setActiveSection('home'); setIsMobileMenuOpen(false); }} 
                      className="text-left py-3 px-4 hover:bg-muted rounded-lg transition-colors"
                    >
                      Главная
                    </button>
                    <button 
                      onClick={() => { setActiveSection('catalog'); setIsMobileMenuOpen(false); }} 
                      className="text-left py-3 px-4 hover:bg-muted rounded-lg transition-colors"
                    >
                      Каталог
                    </button>
                    <button 
                      onClick={() => { setActiveSection('deals'); setIsMobileMenuOpen(false); }} 
                      className="text-left py-3 px-4 hover:bg-muted rounded-lg transition-colors"
                    >
                      Акции
                    </button>
                    <button 
                      onClick={() => { setActiveSection('delivery'); setIsMobileMenuOpen(false); }} 
                      className="text-left py-3 px-4 hover:bg-muted rounded-lg transition-colors"
                    >
                      Доставка
                    </button>
                    <button 
                      onClick={() => { setActiveSection('contacts'); setIsMobileMenuOpen(false); }} 
                      className="text-left py-3 px-4 hover:bg-muted rounded-lg transition-colors"
                    >
                      Контакты
                    </button>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {activeSection === 'home' && (
        <main className="animate-fade-in">
          <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 py-20">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6 animate-fade-in">
                  <Badge className="bg-primary text-primary-foreground">Свежие продукты каждый день</Badge>
                  <h2 className="text-5xl md:text-6xl font-bold leading-tight">
                    Доставка свежих продуктов к вашему столу
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    Качественные продукты питания и напитки с доставкой на дом. Подпишитесь на регулярные поставки и экономьте до 20%
                  </p>
                  <div className="flex gap-3">
                    <Button size="lg" className="bg-primary hover:bg-primary/90" onClick={() => setActiveSection('catalog')}>
                      <Icon name="ShoppingBag" size={20} className="mr-2" />
                      Перейти в каталог
                    </Button>
                    <Button size="lg" variant="outline" onClick={() => setActiveSection('deals')}>
                      <Icon name="Sparkles" size={20} className="mr-2" />
                      Акции
                    </Button>
                  </div>
                </div>
                <div className="relative animate-scale-in">
                  <img 
                    src="https://cdn.poehali.dev/projects/fea5de4e-f362-4bf0-98c1-5dde0cba1a6b/files/0e0a30ab-68d3-4b0d-aac4-463d7f4ebbf6.jpg"
                    alt="Fresh products"
                    className="rounded-2xl shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="py-16 container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-12">Популярные категории</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((cat) => (
                <Card key={cat.id} className="hover:shadow-lg transition-all cursor-pointer group hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <div className={`${cat.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                      <Icon name={cat.icon as any} size={32} className="text-white" />
                    </div>
                    <p className="font-semibold">{cat.name}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <h3 className="text-3xl font-bold text-center mb-12">Хиты продаж</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.slice(0, 6).map((product) => (
                  <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-all group">
                    <div className="relative overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      {product.discount && (
                        <Badge className="absolute top-3 right-3 bg-destructive text-destructive-foreground">
                          -{product.discount}%
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-lg mb-2">{product.name}</h4>
                      <div className="flex items-center justify-between">
                        <div>
                          {product.discount ? (
                            <div className="flex items-center gap-2">
                              <span className="text-2xl font-bold text-primary">
                                {Math.round(product.price * (1 - product.discount / 100))} ₽
                              </span>
                              <span className="text-sm text-muted-foreground line-through">
                                {product.price} ₽
                              </span>
                            </div>
                          ) : (
                            <span className="text-2xl font-bold text-primary">{product.price} ₽</span>
                          )}
                        </div>
                        <Button size="sm" onClick={() => addToCart(product)} className="bg-secondary hover:bg-secondary/90">
                          <Icon name="Plus" size={18} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          <section className="py-16 container mx-auto px-4">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold mb-4">Подписки на регулярную доставку</h3>
              <p className="text-muted-foreground text-lg">Получайте любимые продукты автоматически и экономьте</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {subscriptionPlans.map((plan) => (
                <Card key={plan.id} className="hover:shadow-xl transition-all border-2 hover:border-primary">
                  <CardContent className="p-6">
                    <h4 className="text-xl font-bold mb-4">{plan.name}</h4>
                    <div className="mb-4">
                      <span className="text-3xl font-bold text-primary">{plan.price} ₽</span>
                      <span className="text-muted-foreground">/неделя</span>
                    </div>
                    <ul className="space-y-2 mb-6">
                      {plan.items.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Icon name="Check" size={18} className="text-secondary" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full bg-accent hover:bg-accent/90">
                      Оформить подписку
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </main>
      )}

      {activeSection === 'catalog' && (
        <main className="container mx-auto px-4 py-12 animate-fade-in">
          <h2 className="text-4xl font-bold mb-8">Каталог товаров</h2>
          
          <div className="grid lg:grid-cols-4 gap-8 mb-8">
            <Card className="lg:col-span-1">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4">Фильтры</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-semibold mb-3 block">Цена: {priceRange[0]} - {priceRange[1]} ₽</label>
                    <Slider 
                      value={priceRange} 
                      onValueChange={setPriceRange}
                      max={500}
                      step={10}
                      className="mb-2"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="discounts" 
                      checked={showOnlyDiscounts}
                      onCheckedChange={(checked) => setShowOnlyDiscounts(checked as boolean)}
                    />
                    <label htmlFor="discounts" className="text-sm font-medium cursor-pointer">
                      Только со скидкой
                    </label>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      setPriceRange([0, 500]);
                      setShowOnlyDiscounts(false);
                    }}
                  >
                    Сбросить фильтры
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="lg:col-span-3">
              <Tabs defaultValue="all" className="mb-8">
                <TabsList className="mb-8">
                  <TabsTrigger value="all">Все товары</TabsTrigger>
                  <TabsTrigger value="fruits">Фрукты</TabsTrigger>
                  <TabsTrigger value="vegetables">Овощи</TabsTrigger>
                  <TabsTrigger value="dairy">Молочные</TabsTrigger>
                  <TabsTrigger value="bakery">Хлеб</TabsTrigger>
                  <TabsTrigger value="drinks">Напитки</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getFilteredProducts().map((product) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-all">
                  <div className="relative">
                    <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                    {product.discount && (
                      <Badge className="absolute top-3 right-3 bg-destructive">-{product.discount}%</Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2">{product.name}</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-primary">{product.price} ₽</span>
                      <Button size="sm" onClick={() => addToCart(product)}>
                        <Icon name="Plus" size={18} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      )}

      {activeSection === 'deals' && (
        <main className="container mx-auto px-4 py-12 animate-fade-in">
          <h2 className="text-4xl font-bold mb-8">Акции и спецпредложения</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="bg-gradient-to-br from-primary/20 to-primary/5 border-primary">
              <CardContent className="p-8">
                <Badge className="mb-4 bg-primary">Супер предложение</Badge>
                <h3 className="text-3xl font-bold mb-4">Скидка 25% на фрукты</h3>
                <p className="text-lg mb-6">При покупке от 1000 рублей</p>
                <Button className="bg-primary">Воспользоваться</Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-secondary/20 to-secondary/5 border-secondary">
              <CardContent className="p-8">
                <Badge className="mb-4 bg-secondary">Новинка</Badge>
                <h3 className="text-3xl font-bold mb-4">Первая подписка со скидкой</h3>
                <p className="text-lg mb-6">-20% на первый месяц любой подписки</p>
                <Button className="bg-secondary">Подписаться</Button>
              </CardContent>
            </Card>
          </div>

          <h3 className="text-2xl font-bold mb-6">Товары со скидкой</h3>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.filter(p => p.discount).map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-all">
                <div className="relative">
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                  <Badge className="absolute top-3 right-3 bg-destructive">-{product.discount}%</Badge>
                </div>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">{product.name}</h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xl font-bold text-primary mr-2">
                        {Math.round(product.price * (1 - (product.discount || 0) / 100))} ₽
                      </span>
                      <span className="text-sm line-through text-muted-foreground">{product.price} ₽</span>
                    </div>
                    <Button size="sm" onClick={() => addToCart(product)}>
                      <Icon name="Plus" size={18} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      )}

      {activeSection === 'delivery' && (
        <main className="container mx-auto px-4 py-12 animate-fade-in">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8">Доставка</h2>
            
            <div className="mb-12">
              <img 
                src="https://cdn.poehali.dev/projects/fea5de4e-f362-4bf0-98c1-5dde0cba1a6b/files/197c320e-87ab-4112-83be-0911226da5d0.jpg"
                alt="Delivery"
                className="w-full h-64 object-cover rounded-2xl shadow-xl mb-8"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Clock" size={32} className="text-white" />
                  </div>
                  <h4 className="font-bold mb-2">Быстрая доставка</h4>
                  <p className="text-muted-foreground">От 2 часов в пределах города</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="bg-secondary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Truck" size={32} className="text-white" />
                  </div>
                  <h4 className="font-bold mb-2">Бесплатно</h4>
                  <p className="text-muted-foreground">При заказе от 1500 рублей</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="bg-accent w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="MapPin" size={32} className="text-white" />
                  </div>
                  <h4 className="font-bold mb-2">Удобно</h4>
                  <p className="text-muted-foreground">Выбирайте время доставки</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">Зоны доставки</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b">
                    <span className="font-semibold">Центр города</span>
                    <span className="text-muted-foreground">Бесплатно от 1000 ₽</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b">
                    <span className="font-semibold">Ближние районы</span>
                    <span className="text-muted-foreground">Бесплатно от 1500 ₽</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Загородные зоны</span>
                    <span className="text-muted-foreground">Бесплатно от 2500 ₽</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      )}

      {activeSection === 'contacts' && (
        <main className="container mx-auto px-4 py-12 animate-fade-in">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8">Контакты</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Свяжитесь с нами</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Icon name="Phone" size={24} className="text-primary mt-1" />
                      <div>
                        <p className="font-semibold">Телефон</p>
                        <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="Mail" size={24} className="text-primary mt-1" />
                      <div>
                        <p className="font-semibold">Email</p>
                        <p className="text-muted-foreground">info@freshmarket.ru</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="MapPin" size={24} className="text-primary mt-1" />
                      <div>
                        <p className="font-semibold">Адрес</p>
                        <p className="text-muted-foreground">г. Москва, ул. Примерная, д. 123</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="Clock" size={24} className="text-primary mt-1" />
                      <div>
                        <p className="font-semibold">Режим работы</p>
                        <p className="text-muted-foreground">Ежедневно с 8:00 до 23:00</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Напишите нам</h3>
                  <form className="space-y-4">
                    <div>
                      <Input placeholder="Ваше имя" />
                    </div>
                    <div>
                      <Input type="email" placeholder="Email" />
                    </div>
                    <div>
                      <Input placeholder="Телефон" />
                    </div>
                    <div>
                      <textarea 
                        className="w-full min-h-[120px] px-3 py-2 border rounded-md"
                        placeholder="Ваше сообщение"
                      ></textarea>
                    </div>
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      Отправить сообщение
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      )}

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