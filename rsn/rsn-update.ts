import { readFiles, computeDiffs, writeToFile } from './rsnUtil'
<<<<<<< HEAD
import colors from '../lib/colors'
=======
import colors from 'colors/safe'
>>>>>>> main

const keys = readFiles()
computeDiffs(keys)
  .then(data => {
    writeToFile(data)
    console.log(`${colors.bold('All file diffs have been locked!')} Commit changed cache.json to git.`)
  })
  .catch(err => {
    console.log(err)
    process.exitCode = 1
  })
