import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const CategoryNavigation = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate(); // استخدام useNavigate للتنقل

  const colors = [
    "bg-blue-500 text-white",
    "bg-pink-500 text-white",
    "bg-green-500 text-white", 
    "bg-cyan-500 text-white",
    "bg-purple-500 text-white",
    "bg-orange-500 text-white",
    "bg-indigo-500 text-white",
    "bg-teal-500 text-white"
  ];

  const handleCategoryClick = (categoryId) => {
   
    
   
    
    navigate(`/youth-education/${categoryId}`);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/categories');
        
        if (!response.ok) {
          throw new Error();
        }
        
        const data = await response.json();
        let categoriesData = [];
        
        if (Array.isArray(data)) {
          categoriesData = data;
        } else if (data && typeof data === 'object') {
          if (data.categories && Array.isArray(data.categories)) {
            categoriesData = data.categories;
          } else if (data.data && Array.isArray(data.data)) {
            categoriesData = data.data;
          } else {
            categoriesData = Object.values(data);
          }
        } else {
          throw new Error();
        }
        
        const categoriesWithColors = categoriesData.map((category, index) => ({
          id: category._id || category.id || index,
          name: category.name || `تصنيف ${index + 1}`,
          className: colors[index % colors.length]
        }));
        
        setCategories(categoriesWithColors);
      } catch (error) {
        const sampleCategories = [
          { id: 1, name: "السياسة", className: colors[0] },
          { id: 2, name: "الثقافة", className: colors[1] },
          { id: 3, name: "العلوم", className: colors[2] },
          { id: 4, name: "الصحة", className: colors[3] },
          { id: 5, name: "اللغات", className: colors[4] },
          { id: 6, name: "الشباب", className: colors[5] },
          { id: 7, name: "المهن", className: colors[6] },
          { id: 8, name: "الرقمية", className: colors[7] },
        ];
        
        setCategories(sampleCategories);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="w-full">
      <div className="flex">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`${category.className} px-4 py-3 text-xs font-medium text-center flex-1 hover:opacity-90 transition-opacity cursor-pointer`}
            onClick={() => handleCategoryClick(category.id)} 
          >
            <div className="max-w-[120px] mx-auto leading-tight">
              {category.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryNavigation;