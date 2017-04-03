const program = require('commander')
const gumtree = require('./gumtree')
const storage = require('./storage')

program
  .version('0.1.0')
  .option('-u, --url <url>', 'Specify Gumtree url (in full format with all parameters etc')
  .parse(process.argv)

if (!program.url) {
  program.help()
}

gumtree.getOffers(program.url)
  .then(data => {
    if (process.env.apiKey) {
      console.log(storage.test())
      // todo
    } else {
      console.log(data)
    }
  })
  .then(() => process.exit())
