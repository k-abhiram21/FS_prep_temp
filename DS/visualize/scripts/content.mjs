import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
const script = fileURLToPath(new URL('./build_content.py', import.meta.url))
let found = false
for (const command of [...new Set([process.env.PYTHON, 'python3', 'python'].filter(Boolean))]) {
  const probe = spawnSync(command, ['--version'], { encoding: 'utf8', windowsHide: true })
  if (probe.error || probe.status !== 0) continue
  found = true
  const result = spawnSync(command, ['-X', 'utf8', script], { stdio: 'inherit', windowsHide: true })
  if (result.error) throw result.error
  process.exit(result.status ?? 1)
}
if (!found) throw new Error('Python 3 is required. Set PYTHON to its executable path if necessary.')
