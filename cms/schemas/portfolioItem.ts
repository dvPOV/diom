import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'portfolioItem',
  title: 'Portfolio item',
  type: 'document',
  fields: [
    defineField({
      name: 'provider',
      title: 'Provider',
      type: 'string',
      options: {list: ['youtube', 'vimeo', 'instagram']}
    }),
    defineField({name: 'videoId', title: 'Video ID', type: 'string'}),
    defineField({name: 'title', title: 'Title', type: 'string'}),
    defineField({
      name: 'ratio',
      title: 'Aspect ratio (e.g. 3:4 for IG)',
      type: 'string'
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail (image, optional)',
      type: 'image'
    }),
    defineField({name: 'sortIndex', title: 'Sort index', type: 'number'})
  ],
  orderings: [{name: 'sortIndexAsc', by: [{field: 'sortIndex', direction: 'asc'}]}]
})