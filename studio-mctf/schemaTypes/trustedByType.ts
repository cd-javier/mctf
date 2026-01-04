import {defineType, defineField} from 'sanity'

export const trustedByType = defineType({
  name: 'trusted_by',
  title: 'Trusted By',
  type: 'document',
  options: {
    singleton: true,
  },

  fields: [
    defineField({
      name: 'companies',
      title: 'companies',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'company',
          title: 'company',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'Image',
              description: 'dimensions',
              type: 'image',
              validation: (rule) => rule.required(),
            }),
          ],
        },
      ],
    }),
  ],

  preview: {
    select: {},
    prepare() {
      return {
        title: 'Trusted By',
      }
    },
  },
})
