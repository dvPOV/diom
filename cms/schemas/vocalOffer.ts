import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'vocalOffer',
  title: 'Vocal offer',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'localeString'}),
    defineField({name: 'paragraph', title: 'Paragraph', type: 'localeText'}),
    defineField({
      name: 'bullets',
      title: 'Bullets',
      type: 'array',
      of: [{type: 'localeString'}],
    }),
    defineField({name: 'cta1', title: 'CTA #1', type: 'localeString'}),
    defineField({name: 'cta2', title: 'CTA #2', type: 'localeString'}),
    defineField({name: 'priceNote', title: 'Price note', type: 'localeText'}),
    defineField({name: 'instagramId', title: 'Instagram Post ID', type: 'string'}),
  ],
    preview: {
      select: {en: 'title.en', ru: 'title.ru', ka: 'title.ka'},
      prepare({en, ru, ka}) {
        return {title: en || ru || ka || 'Service item'}
    },
  },
})