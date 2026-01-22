import { Zap } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const simpleHero = defineType({
  name: 'simpleHero',
  title: 'Simple Hero Image',
  type: 'object',
  icon:Zap,
  fields: [
    defineField({
      name: 'image',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'overlayText',
      title: 'Overlay Text (Optional)',
      type: 'string',
      description: 'Small text to display centered on the image',
    }),
    defineField({
      name: 'height',
      title: 'Image Height',
      type: 'string',
      options: {
        list: [
          { title: 'Small (400px)', value: 'h-[400px]' },
          { title: 'Medium (600px)', value: 'h-[600px]' },
          { title: 'Large (800px)', value: 'h-[800px]' },
        ],
      },
      initialValue: 'h-[600px]',
    }),
  ],
  preview: {
    select: {
      title: 'overlayText',
      media: 'image',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Hero Image',
        subtitle: 'Simple hero section',
        media: media,
      };
    },
  },
});