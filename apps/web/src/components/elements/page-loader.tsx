'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, animate } from 'motion/react';

export function PageLoader() {
  const [isComplete, setIsComplete] = useState(false);
  const [displayValue, setDisplayValue] = useState(0);
  const count = useMotionValue(0);

  useEffect(() => {
    const unsubscribe = count.on('change', (latest) => {
      setDisplayValue(Math.round(latest));
    });

    const controls = animate(count, 100, {
      duration: 2.5,
      ease: 'easeInOut',
      onComplete: () => {
        setTimeout(() => setIsComplete(true), 600);
      },
    });

    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [count]);

  if (isComplete) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: displayValue === 100 ? 0 : 1 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
    >
      <p className="text-white text-[16px] font-light tracking-wider">
        {displayValue}%
      </p>
    </motion.div>
  );
}