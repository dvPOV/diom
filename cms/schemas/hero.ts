import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string'}),
    defineField({name: 'subtitle', title: 'Subtitle', type: 'text'}),
    defineField({
      name: 'provider',
      title: 'Provider',
      type: 'string',
      options: {list: ['youtube', 'vimeo', 'instagram']}
    }),
    defineField({name: 'videoId', title: 'Video ID', type: 'string'}),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail (image, optional)',
      type: 'image'
    }),
    defineField({
      name: 'badges',
      title: 'Badges',
      type: 'array',
      of: [{type: 'string'}]
    })
  ]
})