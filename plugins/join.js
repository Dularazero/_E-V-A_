let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i

let handler = async (m, { conn, text, usedPrefix }) => {
    let [_, code] = text.match(linkRegex) || []
    if (!code) throw 'Wrong Link'
    let res = await conn.acceptInvite(code)
    m.reply(`Successfully joined the group ${res.gid}`).then(() => {
        var jumlahHari = 86400000 * 3
        var now = new Date() * 1
        if (now < global.db.data.chats[res.gid].expired) global.db.data.chats[res.gid].expired += jumlahHari
        else global.db.data.chats[res.gid].expired = now + jumlahHari
    })
    conn.sendButton(res.gid, `
*${conn.user.name}* is a whatsapp bot built with Nodejs, *${conn.user.name}* invited by @${m.sender.split`@`[0]}
    
type *${usedPrefix}menu* to see a list of commands`.trim(), watermark, 'Menu', `${usedPrefix}?`, 0, { contextInfo: { mentionedJid: [m.sender] } })
}
handler.help = ['join <chat.whatsapp.com>']
handler.tags = ['']

handler.command = /^join$/i

handler.premium = false

handler.owner = false

module.exports = handler
