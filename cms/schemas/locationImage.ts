import {defineType, defineField} from 'sanity'
export default defineType({
  name: 'locationImage',
  type: 'document',
  title: 'Location image',
  fields: [
    defineField({ name:'order', type:'number' }),
    defineField({ name:'image', type:'image', options:{hotspot:true}, validation:r=>r.required() }),
    defineField({
      name:'alt',
      title:'Alt (i18n)',
      type:'object',
      fields:[
        {name:'ru', type:'string'},
        {name:'en', type:'string'},
        {name:'ka', type:'string'},
      ]
    }),
  ]
})
