'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { processImageData, SANITY_BASE_URL } from '@/lib/sanity/image';
import type { OurLatestSection } from '@/lib/sanity/sanity.types';

const bgColorMap = {
  cream: 'bg-[#FFF8F0]',
  white: 'bg-white',
  gray: 'bg-gray-50',
} as const;

const getGridClasses = (itemCount: number) => {
  switch (itemCount) {
    case 4:
      return 'grid-cols-2 md:grid-cols-4';
    case 5:
      return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5';
    case 6:
      return 'grid-cols-2 md:grid-cols-3';
    default:
      return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
  }
};

const getGapClasses = (itemCount: number) => {
  if (itemCount === 5) {
    return 'gap-24';
  }
  return 'gap-8';
};

const getContainerPadding = (itemCount: number) => {
  if (itemCount === 5) {
    return 'px-20';
  }
  return 'px-10';
};

const getImageUrl = (image: any, width = 1200) => {
  const processedImage = processImageData(image);
  if (!processedImage) return null;
  
  const parts = processedImage.id.split('-');
  if (parts.length < 4) return null;
  
  const assetId = parts.slice(1, -2).join('-');
  const dimensions = parts[parts.length - 2];
  const format = parts[parts.length - 1];
  
  return `${SANITY_BASE_URL}${assetId}-${dimensions}.${format}?w=${width}&q=95`;
};

const getImageAspectRatio = (image: any): number => {
  const processedImage = processImageData(image);
  if (!processedImage) return 1;
  
  const parts = processedImage.id.split('-');
  if (parts.length < 4) return 1;
  
  const dimensions = parts[parts.length - 2];
  const [width, height] = dimensions.split('x').map(Number);
  
  if (!width || !height) return 1;
  
  return width / height;
};

const hasVaryingAspectRatios = (items: any[]): boolean => {
  if (!items || items.length < 2) return false;
  
  const aspectRatios = items
    .filter(item => item.image)
    .map(item => getImageAspectRatio(item.image));
  
  if (aspectRatios.length < 2) return false;
  
  const minRatio = Math.min(...aspectRatios);
  const maxRatio = Math.max(...aspectRatios);
  
  const threshold = 0.2;
  const difference = Math.abs(maxRatio - minRatio) / minRatio;
  
  return difference > threshold;
};

export function OurLatestSectionComponent(props: OurLatestSection) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { heading, items, backgroundColor = 'gray' } = props;
  
  const itemCount = items?.length || 0;
  const gridClasses = getGridClasses(itemCount);
  const gapClasses = getGapClasses(itemCount);
  const containerPadding = getContainerPadding(itemCount);
  
  const shouldCenterImages = hasVaryingAspectRatios(items || []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % itemCount);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + itemCount) % itemCount);
  };

  return (
    <section className="capitalize bg-[#E3E3E3] py-8 md:py-4 lg:py-9">
      <div className="lg:px-10">
        {/* Heading */}
        {heading && (
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15%' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mb-8 text-center text-[20px] font-medium tracking-tight text-gray-900 lg:mb-8 px-4"
          >
            {heading}
          </motion.h2>
        )}

        {/* Mobile Carousel */}
        <div className="lg:hidden relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {items && items.map((item, index) => {
                const imageUrl = item.image ? getImageUrl(item.image, 1200) : null;

                return (
                  <div key={index} className="min-w-full">
                    <div className="flex flex-col">
                      {imageUrl && (
                        <div className="relative w-full aspect-[4/5] overflow-hidden bg-white mb-4">
                          <Image
                            src={imageUrl}
                            alt={item.title || 'Product image'}
                            fill
                            className="object-cover"
                            sizes="100vw"
                            unoptimized
                          />
                        </div>
                      )}

                      <div className="px-4 text-center">
                        {item.title && (
                          <h3 className="mb-0.5 text-[16px] font-bold text-[#737373]">
                            {item.title}
                          </h3>
                        )}

                        {item.subtitle && (
                          <p className="text-[16px] font-medium text-[#737373]">{item.subtitle}</p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-[40%] -translate-y-1/2 bg-white/10 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-gray-100 mix-blend-difference" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-[40%] -translate-y-1/2 bg-white/10 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors z-10"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-gray-100 mix-blend-difference" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6 px-4">
            {items && items.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-1 h-1 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-gray-900' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop Grid */}
        {items && items.length > 0 && (
          <div className={`hidden lg:grid justify-center ${shouldCenterImages ? 'items-center' : ''} ${gridClasses} ${gapClasses} ${containerPadding}`}>
            {items.map((item, index) => {
              const imageUrl = item.image ? getImageUrl(item.image, 800) : null;
              const aspectRatio = item.image ? getImageAspectRatio(item.image) : 1;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10%' }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    ease: 'easeOut'
                  }}
                  className="flex flex-col items-center text-center"
                >
                  {imageUrl && (
                    <div 
                      className="relative mb-3 w-full overflow-hidden bg-white"
                      style={{ aspectRatio: aspectRatio.toString() }}
                    >
                      <Image
                        src={imageUrl}
                        alt={item.title || 'Product image'}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                        unoptimized
                      />
                    </div>
                  )}

                  {item.title && (
                    <h3 className="mb-0.5 text-[16px] font-bold text-[#737373]">
                      {item.title}
                    </h3>
                  )}

                  {item.subtitle && (
                    <p className="text-[16px] font-medium text-[#737373]">{item.subtitle}</p>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}