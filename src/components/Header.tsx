import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  cart: any[];
  activeSection: string;
  setActiveSection: (section: string) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  cartSheetContent: React.ReactNode;
}

const Header = ({
  cart,
  activeSection,
  setActiveSection,
  isCartOpen,
  setIsCartOpen,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  cartSheetContent
}: HeaderProps) => {
  return (
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
              {cartSheetContent}
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
  );
};

export default Header;
