import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground" dir="rtl">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-right">
          
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold"> صالة الشعب لتعليم الكبار</h3>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              مركز دمشق لتعليم الكبار - مؤسسة تعليمية رائدة تقدم أكثر من 800 برنامج تعليمي وثقافي للمجتمع السوري.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="p-2">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">روابط سريعة</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">التسجيل</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">الخدمات</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">عن المركز</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">اتصل بنا</a></li>
              <li><a href="/" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">تعليم الشباب</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">معلومات الاتصال</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span className="text-primary-foreground/80">دمشق، سوريا</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span className="text-primary-foreground/80" dir="ltr">+963 11 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span className="text-primary-foreground/80">info@damascus-education.sy</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">النشرة الإخبارية</h4>
            <p className="text-primary-foreground/80 text-sm">
              اشترك في نشرتنا الإخبارية للحصول على آخر الأخبار والفعاليات.
            </p>
            <div className="flex space-x-2">
              <Input 
                type="email" 
                placeholder="البريد الإلكتروني"
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
              />
              <Button variant="secondary" size="sm">
                اشترك
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-primary-foreground/20" />
        
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-primary-foreground/80 text-right">
          <div>
            © 2024 مركز دمشق لتعليم الكبار. جميع الحقوق محفوظة.
          </div>
          <div className="flex space-x-4 space-x-reverse">
            <a href="#" className="hover:text-primary-foreground transition-colors">
              سياسة الخصوصية
            </a>
            <a href="#" className="hover:text-primary-foreground transition-colors">
              شروط الاستخدام
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;