const Chance = require('chance')
const uuid = require('uuid/v4')

const chance = new Chance()

 const products = Array.from({ length: 10 }).map(() => ({
  id: uuid(),
  name: chance.sentence({ words: 3 }),
  description: chance.paragraph({ sentences: 5 }),
  price: chance.dollar({ max: 1000 }),
  category: chance.pickone(['male', 'female']),
  image: chance.avatar({ fileExtension: 'jpg' }),
  color: chance.color({ format: 'rgb' }),
}))

module.exports = products;
