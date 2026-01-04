const fs = require('fs')
const path = require('path')
const pool = require('../src/db')

async function run() {
  try {
    const sqlPath = path.join(__dirname, '..', 'migrations', 'schema.sql')
    const sql = fs.readFileSync(sqlPath, 'utf8')
    const stmts = sql
      .split(/;\s*(?:\r?\n|$)/)
      .map(s => s.trim())
      .filter(Boolean)

    for (const stmt of stmts) {
      try {
        await pool.query(stmt)
        console.log('OK:', stmt.split('\n')[0].slice(0, 80))
      } catch (err) {
        console.error('ERR:', err.code || err.message)
      }
    }

    await pool.end()
    console.log('Migrations finished')
    process.exit(0)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

run()
