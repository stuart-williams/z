import { spawn } from 'child_process'
import { readConfig } from './utils'

export default async function cd (key) {
  const config = await readConfig()

  if (!config[key]) {
    console.log('Naaaah')
    process.exit(1)
  }

  const { path } = config[key]

  spawn('bash', ['-i'], {
    cwd: path,
    stdio: 'inherit'
  })
}
