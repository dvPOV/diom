import {defineType, defineField} from 'sanity'
export default defineType({
  name: 'portfolioItem',
  type: 'document',
  title: 'Portfolio item',
  fields: [
    defineField({ name:'order', type:'number' }),
    defineField({ name:'kind', type:'string', options:{ list:['youtube','instagram'] } }),
    defineField({ name:'videoId', type:'string', validation: r=>r.required() }),
    defineField({
      name:'title',
      title:'Title (i18n)',
      type:'object',
      fields:[
        {name:'ru', type:'string'},
        {name:'en', type:'string'},
        {name:'ka', type:'string'},
      ]
    }),
  ]
})
