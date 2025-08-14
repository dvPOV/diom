import {defineType, defineField} from 'sanity'
export default defineType({
  name: 'hero',
  type: 'document',
  title: 'Hero',
  fields: [
    defineField({ name:'videoKind', type:'string', options:{ list:['youtube','vimeo'] } }),
    defineField({ name:'videoId', type:'string' }),
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
      name:'text',
      type:'object',
      fields:[
        {name:'ru', type:'text'},
        {name:'en', type:'text'},
        {name:'ka', type:'text'},
      ]
    })
  ]
})
