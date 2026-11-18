/*
 * Copyright (c) 2014-2026 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import config from 'config'
import * as utils from '../utils'
<<<<<<< HEAD
=======
// @ts-expect-error FIXME due to non-existing type definitions for replace
import replace from 'replace'
>>>>>>> main

const customizeEasterEgg = async () => {
  if (config.has('application.easterEggPlanet.overlayMap')) {
    let overlay: string = config.get('application.easterEggPlanet.overlayMap')
    if (utils.isUrl(overlay)) {
      const overlayPath = overlay
      overlay = utils.extractFilename(overlay)
      await utils.downloadToFile(overlayPath, 'frontend/dist/frontend/assets/private/' + overlay)
    }
    replaceImagePath(overlay)
  }
  if (config.has('application.easterEggPlanet.name')) {
    replaceThreeJsTitleTag()
  }
}

const replaceImagePath = (overlay: string) => {
  const textureDeclaration = 'orangeTexture = THREE.ImageUtils.loadTexture("/assets/private/' + overlay + '");'
<<<<<<< HEAD
  utils.replaceInFile('frontend/dist/frontend/assets/private/threejs-demo.html', /orangeTexture = .*;/, textureDeclaration)
=======
  replace({
    regex: /orangeTexture = .*;/,
    replacement: textureDeclaration,
    paths: ['frontend/dist/frontend/assets/private/threejs-demo.html'],
    recursive: false,
    silent: true
  })
>>>>>>> main
}

const replaceThreeJsTitleTag = () => {
  const threeJsTitleTag = '<title>Welcome to Planet ' + config.get<string>('application.easterEggPlanet.name') + '</title>'
<<<<<<< HEAD
  utils.replaceInFile('frontend/dist/frontend/assets/private/threejs-demo.html', /<title>.*<\/title>/, threeJsTitleTag)
=======
  replace({
    regex: /<title>.*<\/title>/,
    replacement: threeJsTitleTag,
    paths: ['frontend/dist/frontend/assets/private/threejs-demo.html'],
    recursive: false,
    silent: true
  })
>>>>>>> main
}

export default customizeEasterEgg
