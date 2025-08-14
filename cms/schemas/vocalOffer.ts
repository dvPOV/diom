import {defineType, defineField} from 'sanity'
export default defineType({
  name: 'vocalOffer',
  type: 'document',
  title: 'Vocal Offer',
  fields: [
    defineField({
      name:'title', type:'object',
      fields:[{name:'ru',type:'string'},{name:'en',type:'string'},{name:'ka',type:'string'}]
    }),
    defineField({
      name:'text', type:'object',
      fields:[{name:'ru',type:'text'},{name:'en',type:'text'},{name:'ka',type:'text'}]
    }),
    defineField({
      name:'bullets', type:'object',
      fields:[
        {name:'ru', type:'array', of:[{type:'string'}]},
        {name:'en', type:'array', of:[{type:'string'}]},
        {name:'ka', type:'array', of:[{type:'string'}]},
      ]
    }),
    defineField({
      name:'priceNote', type:'object',
      fields:[{name:'ru',type:'string'},{name:'en',type:'string'},{name:'ka',type:'string'}]
    }),
  ]
})
