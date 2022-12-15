//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

const Discord = require('discord.js');
const moment = require('moment');
const chalk = require('chalk');
const db = require('discowdb');
const ayarlar = require('../A-ayarlar');
const client = global.discow

const arol = ayarlar.roller
const akanal = ayarlar.kanallar
const aemojiler = ayarlar.emojiler
const abot = ayarlar.bot
const aconfig = ayarlar.config

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

module.exports = async (buton) => {

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

const uye = buton.clicker.member
  
const discow = new Discord.MessageEmbed().setColor('BLACK').setFooter(`${ayarlar.status.status_footer}`, uye.user.avatarURL({ dynamic: true, size: 2048 })).setTimestamp()
const dikkat = client.emojis.cache.find(x => x.name === ayarlar.emojiler.discow_carpi)
const tik = client.emojis.cache.find(x => x.name === ayarlar.emojiler.discow_tik)
const ok = client.emojis.cache.find(x => x.name === ayarlar.emojiler.discow_ok)

const acik = client.emojis.cache.find(x => x.name === ayarlar.emojiler.discow_acik)
const kapali = client.emojis.cache.find(x => x.name === ayarlar.emojiler.discow_kapali)
const sunucu = client.guilds.cache.get(aconfig.sunucuid)

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

function cizgiconsole() {
  console.log(chalk.bold.yellow("——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————"))
}

function bosconsole() {
  console.log("")
}

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

    if(buton.id === "guard_buton_1") {
    if(!ayarlar.config.sahipler.includes(uye.id)) {
  buton.reply.send(discow.setDescription("**D-Dostum Senin Bu `Butona Basmaya Hakkın Yok` Bunu Bilmiyormusun ?**"), true)
} else {
  buton.reply.defer();
  db.get("Guard_Kanal&"+buton.guild.id) ? db.delete("Guard_Kanal&"+buton.guild.id) : db.set("Guard_Kanal&"+buton.guild.id, true)
  buton.channel.send(discow.setDescription(`${ok} **\`Kanal Koruma\` Başarıyla ${db.get("Guard_Kanal&"+buton.guild.id) ? "`Aktif` Edildi." : "`Devre Dışı` Bırakıldı."}** ${tik}`)).then(x => x.delete({ timeout: 3000 }))
}
}
  
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
 
    if(buton.id === "guard_buton_2") {
    if(!ayarlar.config.sahipler.includes(uye.id)) {
  buton.reply.send(discow.setDescription("**D-Dostum Senin Bu `Butona Basmaya Hakkın Yok` Bunu Bilmiyormusun ?**"), true)
} else {
  buton.reply.defer();
  db.get("Guard_Rol&"+buton.guild.id) ? db.delete("Guard_Rol&"+buton.guild.id) : db.set("Guard_Rol&"+buton.guild.id, true)
  buton.channel.send(discow.setDescription(`${ok} **\`Rol Koruma\` Başarıyla ${db.get("Guard_Rol&"+buton.guild.id) ? "`Aktif` Edildi." : "`Devre Dışı` Bırakıldı."}** ${tik}`)).then(x => x.delete({ timeout: 3000 }))
}
}
  
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

    if(buton.id === "guard_buton_3") {
    if(!ayarlar.config.sahipler.includes(uye.id)) {
  buton.reply.send(discow.setDescription("**D-Dostum Senin Bu `Butona Basmaya Hakkın Yok` Bunu Bilmiyormusun ?**"), true)
} else {
  buton.reply.defer();
  db.get("Guard_Emoji&"+buton.guild.id) ? db.delete("Guard_Emoji&"+buton.guild.id) : db.set("Guard_Emoji&"+buton.guild.id, true)
  buton.channel.send(discow.setDescription(`${ok} **\`Emoji Koruma\` Başarıyla ${db.get("Guard_Emoji&"+buton.guild.id) ? "`Aktif` Edildi." : "`Devre Dışı` Bırakıldı."}** ${tik}`)).then(x => x.delete({ timeout: 3000 }))
}
}
  
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
 
    if(buton.id === "guard_buton_4") {
    if(!ayarlar.config.sahipler.includes(uye.id)) {
  buton.reply.send(discow.setDescription("**D-Dostum Senin Bu `Butona Basmaya Hakkın Yok` Bunu Bilmiyormusun ?**"), true)
} else {
  buton.reply.defer();
  db.get("Guard_Yonetici&"+buton.guild.id) ? db.delete("Guard_Yonetici&"+buton.guild.id) : db.set("Guard_Yonetici&"+buton.guild.id, true)
  buton.channel.send(discow.setDescription(`${ok} **\`Yönetici Koruma\` Başarıyla ${db.get("Guard_Yonetici&"+buton.guild.id) ? "`Aktif` Edildi." : "`Devre Dışı` Bırakıldı."}** ${tik}`)).then(x => x.delete({ timeout: 3000 }))
}
}
  
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
 
    if(buton.id === "guard_buton_5") {
    if(!ayarlar.config.sahipler.includes(uye.id)) {
  buton.reply.send(discow.setDescription("**D-Dostum Senin Bu `Butona Basmaya Hakkın Yok` Bunu Bilmiyormusun ?**"), true)
} else {
  buton.reply.defer();
  db.get("Guard_Sunucu&"+buton.guild.id) ? db.delete("Guard_Sunucu&"+buton.guild.id) : db.set("Guard_Sunucu&"+buton.guild.id, true)
  buton.channel.send(discow.setDescription(`${ok} **\`Sunucu Koruma\` Başarıyla ${db.get("Guard_Sunucu&"+buton.guild.id) ? "`Aktif` Edildi." : "`Devre Dışı` Bırakıldı."}** ${tik}`)).then(x => x.delete({ timeout: 3000 }))
}
}
  
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
 
    if(buton.id === "guard_buton_6") {
    if(!ayarlar.config.sahipler.includes(uye.id)) {
  buton.reply.send(discow.setDescription("**D-Dostum Senin Bu `Butona Basmaya Hakkın Yok` Bunu Bilmiyormusun ?**"), true)
} else {
  buton.reply.defer();
  db.get("Guard_Kick&"+buton.guild.id) ? db.delete("Guard_Kick&"+buton.guild.id) : db.set("Guard_Kick&"+buton.guild.id, true)
  buton.channel.send(discow.setDescription(`${ok} **\`Kick Koruma\` Başarıyla ${db.get("Guard_Kick&"+buton.guild.id) ? "`Aktif` Edildi." : "`Devre Dışı` Bırakıldı."}** ${tik}`)).then(x => x.delete({ timeout: 3000 }))
}
}
  
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
 
    if(buton.id === "guard_buton_7") {
    if(!ayarlar.config.sahipler.includes(uye.id)) {
  buton.reply.send(discow.setDescription("**D-Dostum Senin Bu `Butona Basmaya Hakkın Yok` Bunu Bilmiyormusun ?**"), true)
} else {
  buton.reply.defer();
  db.get("Guard_Ban&"+buton.guild.id) ? db.delete("Guard_Ban&"+buton.guild.id) : db.set("Guard_Ban&"+buton.guild.id, true)
  buton.channel.send(discow.setDescription(`${ok} **\`Ban Koruma\` Başarıyla ${db.get("Guard_Ban&"+buton.guild.id) ? "`Aktif` Edildi." : "`Devre Dışı` Bırakıldı."}** ${tik}`)).then(x => x.delete({ timeout: 3000 }))
}
}
  
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
 
    if(buton.id === "guard_buton_8") {
    if(!ayarlar.config.sahipler.includes(uye.id)) {
  buton.reply.send(discow.setDescription("**D-Dostum Senin Bu `Butona Basmaya Hakkın Yok` Bunu Bilmiyormusun ?**"), true)
} else {
  buton.reply.defer();
  db.get("Guard_Bot&"+buton.guild.id) ? db.delete("Guard_Bot&"+buton.guild.id) : db.set("Guard_Bot&"+buton.guild.id, true)
  buton.channel.send(discow.setDescription(`${ok} **\`Bot Koruma\` Başarıyla ${db.get("Guard_Bot&"+buton.guild.id) ? "`Aktif` Edildi." : "`Devre Dışı` Bırakıldı."}** ${tik}`)).then(x => x.delete({ timeout: 3000 }))
}
}
  
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
 
    if(buton.id === "guard_buton_9") {
    if(!ayarlar.config.sahipler.includes(uye.id)) {
  buton.reply.send(discow.setDescription("**D-Dostum Senin Bu `Butona Basmaya Hakkın Yok` Bunu Bilmiyormusun ?**"), true)
} else {
  buton.reply.defer();
  db.get("Guard_Webhook&"+buton.guild.id) ? db.delete("Guard_Webhook&"+buton.guild.id) : db.set("Guard_Webhook&"+buton.guild.id, true)
  buton.channel.send(discow.setDescription(`${ok} **\`Webhook Koruma\` Başarıyla ${db.get("Guard_Webhook&"+buton.guild.id) ? "`Aktif` Edildi." : "`Devre Dışı` Bırakıldı."}** ${tik}`)).then(x => x.delete({ timeout: 3000 }))
}
}
  
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
 
    if(buton.id === "guard_buton_10") {
    if(!ayarlar.config.sahipler.includes(uye.id)) {
  buton.reply.send(discow.setDescription("**D-Dostum Senin Bu `Butona Basmaya Hakkın Yok` Bunu Bilmiyormusun ?**"), true)
} else {
  buton.reply.defer();
  db.get("Guard_Spam&"+buton.guild.id) ? db.delete("Guard_Spam&"+buton.guild.id) : db.set("Guard_Spam&"+buton.guild.id, true)
  buton.channel.send(discow.setDescription(`${ok} **\`Spam Engel\` Başarıyla ${db.get("Guard_Spam&"+buton.guild.id) ? "`Aktif` Edildi." : "`Devre Dışı` Bırakıldı."}** ${tik}`)).then(x => x.delete({ timeout: 3000 }))
}
}
  
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
 
    if(buton.id === "guard_buton_11") {
    if(!ayarlar.config.sahipler.includes(uye.id)) {
  buton.reply.send(discow.setDescription("**D-Dostum Senin Bu `Butona Basmaya Hakkın Yok` Bunu Bilmiyormusun ?**"), true)
} else {
  buton.reply.defer();
  db.get("Guard_Reklam&"+buton.guild.id) ? db.delete("Guard_Reklam&"+buton.guild.id) : db.set("Guard_Reklam&"+buton.guild.id, true)
  buton.channel.send(discow.setDescription(`${ok} **\`Reklam Engel\` Başarıyla ${db.get("Guard_Reklam&"+buton.guild.id) ? "`Aktif` Edildi." : "`Devre Dışı` Bırakıldı."}** ${tik}`)).then(x => x.delete({ timeout: 3000 }))
}
}
  
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
 
    if(buton.id === "guard_buton_12") {
    if(!ayarlar.config.sahipler.includes(uye.id)) {
  buton.reply.send(discow.setDescription("**D-Dostum Senin Bu `Butona Basmaya Hakkın Yok` Bunu Bilmiyormusun ?**"), true)
} else {
  buton.reply.defer();
  db.get("Guard_Kufur&"+buton.guild.id) ? db.delete("Guard_Kufur&"+buton.guild.id) : db.set("Guard_Kufur&"+buton.guild.id, true)
  buton.channel.send(discow.setDescription(`${ok} **\`Küfür Engel\` Başarıyla ${db.get("Guard_Kufur&"+buton.guild.id) ? "`Aktif` Edildi." : "`Devre Dışı` Bırakıldı."}** ${tik}`)).then(x => x.delete({ timeout: 3000 }))
}
}
  
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
 
    if(buton.id === "guard_buton_13") {
    if(!ayarlar.config.sahipler.includes(uye.id)) {
  buton.reply.send(discow.setDescription("**D-Dostum Senin Bu `Butona Basmaya Hakkın Yok` Bunu Bilmiyormusun ?**"), true)
} else {
  buton.reply.defer();
  db.get("Guard_Ses&"+buton.guild.id) ? db.delete("Guard_Ses&"+buton.guild.id) : db.set("Guard_Ses&"+buton.guild.id, true)
  buton.channel.send(discow.setDescription(`${ok} **\`Sağ Tık Sesten Atma Koruması\` Başarıyla ${db.get("Guard_Ses&"+buton.guild.id) ? "`Aktif` Edildi." : "`Devre Dışı` Bırakıldı."}** ${tik}`)).then(x => x.delete({ timeout: 3000 }))
}
}
 
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

}
module.exports.conf = { 
  name: "clickButton",
  aciklama: "Guard Koruma Aç Kapat"
};

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
