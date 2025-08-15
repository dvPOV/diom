import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'portfolioitem',
  title: 'Portfolio item',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'localeString'}),
    defineField({
      name: 'kind',
      title: 'Kind',
      type: 'string',
      options: {list: [
        {title: 'YouTube', value: 'youtube'},
        {title: 'Instagram', value: 'instagram'},
      ]},
      validation: r => r.required(),
    }),
    defineField({name: 'videoId', title: 'Video ID', type: 'string', validation: r => r.required()}),
    defineField({
      name: 'ratio',
      title: 'Ratio',
      type: 'string',
      options: {list: [
        {title: '16:9', value: '16:9'},
        {title: '3:4', value: '3:4'},
      ]},
    }),
    defineField({name: 'order', title: 'Order', type: 'number'}),
  ],
  orderings: [
    {name: 'orderAsc', title: 'Order ↑', by: [{field: 'order', direction: 'asc'}]},
  ],
  preview: {
    select: {en: 'title.en', ru: 'title.ru', ka: 'title.ka'},
    prepare({en, ru, ka}) {
      return {title: en || ru || ka || 'Portfolio item'}
  },
},
})