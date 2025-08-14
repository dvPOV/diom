import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'vocalOffer',
  title: 'Vocal Offer',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string'}),
    defineField({name: 'description', title: 'Description', type: 'text'}),
    defineField({
      name: 'bullets',
      title: 'Bullets',
      type: 'array',
      of: [{type: 'string'}]
    }),
    defineField({name: 'priceNote', title: 'Price note', type: 'string'}),
    defineField({
      name: 'provider',
      title: 'Provider',
      type: 'string',
      options: {list: ['youtube', 'vimeo', 'instagram']}
    }),
    defineField({name: 'videoId', title: 'Video ID', type: 'string'}),
    defineField({name: 'ratio', title: 'Aspect ratio', type: 'string'})
  ]
})