import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'locationImage',
  title: 'Location image',
  type: 'document',
  fields: [
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: {hotspot: true},
      validation: r => r.required(),
    }),
    defineField({name: 'order', title: 'Order', type: 'number'}),
  ],
  orderings: [
    {name: 'orderAsc', title: 'Order ↑', by: [{field: 'order', direction: 'asc'}]},
  ],
    preview: {
      select: {en: 'title.en', ru: 'title.ru', ka: 'title.ka'},
      prepare({en, ru, ka}) {
        return {title: en || ru || ka || 'Location item'}
    },
  },
})