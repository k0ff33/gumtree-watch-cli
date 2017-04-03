const program = require('commander')
const gumtree = require('./gumtree')

program
  .version('0.1.0')
  .option('-u, --url <url>', 'Specify Gumtree url (in full format with all parameters etc')
  .parse(process.argv)

if (!program.url) {
  program.help()
}

if (process.env.apiKey) {
  
} else {
  gumtree.getOffers(program.url)
    .then(console.log)
}
