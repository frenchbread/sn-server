import Palm from 'palm'

import config from '../config'

export default new Palm({ talk: 'telegram', telegram: config.telegram })
