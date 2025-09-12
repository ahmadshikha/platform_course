import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Navigation, Clock } from "lucide-react";
import { useState } from "react";

export const MapSection = () => {
  const { t } = useTranslation();
  const [activeLocation, setActiveLocation] = useState(0);

  const locations = [
    {
      name: "مركز دمشق الرئيسي",
      address: " ساحة المحافظة, دمشق، سوريا",
      phone: "+963 11 123456",
      email: "info@damascus-center.sy",
      hours: "السبت - الخميس: 8 صباحاً - 6 مساءً",
      coords: [33.5138, 36.2765],
      markerPosition: "top-1/3 left-1/2"
    },
    {
      name: "فرع حلب",
      address: "شارع السلام، حلب، سوريا", 
      phone: "+963 21 234567",
      email: "aleppo@damascus-center.sy",
      hours: "السبت - الخميس: 8 صباحاً - 5 مساءً",
      coords: [36.2021, 37.1343],
      markerPosition: "top-1/4 left-1/3"
    },
    
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary mb-4">
            {t('navigation.contact')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            اكتشف مواقعنا في جميع أنحاء سوريا واختر الفرع الأقرب إليك
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Syrian Regional Map - Interactive */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            <div className="h-[500px] relative">
              <img 
                src="/src/assets/syria-map.jpg" 
                alt="خريطة سوريا الإدارية"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              
              {/* Location markers with animation */}
              {locations.map((location, index) => (
                <div 
                  key={index}
                  className={`absolute ${location.markerPosition} transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                    activeLocation === index ? "z-10 scale-125" : "z-0 scale-100"
                  }`}
                  onMouseEnter={() => setActiveLocation(index)}
                >
                  <div className={`w-5 h-5 rounded-full shadow-lg border-2 border-white cursor-pointer ${
                    index === 0 ? "bg-red-500" : 
                    index === 1 ? "bg-blue-500" : 
                    index === 2 ? "bg-green-500" : "bg-purple-500"
                  }`}></div>
                  <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white text-sm font-medium py-1 px-2 rounded shadow-md whitespace-nowrap transition-opacity duration-300 ${
                    activeLocation === index ? "opacity-100" : "opacity-0"
                  }`}>
                    {location.name}
                  </div>
                </div>
              ))}
              
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-2">خريطة سوريا</h3>
                <p className="text-sm opacity-90">مواقعنا في جميع أنحاء البلاد</p>
              </div>
            </div>
          </div>

          {/* Location cards with tabs */}
          <div className="flex flex-col">
            <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
              {locations.map((location, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    activeLocation === index
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  onClick={() => setActiveLocation(index)}
                >
                  {location.name.split(" ")[0]}
                </button>
              ))}
            </div>
            
            <div className="space-y-6">
              {locations.map((location, index) => (
                <Card 
                  key={index} 
                  className={`transition-all duration-500 overflow-hidden ${
                    activeLocation === index 
                      ? "border-primary shadow-lg scale-[1.02]" 
                      : "opacity-70 hover:opacity-100"
                  }`}
                  onMouseEnter={() => setActiveLocation(index)}
                >
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className={`md:w-2 h-auto md:h-full ${
                        index === 0 ? "bg-red-500" : 
                        index === 1 ? "bg-blue-500" : 
                        index === 2 ? "bg-green-500" : "bg-purple-500"
                      }`}></div>
                      
                      <div className="p-6 flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="text-xl font-bold text-primary">
                            {location.name}
                          </h3>
                          <div className={`p-2 rounded-full ${
                            index === 0 ? "bg-red-100 text-red-600" : 
                            index === 1 ? "bg-blue-100 text-blue-600" : 
                            index === 2 ? "bg-green-100 text-green-600" : "bg-purple-100 text-purple-600"
                          }`}>
                            <MapPin className="h-5 w-5" />
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-start">
                            <MapPin className="h-5 w-5 mt-0.5 mr-3 text-muted-foreground" />
                            <p className="text-muted-foreground">{location.address}</p>
                          </div>
                          
                          <div className="flex items-center">
                            <Phone className="h-5 w-5 mr-3 text-muted-foreground" />
                            <p className="text-muted-foreground">{location.phone}</p>
                          </div>
                          
                          <div className="flex items-center">
                            <Mail className="h-5 w-5 mr-3 text-muted-foreground" />
                            <p className="text-muted-foreground">{location.email}</p>
                          </div>
                          
                          <div className="flex items-center">
                            <Clock className="h-5 w-5 mr-3 text-muted-foreground" />
                            <p className="text-muted-foreground">{location.hours}</p>
                          </div>
                        </div>
                        
                        <div className="flex mt-6 space-x-3">
                          <Button className="flex-1 bg-primary hover:bg-primary/90">
                            <Navigation className="h-4 w-4 ml-2" />
                            {t('map.getDirections')}
                          </Button>
                          <Button variant="outline" className="flex-1">
                            اتصل بنا
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

       
       
      </div>
    </div>
  );
};