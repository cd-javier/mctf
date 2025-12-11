import {defineType, defineField} from 'sanity'

const social = defineField({
  name: 'social_link',
  title: 'Social Link',
  type: 'object',
  fields: [
    defineField({
      name: 'enabled',
      title: 'Enabled',
      type: 'boolean',
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (rule) =>
        rule.required().uri({
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: [
          {title: 'Instagram', value: 'instagram'},
          {title: 'LinkedIn', value: 'linkedin'},
          {title: 'TikTok', value: 'tiktok'},
          {title: 'YouTube', value: 'youtube'},
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'platform',
      enabled: 'enabled',
      url: 'url',
    },
    prepare({title, enabled, url}) {
      return {
        title: title ? title : 'Social Link',
        subtitle: enabled ? url : 'Disabled',
      }
    },
  },
})

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
      name: 'description',
      title: 'Description',
      type: 'string',
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
      description: 'dimensions',
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

  fieldsets: [
    {
      name: 'social',
      title: 'Social Links',
    },
  ],

  fields: [
    defineField({
      name: 'social_links',
      type: 'array',
      of: [social],
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
