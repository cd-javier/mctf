import {defineField, defineType} from 'sanity'

export const homepageType = defineType({
  name: 'homepage',
  title: 'Homepage',
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
      name: 'wbh',
      title: 'The Wellbeing Hypocrite Club',
      options: {collapsible: true, collapsed: false},
    },
    {
      name: 'bio',
      title: 'Bio Snippet',
      options: {collapsible: true, collapsed: false},
    },
    {
      name: 'testimonials',
      title: 'Testimonials',
      options: {collapsible: true, collapsed: false},
    },
    {
      name: 'collabs',
      title: 'Collaborations',
      options: {collapsible: true, collapsed: false},
    },
    {
      name: 'services',
      title: 'Services',
      options: {collapsible: true, collapsed: false},
    },
  ],

  fields: [
    //HERO
    defineField({
      name: 'hero_heading',
      title: 'Heading',
      description: 'length',
      type: 'string',
      fieldset: 'hero',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'hero_subheading',
      title: 'Subheading',
      description: 'length',
      type: 'string',
      fieldset: 'hero',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'hero_cta',
      title: 'Call To Action',
      description: 'The button will link to the services page',
      type: 'string',
      fieldset: 'hero',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'hero_image',
      title: 'Image',
      description: 'dimensions',
      type: 'image',
      fieldset: 'hero',
      validation: (rule) => rule.required(),
    }),

    //WBH
    defineField({
      name: 'show_WBH_hero',
      type: 'boolean',
      fieldset: 'wbh',
    }),
    defineField({
      name: 'WBH_subheading',
      title: 'Subheading',
      description: 'length',
      type: 'string',
      fieldset: 'wbh',
      hidden: ({parent}) => !parent?.show_WBH_hero,
      validation: (rule) =>
        rule.custom((value, context) => {
          if (context.parent?.show_WBH_hero && !value) {
            return 'Required when WBH Hero is enabled'
          }
          return true
        }),
    }),
    defineField({
      name: 'WBH_CTA',
      title: 'Call To Action',
      description: 'The button will link to the WBH website',
      type: 'string',
      fieldset: 'wbh',
      hidden: ({parent}) => !parent?.show_WBH_hero,
      validation: (rule) =>
        rule.custom((value, context) => {
          if (context.parent?.show_WBH_hero && !value) {
            return 'Required when WBH Hero is enabled'
          }
          return true
        }),
    }),

    // BIO SNIPPET
    defineField({
      name: 'bio_heading',
      title: 'Bio Heading',
      description: 'length',
      type: 'string',
      fieldset: 'bio',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'bio_snippet',
      title: 'Snippet',
      description: 'length',
      type: 'array',
      fieldset: 'bio',
      of: [{type: 'block'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'bio_CTA',
      title: 'Call To Action',
      description: 'The button wil link to the "About me" page',
      type: 'string',
      fieldset: 'bio',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'bio_image',
      description: 'dimensions',
      type: 'image',
      fieldset: 'bio',
      validation: (rule) => rule.required(),
    }),

    // TESTIMONIALS
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      fieldset: 'testimonials',
      validation: (rule) => rule.required(),
      of: [
        {
          type: 'object',
          name: 'testimonial',
          title: 'Testimonial',
          fields: [
            defineField({
              name: 'quote',
              title: 'Quote',
              type: 'text',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'person',
              title: 'Person',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'person',
              subtitle: 'quote',
            },
            prepare({title, subtitle}) {
              return {
                title,
                subtitle: subtitle?.slice(0, 60) + (subtitle?.length > 60 ? '…' : ''),
              }
            },
          },
        },
      ],
    }),

    // COLLABORATIONS
    defineField({
      name: 'collaborations',
      title: 'Collaborations',
      type: 'array',
      fieldset: 'collabs',
      of: [
        {
          type: 'object',
          name: 'collaboration',
          title: 'Collaboration',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'subtitle',
              title: 'Subtitle',
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
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  {title: 'Spotify', value: 'spotify'},
                  {title: 'YouTube', value: 'youtube'},
                  {title: 'Instagram', value: 'instagram'},
                ],
                layout: 'radio', // or 'dropdown'
              },
              validation: (rule) => rule.required(),
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

    // SERVICES
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      fieldset: 'services',
      validation: (rule) => rule.length(3).error('You must provide exactly 3 services.'),
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
              name: 'body',
              title: 'Body',
              type: 'text',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'cta',
              title: 'CTA',
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
          ],
          preview: {
            select: {
              title: 'title',
              media: 'image',
            },
          },
        },
      ],
    }),
  ],

  preview: {
    select: {},
    prepare() {
      return {
        title: 'Homepage',
      }
    },
  },
})
