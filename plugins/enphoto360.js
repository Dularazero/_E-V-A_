let fetch = require('node-fetch')
let split = '|'
let handler = async (m, { conn, args: [effect], text: txt }) => {
  let { effects } = await (await (fetch(global.API('xteam', '/textpro')))).json()
  if (!effect) throw '*List Effect*\n\n' + effects.sort((a, b) => a - b).join('\n')
  effect = effect.toLowerCase()
  if (!effect in effects) throw `Effect *${effect}* not found`
  let [text, text2, ...text3] = txt.replace(effect, '').trimStart().split(split)
  text3 = text3.join(split)
  let url = global.API('xteam', '/textpro/' + effect, { text, text2, text3 }, 'APIKEY')
  await conn.sendFile(m.chat, url, 'Eva.jpg', `*EvA*\n*Efek:* ${effect}`, m, false, { thumbnail: Buffer.alloc(0) })
}
handler.help = ['textpro'].map(v => v + ' <effect> <text>|[text2]|[text3]')
handler.tags = ['tools']
handler.command = /^(textpro)$/i

module.exports = handler

