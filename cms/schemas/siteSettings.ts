import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {hotspot: true},
    }),

    defineField({
      name: 'nav',
      title: 'Navigation (texts)',
      type: 'object',
      fields: [
        defineField({name: 'services', title: 'Services', type: 'localeString', validation: (Rule) => Rule.required()}),
        defineField({name: 'work', title: 'Portfolio', type: 'localeString', validation: (Rule) => Rule.required()}),
        defineField({name: 'pricing', title: 'Pricing', type: 'localeString', validation: (Rule) => Rule.required()}),
        defineField({name: 'location', title: 'Location', type: 'localeString', validation: (Rule) => Rule.required()}),
        defineField({name: 'contact', title: 'Contacts', type: 'localeString', validation: (Rule) => Rule.required()}),
        defineField({name: 'book', title: 'Book', type: 'localeString', validation: (Rule) => Rule.required()}),
      ],
    }),

    defineField({name: 'phone', title: 'Phone', type: 'string'}),
    defineField({name: 'email', title: 'Email', type: 'string'}),
    defineField({name: 'instagram', title: 'Instagram URL', type: 'url'}),
    defineField({name: 'address', title: 'Address', type: 'localeString'}),

    // Подпись над портфолио и над тарифами (ранее просили вынести в CMS)
    defineField({name: 'portfolioLead', title: 'Portfolio lead', type: 'localeString'}),
    defineField({name: 'pricingLead', title: 'Pricing lead', type: 'localeString'}),

    // Тексты формы связи (вместо legacy ui.*)
    defineField({
      name: 'form',
      title: 'Contact form texts',
      type: 'object',
      fields: [
        defineField({name: 'nameLabel', title: 'Name label', type: 'localeString', validation: (Rule) => Rule.required()}),
        defineField({name: 'phoneLabel', title: 'Phone label', type: 'localeString', validation: (Rule) => Rule.required()}),
        defineField({name: 'interestLabel', title: 'Interest label', type: 'localeString', validation: (Rule) => Rule.required()}),
        defineField({name: 'messageLabel', title: 'Message label', type: 'localeString', validation: (Rule) => Rule.required()}),
        defineField({name: 'submitLabel', title: 'Submit button', type: 'localeString', validation: (Rule) => Rule.required()}),
        defineField({
          name: 'interestOptions',
          title: 'Interest options',
          type: 'array',
          of: [
            defineType({
              name: 'interestOption',
              title: 'Interest option',
              type: 'object',
              fields: [
                defineField({name: 'key', title: 'Key', type: 'string', validation: (Rule) => Rule.required()}),
                defineField({name: 'label', title: 'Label', type: 'localeString', validation: (Rule) => Rule.required()}),
              ],
              preview: {
                select: {en: 'label.en', ru: 'label.ru', ka: 'label.ka'},
                prepare(sel: any) {
                  const {en, ru, ka} = sel || {}
                  return {title: en || ru || ka || 'Option'}
                },
              },
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {prepare: () => ({title: 'Site Settings'})},
})