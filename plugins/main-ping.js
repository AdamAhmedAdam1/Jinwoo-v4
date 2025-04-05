import { exec } from 'child_process'
import speed from 'performance-now'

let handler = async (m, { conn }) => {
  let thumbnail = 'https://files.catbox.moe/bqs70b.jpg'
  let fgg = {
    key: { fromMe: false, participant: `0@s.whatsapp.net`, remoteJid: 'status@broadcast' },
    message: {
      contactMessage: {
        displayName: ` ᴍᴀʟᴠɪɴ ᴋɪɴɢ`,
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:'TOHID-AI'\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
      },
    },
  }
  let pingMsg = await conn.sendMessage(m.chat, { text: 'Pinging...' }, { quoted: fgg })

  let timestamp = speed()

  await exec('neofetch --stdout', async (error, stdout) => {
    let latency = (speed() - timestamp).toFixed(4)

    await conn.relayMessage(
      m.chat,
      {
        protocolMessage: {
          key: pingMsg.key,
          type: 14,
          editedMessage: {
            conversation: `*ᴊɪɴᴡᴏᴏ ᴠ4  running ping:* *${latency} ms*`,
          },
        },
      },
      {}
    )
  })
}

handler.help = ['ping']
handler.tags = ['main']
handler.command = ['ping', 'speed']

export default handler
