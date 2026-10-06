// Turn Vite's one JS chunk and CSS asset into a portable offline HTML file.
import { readFile, writeFile } from 'node:fs/promises'
import { resolve, dirname, relative as relativePath, isAbsolute } from 'node:path'
import { fileURLToPath } from 'node:url'

const dist = resolve(dirname(fileURLToPath(import.meta.url)), '../dist')
const index = resolve(dist, 'index.html')
let html = await readFile(index, 'utf8')

function localAsset(url) {
  const relative = url.replace(/^\.\//, '').replace(/^\//, '')
  const absolute = resolve(dist, relative)
  const displacement = relativePath(dist, absolute)
  if (displacement.startsWith('..') || isAbsolute(displacement)) throw new Error(`Unexpected asset path: ${url}`)
  return absolute
}

const scripts = [...html.matchAll(/<script\b[^>]*\bsrc="([^"]+\.js)"[^>]*><\/script>/g)]
const styles = [...html.matchAll(/<link\b[^>]*\brel="stylesheet"[^>]*>/g)]
if (scripts.length !== 1 || styles.length !== 1) {
  throw new Error(`Expected one script and one stylesheet; got ${scripts.length} and ${styles.length}`)
}

const script = await readFile(localAsset(scripts[0][1]), 'utf8')
const cssUrl = styles[0][0].match(/\bhref="([^"]+\.css)"/)
if (!cssUrl) throw new Error('Stylesheet URL missing')
const css = await readFile(localAsset(cssUrl[1]), 'utf8')
html = html.replace(scripts[0][0], () => `<script type="module">${script.replace(/<\/script/gi, '<\\/script')}</script>`)
html = html.replace(styles[0][0], () => `<style>${css.replace(/<\/style/gi, '<\\/style')}</style>`)
const shell = html.replace(/<script type="module">[\s\S]*?<\/script>/, '').replace(/<style>[\s\S]*?<\/style>/, '')
if (/<script\b[^>]*\bsrc=/.test(shell) || /<link\b[^>]*\brel="stylesheet"/.test(shell)) {
  throw new Error('External application assets remain')
}
// Use consistent line endings in the portable artifact on Windows and Unix.
await writeFile(index, html.replace(/\r\n?/g, '\n'))
console.log(`Portable offline build: ${index}`)
