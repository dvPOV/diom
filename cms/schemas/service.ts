import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string'}),
    defineField({
      name: 'bullets',
      title: 'Bullets',
      type: 'array',
      of: [{type: 'string'}]
    }),
    defineField({name: 'sortIndex', title: 'Sort index', type: 'number'})
  ],
  orderings: [{name: 'sortIndexAsc', by: [{field: 'sortIndex', direction: 'asc'}]}]
})