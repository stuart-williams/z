import { readConfig, writeConfig, isDir } from './utils'
import { basename } from 'path'
import { render as printTable } from 'termtable'
import { render } from 'mustache'

export async function add ([ key ]) {
  const config = await readConfig()
  const path = process.cwd()
  const confKey = key || basename(path)

  writeConfig({ ...config, [confKey]: { path } })
}

export async function rm ([ key ]) {
  const config = await readConfig()
  const path = process.cwd()
  const confKey = key || basename(path)

  writeConfig({ ...config, [confKey]: undefined })
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
