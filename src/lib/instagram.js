import instagramApi from 'instagram-node'

import config from '../config'

const ig = instagramApi.instagram()

ig.use(config.instagram)

export default ig
