import { defineType, defineField } from 'sanity'

export default defineType({
  title: 'Post',
  name: 'post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
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
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: { type: 'author' }
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      validation: Rule => Rule.required(),
      options: {
        hotspot: true
      },

    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'tag' } }]
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent'
    })
  ]
})
