const axios = require('axios');
const { parse } = require('node-html-parser');
const vm = require('vm');
const marked = require('marked');

async function get() {
  const res = await axios('https://juejin.cn/post/7129377267028869150')
  const root = parse(res.data)
  const body = root.getElementsByTagName('body')[0]
  const script = body.getElementsByTagName('script')[0]
  const scriptContent = script.childNodes[0].rawText

  let data = {}
  vm.runInNewContext(`${scriptContent}`, {
    window: data
  })
  const markdown = data.__NUXT__.state.view.column.entry.article_info.mark_content
  const html = marked.parse(markdown)
}

get()