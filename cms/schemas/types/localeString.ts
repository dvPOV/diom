import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'localeString',
  title: 'Localized string',
  type: 'object',
  fields: [
    defineField({name: 'en', type: 'string', title: 'English'}),
    defineField({name: 'ru', type: 'string', title: 'Русский'}),
    defineField({name: 'ka', type: 'string', title: 'ქართული'}),
  ],
})

