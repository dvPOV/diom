import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero',
  type: 'document',
  fields: [
    defineField({name: 'badge', title: 'Badge', type: 'localeString'}),
    defineField({name: 'h1a', title: 'H1 part A', type: 'localeString'}),
    defineField({name: 'h1b', title: 'H1 part B (accent)', type: 'localeString'}),
    defineField({name: 'h1c', title: 'H1 part C', type: 'localeString'}),
    defineField({name: 'paragraph', title: 'Paragraph', type: 'localeText'}),
    defineField({name: 'b1', title: 'Bullet #1', type: 'localeString'}),
    defineField({name: 'b2', title: 'Bullet #2', type: 'localeString'}),
    defineField({name: 'b3', title: 'Bullet #3', type: 'localeString'}),
    defineField({name: 'youtubeId', title: 'YouTube video ID', type: 'string', validation: r => r.required()}),
  ],
    preview: {
      select: {en: 'title.en', ru: 'title.ru', ka: 'title.ka'},
      prepare({en, ru, ka}) {
        return {title: en || ru || ka || 'Hero section'}
    },
  },
})