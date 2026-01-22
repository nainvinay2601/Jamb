'use client'

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { processImageData, SANITY_BASE_URL } from '@/lib/sanity/image';
import type { FeatureSection } from '@/lib/sanity/sanity.types';

export function FeatureSectionComponent(props: FeatureSection) {
  const desktopImageRef = useRef<HTMLDivElement>(null);
  const mobileImageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: desktopScroll } = useScroll({
    target: desktopImageRef,
    offset: ['start end', 'end start']
  });

  const { scrollYProgress: mobileScroll } = useScroll({
    target: mobileImageRef,
    offset: ['start end', 'end start']
  });

  const desktopY = useTransform(desktopScroll, [0, 1], ['0%', '20%']);
  const mobileY = useTransform(mobileScroll, [0, 1], ['0%', '15%']);

  console.log('FeatureSection props:', props);

  const {
    subheading,
    title,
    description,
    image,
    primaryButton,
    secondaryButton,
    imagePosition = 'right',
    backgroundColor = 'white',
  } = props;

  const bgColorMap = {
    cream: 'bg-[#dfdad7]',
    white: 'bg-[#f3f0ed]',
    gray: 'bg-[#e3e3e3]',
  } as const;

  const processedImage = image ? processImageData(image as any) : null;
  const isImageLeft = imagePosition === 'left';

  const getImageUrl = () => {
    if (!processedImage) return null;
    const parts = processedImage.id.split('-');
    if (parts.length < 4) return null;
    const assetId = parts.slice(1, -2).join('-');
    const dimensions = parts[parts.length - 2];
    const format = parts[parts.length - 1];
    return `${SANITY_BASE_URL}${assetId}-${dimensions}.${format}`;
  };

  const imageUrl = getImageUrl();
  const bgClass = bgColorMap[backgroundColor as keyof typeof bgColorMap] || bgColorMap.white;

  return (
    <>
      {/* Mobile Version */}
      <section 
        className={`lg:hidden relative min-h-screen flex items-center justify-center my-10 ${bgClass}`}
        data-section-type="featureSection"
        id={title ? title.toLowerCase().replace(/\s+/g, '-') : undefined}
      >
        {/* Background Image */}
        {imageUrl && (
          <div ref={mobileImageRef} className="absolute inset-0 z-0 flex items-center justify-center bg-black overflow-hidden">
            <motion.div style={{ y: mobileY }} className="relative w-full h-full max-w-full max-h-full">
              <Image
                src={imageUrl}
                alt={processedImage?.alt || title || 'Feature image'}
                fill
                className="object-contain"
                sizes="100vw"
                unoptimized
              />
            </motion.div>
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
        )}

        {/* Content Overlay */}
        <div className="relative z-10 px-6 py-12 text-center">
          {subheading && (
            <p className="mb-6 text-[14px] font-medium uppercase text-white">
              {subheading}
            </p>
          )}

          {title && (
            <h2 className="mb-4 text-[28px] font-medium tracking-tight text-white capitalize">
              {title}
            </h2>
          )}

          {description && (
            <p className="mb-8 text-[14px] text-white max-w-md mx-auto">
              {description}
            </p>
          )}

          {(primaryButton || secondaryButton) && (
            <div className="flex flex-col gap-3 capitalize items-center justify-center">
              {primaryButton?.text && (
                <a
                  href={primaryButton.url || '#'}
                  className="inline-flex items-center justify-center border border-[#737373] text-[#737373] bg-white/80 backdrop-blur-sm px-8 py-2 text-base font-medium transition-colors hover:bg-gray-100 text-[14px] w-full max-w-xs"
                >
                  {primaryButton.text}
                </a>
              )}

              {secondaryButton?.text && (
                <a
                  href={secondaryButton.url || '#'}
                  className="inline-flex items-center justify-center border border-[#737373] text-[#737373] bg-white/80 backdrop-blur-sm px-8 py-2 text-base font-medium transition-colors hover:bg-gray-100 text-[14px] w-full max-w-xs"
                >
                  {secondaryButton.text}
                </a>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Desktop Version */}
      <section 
        className={`hidden lg:block py-12 md:py-16 lg:py-34 ${bgClass}`}
        data-section-type="featureSection"
      >
        <div className="">
          <div
            className={`flex flex-col items-center gap-20 md:gap-12 lg:flex-row lg:gap-20 justify-between mx-40 ${
              isImageLeft ? 'lg:flex-row-reverse' : ''
            }`}
          >
            {/* Content Section */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20%' }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="w-1/2 h-full flex items-center justify-center"
            >
              <div className="">
                {subheading && (
                  <p className="mb-8 text-[16px] font-medium uppercase text-black text-center">
                    {subheading}
                  </p>
                )}

                {title && (
                  <h2 className="mb-4 text-center text-[34px] font-medium tracking-tight text-gray-900 capitalize">
                    {title}
                  </h2>
                )}

                {description && (
                  <p className="mb-6 text-[16px] text-gray-600 sm:text-[16px] lg:mb-8 leading-[25px] tracking-[0px] w-[510px]">
                    {description}
                  </p>
                )}

                {(primaryButton || secondaryButton) && (
                  <div className="flex flex-col gap-1 sm:gap-2.5 capitalize items-center justify-center">
                    {primaryButton?.text && (
                      <a
                        href={primaryButton.url || '#'}
                        className="inline-flex items-center justify-center border border-[#737373] text-[#737373] px-6 py-1 text-base font-medium transition-colors hover:bg-gray-800 text-[16px]"
                      >
                        {primaryButton.text}
                      </a>
                    )}

                    {secondaryButton?.text && (
                      <a
                        href={secondaryButton.url || '#'}
                        className="inline-flex items-center justify-center border border-[#737373] text-[#737373] px-6 py-1 text-base font-medium transition-colors hover:bg-gray-800 text-[16px]"
                      >
                        {secondaryButton.text}
                      </a>
                    )}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Image Section */}
            {imageUrl && (
              <div ref={desktopImageRef} className="relative aspect-4/5 w-1/2 h-[88vh] overflow-hidden">
                <motion.div style={{ y: desktopY }} className="relative w-full h-full">
                  <Image
                    src={imageUrl}
                    alt={processedImage?.alt || title || 'Feature image'}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    unoptimized
                  />
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}