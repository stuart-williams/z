import { spawn } from 'child_process'
import { readConfig } from './utils'

export default async function cd (key) {
  const config = await readConfig()

  if (!config[key]) process.exit()

  spawn('bash', ['-i'], {
    cwd: config[key].path,
    stdio: 'inherit'
  })
}
