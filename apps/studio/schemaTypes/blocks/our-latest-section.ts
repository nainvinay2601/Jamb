
import { Blocks } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const ourLatestSection = defineType({
  name: 'ourLatestSection',
  title: 'Our Latest Section',
  type: 'object',
  icon:Blocks,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Main heading (e.g., "Our latest lighting")',
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      validation: (Rule) => Rule.min(4).max(6),
      description: 'Add 4-6 items. Layout will adapt automatically.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
              initialValue: 'Lorem Ipsum',
            }),
            defineField({
              name: 'subtitle',
              title: 'Subtitle',
              type: 'string',
              initialValue: 'Subtitle',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'subtitle',
              media: 'image',
            },
          },
        },
      ],
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
      initialValue: 'gray',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      itemCount: 'items.length',
    },
    prepare({ title, itemCount }) {
      return {
        title: title || 'Our Latest Section',
        subtitle: `${itemCount || 0} items`,
      };
    },
  },
});

