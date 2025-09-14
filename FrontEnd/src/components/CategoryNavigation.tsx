import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useEffect, useState } from "react";
import {  fetchCategories, clearError } from '../store/slices/categories/categoriesSlice';


export const CategoryNavigation = () => {
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector((s: RootState) => s.categories.items);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  useEffect(()=> {
    dispatch(fetchCategories({ page: currentPage, limit: itemsPerPage }));
  }, [])
  // const categories = [
  //   { name: t('categories.politics'), color: "bg-primary", textColor: "text-primary-foreground" },
  //   { name: t('categories.culture'), color: "bg-mvhs-pink", textColor: "text-white" },
  //   { name: t('categories.science'), color: "bg-mvhs-green", textColor: "text-white" },
  //   { name: t('categories.health'), color: "bg-mvhs-cyan", textColor: "text-white" },
  //   { name: t('categories.languages'), color: "bg-mvhs-purple", textColor: "text-white" },
  //   { name: t('categories.youth'), color: "bg-mvhs-orange", textColor: "text-white" },
  //   { name: t('categories.career'), color: "bg-mvhs-indigo", textColor: "text-white" },
  //   { name: t('categories.digital'), color: "bg-mvhs-cyan", textColor: "text-white" },
  // ];

  return (
    <div className="w-full">
      {/* Category bars */}
      <div className="flex">
        {categories.map((category, index) => {
          const a = Math.floor((Math.random() * 10))
          return(
          <div
            key={index}
            className={`bg-red-${a*100} px-4 py-3 text-xs font-medium text-center flex-1 hover:opacity-90 transition-opacity cursor-pointer`}
          >
            <div className="max-w-[120px] mx-auto leading-tight">
              {category.name}
            </div>
          </div>
        )})}
      </div>
    </div>
  );
};