import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Languages } from "lucide-react";

// Type declaration for Google Translate
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

    // Check if Google Translate is already loaded
    if (typeof window.google !== 'undefined' && window.google.translate) {
      initializeTranslate();
    } else {
      // Wait for Google Translate to load
      const checkGoogleTranslate = setInterval(() => {
        if (typeof window.google !== 'undefined' && window.google.translate) {
          clearInterval(checkGoogleTranslate);
          initializeTranslate();
        }
      }, 100);

      // Cleanup interval after 10 seconds
      setTimeout(() => {
        clearInterval(checkGoogleTranslate);
      }, 10000);
    }
  }, []);

  return (
    <Card className="w-fit">
      <CardContent className="p-3">
        <div className="flex ">
          {/* <Languages className="w-4 h-4" /> */}
         
        </div>
        <div ref={translateRef} id="google_translate_element"></div>
      </CardContent>
    </Card>
  );
};