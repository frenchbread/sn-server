import VKApi from 'node-vkapi'

import config from '../config'

const VK = new VKApi(config.vk)

VK.authorize()
  .then(res => console.log('vk auth ok'))
  .catch(err => console.error(err.message))

export default {
  getLastPost (domain) {
    return new Promise((resolve, reject) => {
      VK.call('wall.get', { domain, filter: 'owner' })
        .then(res => resolve(res.items))
        .catch(err => console.error('vk:err: ', err.message))
    })
  }
}
