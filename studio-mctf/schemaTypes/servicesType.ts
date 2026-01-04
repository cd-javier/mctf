import {defineType, defineField} from 'sanity'

export const servicesType = defineType({
  name: 'services',
  title: 'Services Page',
  type: 'document',
  options: {
    singleton: true,
  },

  fieldsets: [
    {
      name: 'hero',
      title: 'Hero Section',
      options: {collapsible: true, collapsed: false},
    },
    {
      name: 'trusted_by',
      title: 'Trusted By',
      options: {collapsible: true, collapsed: false},
    },
  ],

  fields: [
    // HERO
    defineField({
      name: 'heading',
      title: 'Heading',
      description: 'length',
      type: 'string',
      fieldset: 'hero',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      description: 'length',
      type: 'string',
      fieldset: 'hero',
      validation: (rule) => rule.required(),
    }),

    // SERVICES
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'service',
          title: 'Service',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'body',
              title: 'body',
              type: 'array',
              of: [{type: 'block'}],
            }),
          ],
          preview: {
            select: {
              title: 'title',
              media: 'image',
            },
          },
        },
      ],
      validation: (rule) => rule.min(3).max(3).error('You must have exactly 3 services'),
    }),

    // TRUSTED BY
    defineField({
      name: 'show_trusted_by',
      type: 'boolean',
      fieldset: 'trusted_by',
    }),
    defineField({
      name: 'trusted_by',
      title: 'Trusted By',
      type: 'reference',
      fieldset: 'trusted_by',
      to: {type: 'trusted_by'},
      readOnly: true,
      hidden: ({parent}) => !parent?.show_trusted_by,
    }),
  ],

  preview: {
    select: {},
    prepare() {
      return {
        title: 'Services Page',
      }
    },
  },
})
