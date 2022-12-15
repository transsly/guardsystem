//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

const Discord = require('discord.js');
const db = require('discowdb');
const { MessageButton, MessageActionRow } = require('discord-buttons');

const moment = require('moment');
const chalk = require('chalk');

const ayarlar = require('../A-ayarlar');

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

  exports.run = async (client, message, args) => {

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

const discow = new Discord.MessageEmbed().setColor('BLACK').setFooter(`${ayarlar.status.status_footer}`, message.author.avatarURL({ dynamic: true, size: 2048 })).setTimestamp()
const dikkat = client.emojis.cache.find(x => x.name === ayarlar.emojiler.discow_carpi)
const tik = client.emojis.cache.find(x => x.name === ayarlar.emojiler.discow_tik)
const ok = client.emojis.cache.find(x => x.name === ayarlar.emojiler.discow_ok)

const acik = client.emojis.cache.find(x => x.name === ayarlar.emojiler.discow_acik)
const kapali = client.emojis.cache.find(x => x.name === ayarlar.emojiler.discow_kapali)

const msunucu = message.guild
const muye = message.member
const msahip = message.author
const mkanal = message.channel

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

const sahipler = ayarlar.config.sahipler.includes(msahip.id)
const yoneticiler = muye.hasPermission("ADMINISTRATOR")

    if(!sahipler) return;
    
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

const button1 = new MessageButton().setStyle(4).setID("guard_buton_1").setLabel("Kanal Koruma")
const button2 = new MessageButton().setStyle(4).setID("guard_buton_2").setLabel("Rol Koruma")
const button3 = new MessageButton().setStyle(4).setID("guard_buton_3").setLabel("Emoji Koruma")
const button4 = new MessageButton().setStyle(4).setID("guard_buton_4").setLabel("Yönetici Koruma")
const button5 = new MessageButton().setStyle(4).setID("guard_buton_5").setLabel("Sunucu Koruma")
const button6 = new MessageButton().setStyle(4).setID("guard_buton_6").setLabel("Kick Koruma")
const button7 = new MessageButton().setStyle(4).setID("guard_buton_7").setLabel("Ban Koruma")
const button8 = new MessageButton().setStyle(4).setID("guard_buton_8").setLabel("Bot Koruma")
const button9 = new MessageButton().setStyle(3).setID("guard_buton_9").setLabel("Webhook Koruma")
const button13 = new MessageButton().setStyle(1).setID("guard_buton_13").setLabel("Sağ Tık Sesten Atma Koruması")
const button10 = new MessageButton().setStyle(3).setID("guard_buton_10").setLabel("Spam Engel")
const button11 = new MessageButton().setStyle(3).setID("guard_buton_11").setLabel("Reklam / Link Engel")
const button12 = new MessageButton().setStyle(3).setID("guard_buton_12").setLabel("Küfür Engel")

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const compo = new MessageActionRow()
.addComponents(button1)
.addComponents(button2)
.addComponents(button3)
.addComponents(button4)
const compo2 = new MessageActionRow()
.addComponents(button5)
.addComponents(button6)
.addComponents(button7)
.addComponents(button8)
const compo3 = new MessageActionRow()
.addComponents(button9)
.addComponents(button10)
.addComponents(button11)
.addComponents(button12)
.addComponents(button13)

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const kanalk = db.get(`Discow_Kanal&${msunucu.id}`) ? "`Açık`" : "`Kapalı`"
const rolk = db.get(`Discow_Rol&${msunucu.id}`) ? "`Açık`" : "`Kapalı`"
const emojik = db.get(`Discow_Emoji&${msunucu.id}`) ? "`Açık`" : "`Kapalı`"

const botk = db.get(`Discow_Bot&${msunucu.id}`) ? "`Açık`" : "`Kapalı`"
const swk = db.get(`Discow_Sw&${msunucu.id}`) ? "`Açık`" : "`Kapalı`"
const ytk = db.get(`Discow_Yt&${msunucu.id}`) ? "`Açık`" : "`Kapalı`"

const webhookk = db.get(`Discow_Webhook&${msunucu.id}`) ? "`Açık`" : "`Kapalı`"
const bank = db.get(`Discow_Ban&${msunucu.id}`) ? "`Açık`" : "`Kapalı`"
const kickk = db.get(`Discow_Kick&${msunucu.id}`) ? "`Açık`" : "`Kapalı`"

const sesk = db.get(`Discow_Ses&${msunucu.id}`) ? "`Açık`" : "`Kapalı`"
const isimk = db.get(`Discow_İsim&${msunucu.id}`) ? "`Açık`" : "`Kapalı`"

const spamk = db.get(`Discow_Spam&${msunucu.id}`) ? "`Açık`" : "`Kapalı`"
const reklamk = db.get(`Discow_Reklam&${msunucu.id}`) ? "`Açık`" : "`Kapalı`"
const kufurk = db.get(`Discow_Kufur&${msunucu.id}`) ? "`Açık`" : "`Kapalı`"

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

    if(!args[0]) return gonder(`**${dikkat} Lütfen Yapmak İstediğin İşlemi Belirt. ${dikkat}

${ok} Koruma Aç/Kapat : \`${ayarlar.bot.prefix}koruma guard\`
${ok} Guvenliler : \`${ayarlar.bot.prefix}koruma list\`

${ok} Ayarlar : \`${ayarlar.bot.prefix}koruma ayarlar\`
${ok} YT Kapat : \`${ayarlar.bot.prefix}koruma ytkapat\`**
${ok} YT Aç : \`${ayarlar.bot.prefix}koruma ytaç\`**`)
    
    if(args[0].toLowerCase() === "guard") {
  
  message.react("✅")

  mkanal.send(discow.setDescription(`${dikkat} **Lütfen \`Açmak/Kapatmak\` İstediğin Korumayı Seç.** ${dikkat}

${ok} **\`Açmak/Kapatmak\` İstediğin Korumayı Aşağıdaki Butonlardan Seçebilirsin.**`), { components: [compo, compo2, compo3] }).then(x => x.delete({ timeout: 30000 })).catch(err => { })
  
}
    
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
    
    if(args[0].toLowerCase() === "ayarlar") {
      
  message.react("✅")
      
  gonder(`**${msunucu.name} / Koruma Ayarları
   
${ok} Kanal Koruma : ${kanalk}
${ok} Rol Koruma : ${rolk}
${ok} Emoji Koruma : ${emojik}
${ok} Bot Koruma : ${botk}
${ok} Sunucu Koruma : ${swk}
${ok} Yönetici Koruma : ${ytk}
${ok} Webhook Koruma : ${webhookk}
${ok} Ban Koruma : ${bank}
${ok} Kick Koruma : ${kickk}

${ok} Spam Engel : ${spamk}
${ok} Reklam Engel : ${reklamk}
${ok} Küfür Engel : ${kufurk}**`)
    
const guvenliler = db.get("Guvenli&"+message.guild.id)
    
    if(guvenliler) {
  codem(guvenliler.map(x => `${message.guild.members.cache.get(x).user.tag} / ${x}`))
}
}
    
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
    
    if(args[0].toLowerCase() === "ytkapat") {
      
  message.react("✅")
      
const yetkiler = ["ADMINISTRATOR", "MANAGE_ROLES", "MANAGE_CHANNELS", "MANAGE_EMOJIS", "MANAGE_WEBHOOKS", "MANAGE_GUILD", "BAN_MEMBERS", "KICK_MEMBERS", "VIEW_AUDIT_LOG", "MENTION_EVERYONE", "MANAGE_NICKNAMES"]

  gonder(`${dikkat} **Yetkiler Kapatılıyor.** ${dikkat}

**Yetkisi Kapatılan Roller :**
**\`\`\`fix\n${msunucu.roles.cache.filter(x => x.editable && yetkiler.some(yetki => x.permissions.has(yetki))).map(x => `${x.name} / ${x.id}`).join("\n")}\`\`\`**`)

  msunucu.roles.cache.filter(x => x.editable && yetkiler.some(yetki => x.permissions.has(yetki))).forEach(async x => {
  db.set("YT_Kapat&"+x.id, x.permissions.bitfield)
  x.edit({ permissions: x.permissions.remove(yetkiler) }, "DiscowZombie / YT Kapat");
});
      
db.set("YT_ler_Kapali", true)
      
}
    
    if(args[0].toLowerCase() === "ytaç") {

if(db.get("YT_Ler_Kapali") != true) return message.react("❌")
      
  message.react("✅")
      
const roller = db.all().filter(x => x.ID.startsWith("YT_Kapat&")).forEach(x => {
let rolid = x.ID.replace(",", "").split("YT_Kapat&")[1]

    if(!msunucu.roles.cache.get(rolid)) return;
  
const rol = msunucu.roles.cache.get(rolid)
  console.log("Rol : "+rol.name+" / Rol ID : "+rolid+" / Rol İzin : "+x.data)
  rol.setPermissions(Number(x.data))
  db.delete(x.ID)
})

db.delete("YT_ler_Kapali")

}
    
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

function gonderm(mesaj) {
  mkanal.send(discow.setDescription(mesaj)).then(x => x.delete({ timeout: 15000 })).catch(err => { })
}

function gonder(mesaj) {
  mkanal.send(discow.setDescription(mesaj))
}
    
function embedm(mesaj) {
  let deneme = discow.setDescription(mesaj)
  return deneme;
}
 
function dikkatm(mesaj) {
  mkanal.send(discow.setDescription(`${dikkat} ${mesaj} ${dikkat}`)).then(x => x.delete({ timeout: 15000 })).catch(err => { })
}

function codem(mesaj) {
  mkanal.send(mesaj, { code: "js", split: true })
}

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

}
exports.discow = {
  aliases: ["koruma", "guard", "korumasistemi", "koruma-sistemi", "guardsystem", "guard-system"],
  isim: 'Koruma Komutu',
  kategori: "guard"
};

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
