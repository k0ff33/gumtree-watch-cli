const Datastore = require('nedb-promise')
var _ = require('lodash')

const db = new Datastore({
  filename: 'storage.db',
  autoload: true
})
db.ensureIndex({ fieldName: 'url', unique: true })

function compareData (data, url) {
  return db.findOne({url})
  .then(obj => {
    if (obj) {
      let diff = _.differenceWith(data, obj.data, compareOffer)

      if (diff && diff.length > 0) {
        return db.update({ url }, { $set: { data } })
        .then(() => diff)
      } else {
        console.log('No new listings')
        return null
      }
    } else {
      console.log('First run: data cached')
      return db.insert({url, data})
    }
  })
  .catch(console.error)
}

function compareOffer (a, b) {
  return a.link === b.link && a.name === b.name && a.price === b.price
}

module.exports = {
  compareData
}
