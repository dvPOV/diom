import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'service',
  title: 'Service item',
  
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'localeString', validation: r => r.required()}),
    defineField({
      name: 'bullets',
      title: 'Bullets',
      type: 'array',
      of: [{type: 'localeString'}],
    }),
    defineField({name: 'order', title: 'Order', type: 'number'}),
  ],
  orderings: [
    {name: 'orderAsc', title: 'Order ↑', by: [{field: 'order', direction: 'asc'}]},
  ],
  preview: {
    select: {en: 'title.en', ru: 'title.ru', ka: 'title.ka'},
    prepare({en, ru, ka}) {
      return {title: en || ru || ka || 'Service item'}
  },
},
})