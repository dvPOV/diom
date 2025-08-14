import {defineType, defineField} from 'sanity'
export default defineType({
  name: 'siteSettings',
  type: 'document',
  title: 'Site Settings',
  fields: [
    defineField({ name:'logo', type:'image', options:{hotspot:true} }),
    defineField({ name:'instagram', type:'url' }),
    defineField({ name:'phone', type:'string' }),
    defineField({ name:'email', type:'string' }),
    defineField({ name:'address', type:'string' }),
  ]
})
