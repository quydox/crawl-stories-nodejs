import { exec } from 'child_process'

const runShellCommand = async (cmd) => {
  return new Promise((resolve, reject) => {
    try {
      exec(cmd, (err, stdout, stderr) => {
        if (err) {
          resolve(stdout)
        } else {
          resolve(stdout.trim())
        }
      })
    } catch (e) {
      resolve(false)
    }
  })
}

module.exports = {
  runShellCommand
}
