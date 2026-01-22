'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { FeatureSectionNav } from '../elements/feature-section-nav'
import { processImageData, SANITY_BASE_URL } from '@/lib/sanity/image'

type SimpleHeroProps = {
  image?: any
  overlayText?: string
  height?: string
}

export function SimpleHeroComponent({ 
  image, 
  overlayText, 
  height = 'h-[600px]' 
}: SimpleHeroProps) {
  const imageRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ['start start', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  console.log('SimpleHero props:', { image, overlayText, height })

  if (!image) return null

  const processedImage = processImageData(image)

  const getImageUrl = () => {
    if (!processedImage?.id) return null
    const parts = processedImage.id.split('-')
    if (parts.length < 4) return null
    const assetId = parts.slice(1, -2).join('-')
    const dimensions = parts[parts.length - 2]
    const format = parts[parts.length - 1]
    return `${SANITY_BASE_URL}${assetId}-${dimensions}.${format}`
  }

  const imageUrl = getImageUrl()

  if (!imageUrl) {
    console.error('Failed to generate image URL from:', processedImage)
    return null
  }

  return (
    <section className="relative w-full overflow-hidden mt-20 px-2 lg:px-10">
      {/* Image */}
      <motion.div
        ref={imageRef}
        initial={{ clipPath: 'inset(100% 0% 0% 0%)', scale: 1.2 }}
        animate={{ clipPath: 'inset(0% 0% 0% 0%)', scale: 1 }}
        transition={{ duration: 1.6, delay: 2.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full h-[88vh] overflow-hidden"
      >
        <motion.div style={{ y }} className="relative w-full h-full">
          <Image
            src={imageUrl}
            alt={processedImage?.alt || overlayText || 'Hero image'}
            fill
            className="object-cover"
            sizes="100vw"
            priority
            unoptimized
          />
        </motion.div>
      </motion.div>
      
      {/* Nav */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 3.3, ease: 'easeOut' }}
        className="my-2"
      >
        <FeatureSectionNav />
      </motion.div>
    </section>
  )
}