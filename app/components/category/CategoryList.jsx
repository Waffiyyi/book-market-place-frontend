import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Category from '@/app/components/category/Category';
import { categoryProperties } from '@/app/components/category/availableCategoryListProps';

const CategoryList = ({ categories, onBack, title }) => {
  const router = useRouter();

  return (
    <div className="bg-[#0D0D0D] min-h-screen px-5 py-10">
      <div className="flex gap-6 mb-6">
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={onBack || (() => router.back())}
          sx={{ color: '#fff', textTransform: 'none' }}
        >
          Back
        </Button>
        <h1 className="text-3xl font-bold text-white">{title}</h1>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {categories.map((category) => {
          const categoryProps = categoryProperties[category] || {
            icon: '📚',
            color: '#9e9e9e',
            glowColor: '#e0e0e0'
          };
          return (
            <Category
              key={category}
              id={category}
              title={category}
              icon={categoryProps.icon}
              color={categoryProps.color}
              glowColor={categoryProps.glowColor}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CategoryList;