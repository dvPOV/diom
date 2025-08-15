import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'localeText',
  title: 'Localized text',
  type: 'object',
  fields: [
    defineField({name: 'en', type: 'text', title: 'English'}),
    defineField({name: 'ru', type: 'text', title: 'Русский'}),
    defineField({name: 'ka', type: 'text', title: 'ქართული'}),
  ],
})

