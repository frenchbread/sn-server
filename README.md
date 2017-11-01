# Social Notifier Server

> API server for [sn-app](https://github.com/frenchbread/sn-app)

## Configuration file & API keys

Place configuration to `src/config/index.js` that looks like this:

```js
export default {
  port: 8000,
  env: 'development',
  auth: {
    secret: '<jwt_secret>'
  },
  database: {
    local: 'mongodb://localhost/sn',
    prod: ''
  },
  telegram: {
    url: 'https://api.telegram.org/bot',
    token: '<telegram_bot_api_token>',
    parent: '<backup_telegram_userId>'
  },
  twitter: {
    consumer_key: '',
    consumer_secret: '',
    access_token_key: '',
    access_token_secret: ''
  },
  vk: {
    appId: 123123,
    appSecret: '',
    userLogin: '',
    userPassword: ''
  }
}
```

## Setup

> **Note:** SN-server requires MongoDB instance up and running.

```bash
# Install dependencies
$ yarn install

# Run in development
$ yarn run dev

# Build & Run for production
$ yarn run build
$ yarn run start
```

## TODO

- [ ] Add guide explaining how to obtain API keys for social services.

## LICENSE
[MIT](https://github.com/frenchbread/sn-server/blob/master/LICENSE.md)
