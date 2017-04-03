const request = require('request-promise')

let apiKey = process.env.apiKey

const pushbullet = {
  sendMessage
}

function sendMessage (deviceId = null, title, body, url, callback) {
  let options = {
    method: 'POST',
    uri: 'https://api.pushbullet.com/v2/pushes',
    form: {
      type: 'link',
      device_iden: deviceId,
      title,
      body,
      url
    },
    headers: {
      'Access-Token': apiKey
    }
  }

  return request(options)
    .then(function () {
      if (callback) { callback.apply(this, arguments) }
    })
}

module.exports = pushbullet
