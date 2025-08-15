// cms/sanity.config.ts
import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas' // ← ИМЕНОВАННЫЙ импорт

export default defineConfig({
  name: 'default',
  title: 'Diom CMS',
  projectId: 'og6hntl9',
  dataset: 'prod2025',
  plugins: [deskTool(), visionTool()],
  schema: {
    types: schemaTypes, // ← здесь используем schemaTypes
  },
})