const pj = require('../package.json')
module.exports = {
  name: pj.name,
  namespace: `https://github.com/${pj.author}/monkey-${pj.name}`,
  version: '0.0.1',
  description: pj.description,
  author: pj.author,
  copyright: pj.author,
  license: 'MIT',
  match: ['https://*'],
  require: [],
  'run-at': 'document-start',
  supportURL: 'https://yourSupportURL',
  homepage: pj.homepage,
  grant: [],
  icon: 'https://img.icons8.com/ios/50/000000/happy-eyes.png',
}
