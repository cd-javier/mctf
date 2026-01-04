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
})
