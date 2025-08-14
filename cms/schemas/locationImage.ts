import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'locationImage',
  title: 'Location Item (vertical 9:16)',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string'}),
    defineField({name: 'ratio', title: 'Aspect ratio', type: 'string'}),
    defineField({name: 'image', title: 'Image (9:16)', type: 'image'}),
    defineField({name: 'sortIndex', title: 'Sort index', type: 'number'})
  ],
  orderings: [{name: 'sortIndexAsc', by: [{field: 'sortIndex', direction: 'asc'}]}]
})