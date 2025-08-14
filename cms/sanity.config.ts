import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import schemas from './schemas'

export default defineConfig({
  name: 'default',
  title: 'Diom CMS',
  projectId: 'og6hntl9', // замените после инициализации
  dataset: 'production',
  plugins: [deskTool(), visionTool()],
  schema: { types: schemas }
})
