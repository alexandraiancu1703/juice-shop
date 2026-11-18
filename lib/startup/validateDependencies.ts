/*
 * Copyright (c) 2014-2026 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

<<<<<<< HEAD
import path from 'node:path'
import { readFile } from 'node:fs/promises'
import semver from 'semver'
import colors from '../colors'
import * as utils from '../utils'
import logger from '../logger'

const findDependencyErrors = async (packageDir: string) => {
  const errors: string[] = []
  const { dependencies = {} } = JSON.parse(await readFile(path.join(packageDir, 'package.json'), 'utf8'))
  for (const [name, range] of Object.entries<string>(dependencies)) {
    let installedVersion: string
    try {
      installedVersion = JSON.parse(await readFile(path.join(packageDir, 'node_modules', name, 'package.json'), 'utf8')).version
    } catch {
      errors.push(`${name}: not installed!`)
      continue
    }
    if (semver.validRange(range) && !semver.satisfies(installedVersion, range, { includePrerelease: true })) {
      errors.push(`${name}: installed: ${installedVersion}, expected: ${range}`)
    }
  }
  return errors
}

const validateDependencies = async ({ packageDir = '.' } = {}) => {
  let errors: string[]
  try {
    errors = await findDependencyErrors(packageDir)
  } catch (err) {
    logger.warn(`Dependencies in ${colors.bold(packageDir + '/package.json')} could not be checked due to "${utils.getErrorMessage(err)}" error (${colors.red('ERROR')})`)
    logger.warn(`Dependencies in ${colors.bold(packageDir + '/package.json')} are not rightly satisfied (${colors.red('ERROR')})`)
    return false
  }

  if (errors.length === 0) {
=======
import colors from 'colors/safe'
import * as utils from '../utils'
import logger from '../logger'
// @ts-expect-error FIXME due to non-existing type definitions for check-dependencies
import dependencyChecker from 'check-dependencies'

const validateDependencies = async ({ packageDir = '.' } = {}) => {
  let dependencies: any = {}
  try {
    dependencies = await dependencyChecker({ packageDir, scopeList: ['dependencies'] })
  } catch (err) {
    logger.warn(`Dependencies in ${colors.bold(packageDir + '/package.json')} could not be checked due to "${utils.getErrorMessage(err)}" error (${colors.red('ERROR')})`)
  }

  if (dependencies.depsWereOk === true) {
>>>>>>> main
    logger.info(`All dependencies in ${colors.bold(packageDir + '/package.json')} are satisfied (${colors.green('SUCCESS')})`)
    return true
  } else {
    logger.warn(`Dependencies in ${colors.bold(packageDir + '/package.json')} are not rightly satisfied (${colors.red('ERROR')})`)
<<<<<<< HEAD
    for (const err of errors) {
=======
    for (const err of dependencies.error) {
>>>>>>> main
      logger.warn(err)
    }
    return false
  }
}

export default validateDependencies
