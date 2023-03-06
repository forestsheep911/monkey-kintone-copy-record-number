const pj = require('../package.json')
module.exports = {
  name: pj.name,
  namespace: `https://github.com/${pj.author}/monkey-${pj.name}`,
  version: '0.0.1',
  description: pj.description,
  author: pj.author,
  copyright: pj.author,
  license: 'MIT',
  match: ['https://*.cybozu.cn'],
  require: [],
  'run-at': 'document-end',
  supportURL: 'https://github.com/forestsheep911/monkey-kintone-copy-record-number/issues',
  homepage: pj.homepage,
  grant: ['GM_addStyle'],
  icon: 'https://img.icons8.com/ios/50/000000/happy-eyes.png',
}
