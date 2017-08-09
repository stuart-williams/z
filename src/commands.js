import { readConfig, writeConfig, isDir } from './utils'
import { basename } from 'path'
import { render as printTable } from 'termtable'
import { render } from 'mustache'

export async function add () {
  const config = await readConfig()
  const path = process.cwd()
  const key = basename(path)

  writeConfig({ ...config, [key]: { path } })
}

export async function remove (key) {
  const config = await readConfig()

  writeConfig({ ...config, [key]: undefined })
}

export async function alias ([ key ]) {
  const config = await readConfig()
  const path = process.cwd()

  if (!key) return console.log('Naaaah')

  writeConfig({ ...config, [key]: { path } })
}

export async function prune () {
  const config = await readConfig()
  const pruned = Object.keys(config).reduce((accum, key) =>
    isDir(config[key].path) ? accum : { ...accum, [key]: undefined }, config)

  writeConfig(pruned)
}

export async function ls () {
  const config = await readConfig()
  const rows = Object.keys(config).map((key) => ({ key, path: config[key].path }))
  const template = `
    <table>
      <tbody>
        {{#rows}}
        <tr>
          <td>{{key}}</td>
          <td>{{path}}</td>
        </tr>
        {{/rows}}
      </tbody>
    </table>
    `
  printTable(render(template, { rows }), {})
}
