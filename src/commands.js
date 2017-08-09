import { readConfig, writeConfig } from './utils'

export async function add () {
  const config = await readConfig()
  writeConfig({ ...config, [process.cwd()]: {} })
}

export function alias (args) {
  const [ alias ] = args

  if (!alias) {
    console.log(`Invalid alias`)
    process.exit(0)
  }

  console.log(process.cwd(), alias)
}
