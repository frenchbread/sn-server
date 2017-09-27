import test from 'ava'
import axios from 'axios'
import cheerio from 'cheerio'

import config from './lib/config'

import intexModel from './lib/models'

function getPageAsElement (url) {
  return axios.get(url)
    .then(res => cheerio.load(res.data))
    .catch(err => {
      if (err.response.status === 404) {
        return cheerio.load(err.response.data)
      }
      return err
    })
}

// OK pages (200)
test('Page text is correct', async t => {
  const $ = await getPageAsElement(`${config.host}:${config.port}/`)

  t.is($('title').text(), intexModel().title)
  t.is($('h1').text(), intexModel().header)
  t.is($('p').text(), intexModel().description)
})

// Error pages (404)
test('404 page has correct text', async t => {
  const $ = await getPageAsElement(`${config.host}:${config.port}/random-page`)

  t.is($('title').text(), 'Not Found')
  t.is($('h1').text(), 'Not Found')
})
