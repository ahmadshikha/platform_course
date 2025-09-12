import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  const { t, i18n } = useTranslation();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ${i18n.language === 'ar' ? 'text-right' : ''}`}>
          
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">{t('siteTitle')}</h3>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              {i18n.language === 'ar' 
                ? 'مركز دمشق لتعليم الكبار - مؤسسة تعليمية رائدة تقدم أكثر من 800 برنامج تعليمي وثقافي للمجتمع السوري.'
                : i18n.language === 'fr'
                ? 'Centre de Damas pour l\'Éducation des Adultes - Une institution éducative de premier plan offrant plus de 800 programmes éducatifs et culturels à la communauté syrienne.'
                : 'Damascus Center for Adult Education - A leading educational institution offering over 800 educational and cultural programs to the Syrian community.'
              }
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
            <h4 className="text-lg font-semibold">
              {i18n.language === 'ar' ? 'روابط سريعة' : i18n.language === 'fr' ? 'Liens Rapides' : 'Quick Links'}
            </h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">{t('nav.registration')}</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">{t('nav.services')}</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">{t('nav.about')}</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">{t('nav.contact')}</a></li>
              <li><a href="/youth-education" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">{t('programs.youth.title')}</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">
              {i18n.language === 'ar' ? 'معلومات الاتصال' : i18n.language === 'fr' ? 'Informations de Contact' : 'Contact Information'}
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span className="text-primary-foreground/80">
                  {i18n.language === 'ar' 
                    ? 'دمشق، سوريا' 
                    : i18n.language === 'fr'
                    ? 'Damas, Syrie'
                    : 'Damascus, Syria'
                  }
                </span>
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
            <h4 className="text-lg font-semibold">
              {i18n.language === 'ar' ? 'النشرة الإخبارية' : i18n.language === 'fr' ? 'Newsletter' : 'Newsletter'}
            </h4>
            <p className="text-primary-foreground/80 text-sm">
              {i18n.language === 'ar' 
                ? 'اشترك في نشرتنا الإخبارية للحصول على آخر الأخبار والفعاليات.'
                : i18n.language === 'fr'
                ? 'Abonnez-vous à notre newsletter pour recevoir les dernières nouvelles et événements.'
                : 'Subscribe to our newsletter for the latest news and events.'
              }
            </p>
            <div className="flex space-x-2">
              <Input 
                type="email" 
                placeholder={i18n.language === 'ar' ? 'البريد الإلكتروني' : i18n.language === 'fr' ? 'Adresse e-mail' : 'Email address'}
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
              />
              <Button variant="secondary" size="sm">
                {i18n.language === 'ar' ? 'اشترك' : i18n.language === 'fr' ? 'S\'abonner' : 'Subscribe'}
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-primary-foreground/20" />
        
        <div className={`flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-primary-foreground/80 ${i18n.language === 'ar' ? 'text-right' : ''}`}>
          <div>
            © 2024 {t('siteTitle')}. {i18n.language === 'ar' ? 'جميع الحقوق محفوظة.' : i18n.language === 'fr' ? 'Tous droits réservés.' : 'All rights reserved.'}
          </div>
          <div className={`flex space-x-4 ${i18n.language === 'ar' ? 'space-x-reverse' : ''}`}>
            <a href="#" className="hover:text-primary-foreground transition-colors">
              {i18n.language === 'ar' ? 'سياسة الخصوصية' : i18n.language === 'fr' ? 'Politique de Confidentialité' : 'Privacy Policy'}
            </a>
            <a href="#" className="hover:text-primary-foreground transition-colors">
              {i18n.language === 'ar' ? 'شروط الاستخدام' : i18n.language === 'fr' ? 'Conditions d\'Utilisation' : 'Terms of Service'}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};