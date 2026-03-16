import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '7bbik5p3',
    dataset: 'production',
  },
  deployment: {
    appId: 'ifn0exeiz2zimvw4aqj40n69',
    autoUpdates: true,
  },
  typegen: {
    path: '../src/lib/loaders.ts',
    schema: 'schema.json',
    generates: '../src/lib/sanity.types.ts',
  },
})