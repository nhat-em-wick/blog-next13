import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'tag',
  title: 'Tag',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text'
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{ type: 'string', name: 'keyword' }]
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: Rule => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96
      },
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'string'
    }),
    defineField({
      name: 'json_ld',
      title: 'JSON-LD',
      type: 'code',
      options: {
        language: 'JSON',
        languageAlternatives: [
          { title: 'JSON', value: 'json' },
        ],
      },
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      options: {
        hotspot: true
      },
    })
  ]
})
