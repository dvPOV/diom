import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'pricingCard',
  title: 'Pricing card',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'localeString', validation: r => r.required()}),
    defineField({name: 'price', title: 'Price label (string)', type: 'localeString', validation: r => r.required()}),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{type: 'localeString'}],
    }),
    defineField({name: 'order', title: 'Order', type: 'number'}),
  ],
  orderings: [
    {name: 'orderAsc', title: 'Order ↑', by: [{field: 'order', direction: 'asc'}]},
  ],
  preview: {
  select: {en: 'title.en', ru: 'title.ru', ka: 'title.ka', price: 'price'},
  prepare({en, ru, ka, price}) {
    return {title: `${en || ru || ka || 'Pricing'} — ${price || ''}`}
  },
},
})