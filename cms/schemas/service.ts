import {defineType, defineField} from 'sanity'
export default defineType({
  name: 'service',
  type: 'document',
  title: 'Service',
  fields: [
    defineField({ name:'order', type:'number' }),
    defineField({
      name:'title',
      type:'object',
      fields:[
        {name:'ru', type:'string'},
        {name:'en', type:'string'},
        {name:'ka', type:'string'},
      ]
    }),
    defineField({
      name:'bullets',
      type:'object',
      fields:[
        {name:'ru', type:'array', of:[{type:'string'}]},
        {name:'en', type:'array', of:[{type:'string'}]},
        {name:'ka', type:'array', of:[{type:'string'}]},
      ]
    }),
  ]
})
