import fs from 'fs'
import promisify from 'q6/promisify'

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

const configPath = '.zconfig.json'

export async function readConfig () {
  try {
    return JSON.parse(await readFile(configPath, 'utf8'))
  } catch (e) {
    console.log(e)
  }
}

export async function writeConfig (contents) {
  try {
    return await writeFile(configPath, JSON.stringify(contents, null, 2), 'utf8')
  } catch (e) {
    console.log(e)
  }
}
