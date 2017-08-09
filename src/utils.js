import fs from 'fs'
import path from 'path'
import promisify from 'q6/promisify'

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

const configPath = path.resolve(__dirname, '../.zconfig.json')

export async function readConfig () {
  try {
    return JSON.parse(await readFile(configPath, 'utf8'))
  } catch (e) {
    return {}
  }
}

export async function writeConfig (config) {
  try {
    return await writeFile(configPath, JSON.stringify(config, null, 2), 'utf8')
  } catch (e) {}
}

export function isDir (path) {
  try {
    return fs.lstatSync(path).isDirectory()
  } catch (e) {
    return false
  }
}
