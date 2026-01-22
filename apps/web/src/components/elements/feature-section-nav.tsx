'use client';

import { useEffect, useState } from 'react';

interface FeatureNavItem {
  id: string;
  title: string;
}

export function FeatureSectionNav() {
  const [sections, setSections] = useState<FeatureNavItem[]>([]);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    // Find all feature sections on the page, but exclude mobile versions
    const featureSections = document.querySelectorAll('[data-section-type="featureSection"]:not(.lg\\:hidden)');
    
    console.log('Found sections:', featureSections.length);
    
    const items: FeatureNavItem[] = Array.from(featureSections)
      .map((section, index) => {
        const heading = section.querySelector('h2')?.textContent || '';
        const title = heading || `Section ${index + 1}`;
        const id = section.id || `feature-${index}`;
        
        console.log(`Section ${index}:`, { title, id, heading });
        
        // Add ID to section if it doesn't have one
        if (!section.id) {
          section.id = id;
        }
        
        return { id, title, heading };
      })
      .filter((item: any) => {
        // Exclude "Subscribe to the jamb newsletter"
        if (item.heading.toLowerCase().includes('subscribe') || 
            item.heading.toLowerCase().includes('newsletter')) {
          return false;
        }
        return true;
      })
      .map((item: any) => {
        // Replace "Our Grand Collection" with "Journal"
        let displayTitle = item.title;
        if (item.heading === 'Our Grand Collection') {
          displayTitle = 'Journal';
        }
        
        return {
          id: item.id,
          title: displayTitle
        };
      });
    
    console.log('Filtered nav items:', items);
    setSections(items);

    // Intersection Observer for active section highlighting
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    featureSections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (sections.length === 0) return null;

  return (
    <nav className="z-50 bg-[#f3f0ed] backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 px-2 lg:px-8">
        <ul className="flex items-center justify-center gap-6 overflow-x-auto py-4 md:gap-2">
          {sections.map((section, index) => (
            <li key={section.id} className="flex items-center gap-2 md:gap-2">
              <button
                onClick={() => scrollToSection(section.id)}
                className={`whitespace-nowrap text-sm font-medium transition-colors text-[#9c9c9d]`}
              >
                {section.title}
              </button>
              {index < sections.length - 1 && (
                <span className="text-gray-400">|</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}