import {defineType, defineField} from 'sanity'

const otherLinks = defineField({
  name: 'other_link',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      description: '1600x400px',
      type: 'image',
      options: {hotspot: true},
    }),
  ],
})

export const linksType = defineType({
  name: 'links',
  title: 'Links',
  type: 'document',
  options: {
    singleton: true,
  },

  fields: [
    defineField({
      name: 'profile_photo',
      description: 'Min 400x400px',
      title: 'Profile Photo',
      type: 'image',
      options: {hotspot: true},
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'other_links',
      type: 'array',
      of: [otherLinks],
    }),
  ],

  preview: {
    select: {},
    prepare() {
      return {
        title: 'Links',
      }
    },
  },
})
