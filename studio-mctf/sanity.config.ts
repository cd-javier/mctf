import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import { singletonTools } from 'sanity-plugin-singleton-management'

export default defineConfig({
  name: 'default',
  title: 'mctf',

  projectId: '7bbik5p3',
  dataset: 'production',

  plugins: [structureTool(), visionTool(), singletonTools()],

  schema: {
    types: schemaTypes,
  },
})
