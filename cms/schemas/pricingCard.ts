import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'pricingCard',
  title: 'Pricing Item',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string'}),
    defineField({name: 'price', title: 'Price', type: 'string'}),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{type: 'string'}]
    }),
    defineField({name: 'sortIndex', title: 'Sort index', type: 'number'})
  ],
  orderings: [{name: 'sortIndexAsc', by: [{field: 'sortIndex', direction: 'asc'}]}]
})