import {defineType, defineField} from 'sanity'

export const bioType = defineType({
  name: 'bio',
  title: 'Bio Page',
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
      name: 'pro_bio',
      title: 'Professional Bio',
      options: {collapsible: true, collapsed: false},
    },
    {
      name: 'certs',
      title: 'Certifications',
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

    // LETTER
    defineField({
      name: 'letter',
      title: 'Letter',
      type: 'array',
      of: [{type: 'block'}],
      validation: (rule) => rule.required(),
    }),

    // SEPARATOR
    defineField({
      name: 'quote',
      title: 'Quote Separator',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    // PRO BIO
    defineField({
      name: 'bio_heading',
      title: 'Heading',
      description: 'length',
      type: 'string',
      fieldset: 'pro_bio',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'pro_bio',
      title: 'Bio',
      type: 'array',
      fieldset: 'pro_bio',
      of: [{type: 'block'}],
      validation: (rule) => rule.required(),
    }),

    // CERTS
    defineField({
      name: 'certs_heading',
      title: 'Heading',
      description: 'length',
      type: 'string',
      fieldset: 'certs',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'certs_pre',
      title: 'First body of text',
      description: 'This block of text will appear before the list of certifications',
      type: 'array',
      fieldset: 'certs',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'certifications',
      title: 'Certifications',
      type: 'array',
      fieldset: 'certs',
      of: [
        {
          type: 'object',
          name: 'certification',
          title: 'Certification',
          fields: [
            defineField({
              name: 'title',
              title: 'Title of Certification',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'What this means for you',
              type: 'array',
              of: [{type: 'block'}],
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'whatThisMeans',
            },
            prepare({title}) {
              return {
                title,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'certs_post',
      title: 'Second body of text',
      description: 'This block of text will appear after the list of certifications',
      type: 'array',
      fieldset: 'certs',
      of: [{type: 'block'}],
    }),
  ],

  preview: {
    select: {},
    prepare() {
      return {
        title: 'Bio Page',
      }
    },
  },
})
