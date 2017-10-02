import axios from 'axios'

import config from '../config'

export default {
  checkForNewMedia () {
    let url = 'https://api.instagram.com/v1/subscriptions'
    url += `?client_id=${config.instagram.client_id}&`
    url += `client_secret=${config.instagram.client_secret}&`
    url += `object=frbrr&`
    url += `aspect=media&`
    url += `verify_token=${config.instagram.token}&`
    url += `callback_url=https://gttdn.io:3031/subs`

    axios.get(url)
      .then(res => console.log(res.data))
      .catch(err => console.error(err))
  }
}
