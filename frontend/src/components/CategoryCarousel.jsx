import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';
import "./style1.css";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="mx-auto max-w-auto  text-center">
      {/* SVG Shape */}
      <div class="custom-shape-divider-top-1732256479">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
    </svg>
</div>

      {/* New div above the Trending Job Categories */}
      <div className="h-[100px] w-full">
        {/* You can add any content or background styling here */}
      </div>

      {/* Trending Job Categories Title with Margin */}
      <div className="mt-8">
        <h2 className="text-3xl font-bold text-[#1f2937] mb-6">
          Trending Job Categories
        </h2>
      </div>

      {/* Carousel Section */}
      <Carousel className="w-full max-w-2xl mx-auto">
        <CarouselContent className="flex gap-4">
          {category.map((cat, index) => (
            <CarouselItem key={index} className="flex justify-center">
              <Button
                onClick={() => searchJobHandler(cat)}
                variant="outline"
                className="rounded-full border-black text-[#1f2937] hover:bg-[#1f2937] hover:text-white transition-all ease-in-out duration-200 shadow-lg px-6 py-3"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="text-[#1f2937] hover:text-gray-700" />
        <CarouselNext className="text-[#1f2937] hover:text-gray-700" />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
