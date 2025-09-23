

import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Category {
  _id: string;
  name: string;
  description: string;
  image: string;
}

interface CategoriesResponse {
  success: boolean;
  data: Category[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export const ProgramGrid = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/categories');
        
        if (!response.ok) {
          throw new Error('فشل في تحميل الفئات');
        }
        
        const data: CategoriesResponse = await response.json();
        
        if (data.success) {
          setCategories(data.data || []);
        } else {
          throw new Error('فشل في تحميل الفئات');
        }
      } catch (err) {
        setError(err.message || 'حدث خطأ أثناء تحميل الفئات');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const extractFilename = (fullPath: string) => {
    if (!fullPath) return null;
    
    const parts = fullPath.split(/[\\/]/);
    
    return parts[parts.length - 1];
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-0">
                {/* <Skeleton className="aspect-[4/3] w-full rounded-t-lg" />
                <div className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-3" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3 mb-4" />
                  <Skeleton className="h-9 w-24" />
                </div> */}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="bg-red-50 p-6 rounded-lg border border-red-200 inline-block">
          <p className="text-red-600 mb-4">{error}</p>
          <Button 
            variant="outline" 
            onClick={() => window.location.reload()}
          >
            المحاولة مرة أخرى
          </Button>
        </div>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-700 mb-2">لا توجد فئات متاحة</h3>
          <p className="text-gray-500">لم يتم العثور على أي فئات في الوقت الحالي.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-12 text-primary">
        الفئات التعليمية
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => {
          const imageFilename = extractFilename(category.image);
          const imageUrl = imageFilename 
            ? `http://localhost:5000/uploads/${imageFilename}`
            : null;

          return (
            <Card key={category._id} className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <Link to={`/youth-education/${category._id}`}>
                <CardContent className="p-0">
                  <div className="aspect-[4/3] overflow-hidden rounded-t-lg relative">
                    <img
                      src={imageUrl || "http://localhost:5000/uploads/convert.jpg"}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                     
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-primary hover:text-primary/80 transition-colors mb-3">
                      {category.name}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {category.description || 'لا يوجد وصف متاح لهذه الفئة'}
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300"

                    >
                      استكشاف الكورسات →
                    </Button>
                  </div>
                </CardContent>
              </Link>
            </Card>
          );
        })}
      </div>
    </div>
  );
};