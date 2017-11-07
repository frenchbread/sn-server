import Palm from 'palm'

import config from '../config'

export const twitterPalm = new Palm({
  talk: 'telegram',
  telegram: {
    url: config.telegram.url,
    token: config.telegram.socials.twitter_token
  }
})

export const instagramPalm = new Palm({
  talk: 'telegram',
  telegram: {
    url: config.telegram.url,
    token: config.telegram.socials.instagram_token
  }
})

export const vkPalm = new Palm({
  talk: 'telegram',
  telegram: {
    url: config.telegram.url,
    token: config.telegram.socials.vk_token
  }
})

export const youtubePalm = new Palm({
  talk: 'telegram',
  telegram: {
    url: config.telegram.url,
    token: config.telegram.socials.youtube_token
  }
})
