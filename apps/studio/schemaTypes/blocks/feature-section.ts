// import { ImageIcon } from '@sanity/icons';

import { ImageIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';


export const featureSection = defineType({
  name: 'featureSection',
  title: 'Feature Section',
  type: 'object',
   icon: ImageIcon,
  fields: [
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
      description: 'Small text above the title (e.g., "The journal")',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Main heading (e.g., "Fireplaces")',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
      description: 'Main description text',
    }),
    defineField({
      name: 'image',
      title: 'Feature Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'primaryButton',
      title: 'Primary Button',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string',
          initialValue: 'Explore our Fireplaces',
        },
        {
          name: 'url',
          title: 'Button URL',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'secondaryButton',
      title: 'Secondary Button',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string',
          initialValue: 'Sell an Antique Chimneypiece',
        },
        {
          name: 'url',
          title: 'Button URL',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'imagePosition',
      title: 'Image Position',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Right', value: 'right' },
        ],
        layout: 'radio',
      },
      initialValue: 'right',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          { title: 'White', value: 'white' },

          { title: 'Cream', value: 'cream' },
          { title: 'Light Gray', value: 'gray' },
        ],
      },
      initialValue: 'white',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      position: 'imagePosition',
    },
    prepare({ title, media, position }) {
      return {
        title: title,
        subtitle: `Image ${position}`,
        media: media,
      };
    },
  },
});