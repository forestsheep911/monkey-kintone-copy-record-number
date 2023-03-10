const pj = require('../package.json')
module.exports = {
  name: 'kintone快速拷贝记录编号',
  namespace: `https://github.com/${pj.author}/monkey-${pj.name}`,
  version: '0.0.1',
  description: pj.description,
  author: pj.author,
  copyright: pj.author,
  license: 'MIT',
  match: ['https://*.cybozu.cn', 'https://*.cybozu.com'],
  require: [],
  'run-at': 'document-end',
  supportURL: 'https://github.com/forestsheep911/monkey-kintone-copy-record-number/issues',
  homepage: pj.homepage,
  grant: ['GM_addStyle'],
  icon: 'https://img.icons8.com/material-outlined/256/code-file.png',
}
