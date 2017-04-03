let json

try {
  json = require('../storage.json')
} catch (e) {
  json = []
}

let storage = {
  test
}

function test () {
  return json
}

module.exports = storage
