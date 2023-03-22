const pj = require('../package.json')
const { resolve } = require('path')
module.exports = {
  // name: pj.name,
  name: 'kintone快速拷贝记录编号',
  namespace: `https://github.com/${pj.author}/monkey-${pj.name}`,
  match: [
    'https://*.cybozu.cn/k/*',
    'https://*.cybozu.com/k/*',
    'https://*.cybozu-dev.com/k/*',
    'https://*.s.cybozu.cn/k/*',
    'https://*.s.cybozu.com/k/*',
    'https://*.s.cybozu-dev.com/k/*',
    'https://*.kintone.com/k/*',
  ],
  grant: ['GM_getValue', 'GM_setValue', 'GM_addValueChangeListener', 'GM_addStyle'],
  // require: [`file://${resolve(__dirname, '../dist/').replaceAll('\\', '/')}/${pj.name}.dev.user.js`],
  require: [`file://${resolve(__dirname, '../dist/').replaceAll('\\', '/')}/kintone快速拷贝记录编号.dev.user.js`],
}
