import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Search, User, Heart, Menu, X, Phone, Mail, MapPin, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";
import { GoogleTranslate } from "@/components/GoogleTranslate";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import logo from '../assets/50.png'; 

export const Header = () => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Detect scroll for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    document.documentElement.lang = lng;
  };

  const getLanguageName = (lng: string) => {
    const names = {
      'ar': 'العربية',
      'en': 'English',
      'de': 'Deutsch',
      'fr': 'Français'
    };
    return names[lng as keyof typeof names] || 'العربية';
  };

  const isRTL = i18n.language === 'ar';

  return (
    <header className={` top-0 mb-4 z-50 bg-white transition-all duration-300 ${isScrolled ? 'shadow-md' : 'shadow-sm'}`}>
      <div className="border-b border-gray-100 text-gray-600 text-sm">
        <div className="container mx-auto px-4 py-2">
          <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
              <div className="flex items-center">
                <Phone className="h-3 w-3 mr-2" />
                <span className="text-xs">+963 11 123 4567</span>
              </div>
              <div className="hidden md:flex items-center">
                <Mail className="h-3 w-3 mr-2" />
                <span className="text-xs">info@mvhs.sy</span>
              </div>
            </div>
            
            <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
              <Select value={i18n.language} onValueChange={changeLanguage}>
                <SelectTrigger className="w-auto h-7 text-xs border-0 shadow-none focus:ring-0 p-0 gap-1">
                  <SelectValue placeholder="اللغة" />
                </SelectTrigger>
                <SelectContent align={isRTL ? "start" : "end"}>
                  <SelectItem value="ar">العربية</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                </SelectContent>
              </Select>
              <GoogleTranslate  ></GoogleTranslate>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-3">
        <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className="flex items-center">
            {/* <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden mr-4">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side={isRTL ? "right" : "left"} className="w-80">
                <MobileNavigation 
                  isRTL={isRTL} 
                  t={t} 
                  onClose={() => setMobileMenuOpen(false)} 
                />
              </SheetContent>
            </Sheet> */}
            
            <div className="flex items-center">
              <img src={logo} alt="Logo" className="mr-2 w-8 h-8" />
              <div className="text-xl font-light text-gray-800 hidden sm:block">
              </div>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-1">
  {[ 'contact'].map((item) => (
    <Link
      key={item}
      to={`/${item === 'home' ? '' : item}`}
      className="px-3 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm"
    >
      {item === 'about' ? 'من نحن' : 'اتصل بنا'}
    </Link>
  ))}
</nav>

          {/* Search and User Actions */}
          {/* <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
        
            <div className="hidden lg:block relative">
              <Input 
                placeholder="أدخل كلمة البحث أو انقر على العدسة لجميع الدورات"
                className="w-56 pr-10 rounded-full text-sm h-9"
                dir={isRTL ? 'rtl' : 'ltr'}
              />
              <Button 
                size="icon" 
                variant="ghost" 
                className={`absolute ${isRTL ? 'left-0' : 'right-0'} top-0 h-full px-3 rounded-r-full`}
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <User className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </div> */}
        </div>
      </div>

      <div className="border-t border-gray-100 bg-gray-50 py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <div className="text-6xl font- tracking-wider text-slate-600 letter-spacing-wide">
            {t('site.title')}
            </div>
            <div className="mx-3 text-gray-300">•</div>
            <div className="text-sm text-gray-500">
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search - للهواتف */}
      {/* <div className="lg:hidden border-t border-gray-100 p-3">
        <div className="container mx-auto">
          <div className="relative">
            <Input 
              placeholder="أدخل كلمة البحث أو انقر على العدسة لجميع الدورات"
              className="pr-10 rounded-full text-sm h-10"
              dir={isRTL ? 'rtl' : 'ltr'}
            />
            <Button 
              size="icon" 
              variant="ghost" 
              className={`absolute ${isRTL ? 'left-0' : 'right-0'} top-0 h-full px-3 rounded-r-full`}
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div> */}
    </header>
  );
};

const MobileNavigation = ({ isRTL, t, onClose }: { isRTL: boolean, t: any, onClose: () => void }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <GoogleTranslate  ></GoogleTranslate>

        <div className="text-lg font-semibold text-gray-800">Damascus Adult Education Center</div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-6 w-6" />
        </Button>
      </div>
      
      {/* <nav className="flex-1 p-4 space-y-3">
        {['home', 'courses', 'teachers', 'about', 'contact'].map((item) => (
          <a
            key={item}
            href={`/${item === 'home' ? '' : item}`}
            className="block py-2 text-base font-medium text-gray-700 hover:text-blue-600 transition-colors"
            onClick={onClose}
          >
            {item === 'home' ? 'الرئيسية' : 
             item === 'courses' ? 'الدورات' :
             item === 'teachers' ? 'المعلمون' :
             item === 'about' ? 'من نحن' : 'اتصل بنا'}
          </a>
        ))}
        
        <div className="pt-6 border-t mt-6">
          <div className="space-y-2">
            <GoogleTranslate></GoogleTranslate>
            <Button variant="outline" className="w-full justify-start text-sm">
              <User className="h-4 w-4 mr-2" />
              حسابي
            </Button>
            <Button variant="outline" className="w-full justify-start text-sm">
              <Heart className="h-4 w-4 mr-2" />
              قائمة الأمنيات
            </Button>
          </div>
        </div>
      </nav> */}
    </div>
  );
};
export default Header;