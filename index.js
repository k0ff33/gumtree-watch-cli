const program = require('commander')
const gumtree = require('./gumtree')
const db = require('./db')
const pushbullet = require('./transport/pushbullet')

program
  .version('0.1.0')
  .option('-u, --url <url>', 'Specify Gumtree url (in full format with all parameters etc')
  .parse(process.argv)

if (!program.url) {
  program.help()
}

gumtree.getOffers(program.url)
  .then(data => db.compareData(data, program.url))
  .then(diff => {
    let promises = []
    if (diff && diff.length > 0) {
      for (let deal of diff) {
        console.log(deal)
        promises.push(pushbullet.sendMessage(process.env.deviceId, 'Gumtree Alert', `(${deal.price}) ${deal.name}`, deal.url))
      }
    }
    return promises
  })
  .then(promises => Promise.all(promises))
  .then(() => process.exit())
  .catch(console.error)
