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
      name: 'why_work_with_me',
      title: 'Why Work With Me',
      options: {collapsible: true, collapsed: false},
    },
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
    {
      name: 'cta',
      title: 'Call To Action',
      options: {collapsible: true, collapsed: false},
    },
  ],

  fields: [
    // WHY WORK WITH ME
    defineField({
      name: 'why_work_with_me_heading',
      title: 'Heading',
      type: 'string',
      fieldset: 'why_work_with_me',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'why_work_with_me_body',
      title: 'Body',
      type: 'array',
      of: [{type: 'block'}],
      fieldset: 'why_work_with_me',
      validation: (rule) => rule.required(),
    }),

    // HERO
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      fieldset: 'hero',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
      fieldset: 'hero',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'hero_image',
      title: 'Image',
      description: 'Min 1920x600px',
      type: 'image',
      options: {hotspot: true},
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
              description: 'Min 1800x300px',
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
            defineField({
              name: 'cta_text',
              title: 'CTA Text',
              type: 'string',
            }),
            defineField({
              name: 'cta_link',
              title: 'CTA Link',
              type: 'string',
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

    // CTA
    defineField({
      name: 'cta_heading',
      title: 'Heading',
      type: 'string',
      fieldset: 'cta',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'cta_body',
      title: 'Body',
      type: 'text',
      fieldset: 'cta',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'cta_button_text',
      title: 'Button Text',
      type: 'string',
      fieldset: 'cta',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'cta_button_link',
      title: 'Button Link',
      type: 'string',
      fieldset: 'cta',
      validation: (rule) => rule.required(),
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
