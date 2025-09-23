import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Languages } from "lucide-react";

declare global {
  interface Window {
    google: {
      translate: {
        TranslateElement: {
          new (options: any, element: HTMLElement): void;
          InlineLayout: {
            SIMPLE: string;
          };
        };
      };
    };
  }
}

export const GoogleTranslate = () => {
  const translateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initializeTranslate = () => {
      if (typeof window.google !== 'undefined' && window.google.translate && translateRef.current) {
        try {
          new window.google.translate.TranslateElement({
            pageLanguage: 'auto',
            includedLanguages: 'ar,en,de,fr',
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false
          }, translateRef.current);
        } catch (error) {
          console.log('Google Translate initialization error:', error);
        }
      }
    };

    if (typeof window.google !== 'undefined' && window.google.translate) {
      initializeTranslate();
    } else {
      const checkGoogleTranslate = setInterval(() => {
        if (typeof window.google !== 'undefined' && window.google.translate) {
          clearInterval(checkGoogleTranslate);
          initializeTranslate();
        }
      }, 100);

      setTimeout(() => {
        clearInterval(checkGoogleTranslate);
      }, 10000);
    }
  }, []);

  return (
    <Card className="w-fit h-fit scale-75"> {/* تم إضافة scale-75 هنا */}
      <CardContent className="p-2 "> {/* تم تقليل padding من p-3 إلى p-2 */}
        <div className="flex">
          {/* <Languages className="w-4 h-4" /> */}
        </div>
        <div 
          ref={translateRef} 
          id="google_translate_element" 
          className="text-sm" /* إضافة حجم نص أصغر */
          style={{ transform: 'scale(0.9)', transformOrigin: 'center' }} /* تحجيم إضافي */
        ></div>
      </CardContent>
    </Card>
  );
};