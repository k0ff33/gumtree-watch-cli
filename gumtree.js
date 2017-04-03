const request = require('request-promise')
const cheerio = require('cheerio')

let gumtree = {
  getOffers
}

function getOffers (url) {
  return request(url)
    .then(res => {
      let $ = cheerio.load(res)
      let area = $('li.natural')
      let offers = []

      area.each((i, el) => {
        let offer = $(el)

        offers.push({
          link: 'https://www.gumtree.com' + offer.find('.listing-link').attr('href'),
          name: offer.find('.listing-title').text().replace(/\n/g, ''),
          price: offer.find('.listing-price strong').text()
        })
      })
      return offers
    })
}

module.exports = gumtree
