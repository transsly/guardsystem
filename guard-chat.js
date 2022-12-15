//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

const Discord = require('discord.js');
const client = new Discord.Client();
const db = require('discowdb');

const tokens = require('./Z-token-girme');
const ayarlar = require('./A-ayarlar');

const yetkiler = ["ADMINISTRATOR", "MANAGE_ROLES", "MANAGE_CHANNELS", "MANAGE_EMOJIS", "MANAGE_WEBHOOKS", "MANAGE_GUILD", "BAN_MEMBERS", "KICK_MEMBERS", "VIEW_AUDIT_LOG", "MENTION_EVERYONE", "MANAGE_NICKNAMES"]

const fs = require('fs');
const chalk = require('chalk');
const moment = require('moment');
require('moment-duration-format');
require('./A-events/fonk');
moment.locale("tr")

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

function cizgiconsole() {
  console.log(chalk.bold.yellow("——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————"))
}

function bosconsole() {
  console.log("") 
}

function girisconsole(arg, arg2) {
const tarih = moment(new Date()).add(3, "hours").format("LLLL:ss")
    if(arg === true) console.log(chalk.yellow(tarih)+" / "+chalk.magenta("DiscowZombie | Giriş")+" / "+chalk.bold.green("Bot Başarıyla Giriş Yaptı.")+" / "+chalk.bold.red(client.user.tag)+" / "+chalk.bold.red(client.user.id)+" / "+chalk.bold.red(client.guilds.cache.size.toString()))
    if(arg === false) console.log(chalk.yellow(tarih)+" / "+chalk.magenta("DiscowZombie | Giriş")+" / "+chalk.bold.green("Bot Giriş Yaparken Bir Hata Oluştu.\nHata : "+chalk.bold.magenta(arg2))+"\n")
}

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

function logconsole(arg) {
const tarih = moment(new Date()).add(3, "hours").format("LLLL:ss")
  console.log(chalk.yellow(tarih)+" / "+chalk.magenta("DiscowZombie | Bot")+" / "+chalk.bold.green(arg))
}

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

client.login(tokens.chat).then(x => {
  girisconsole(true)
  db.add("Botlar_Aktif", +1)
}).catch(err => {
girisconsole(false, err)
  db.add("Botlar_Aktif", +1)
});

//------------------------------------------------------------//------------------------------------------------------------//------------------------------------------------------------
//------------------------------------------------------------//------------------------------------------------------------//------------------------------------------------------------
//------------------------------------------------------------//------------------------------------------------------------//------------------------------------------------------------

client.on("ready", async () => {
    
if(db.get("Botlar_Aktif") === 6) {
  db.delete("Botlar_Aktif")
  cizgiconsole()
}
  
client.user.setPresence({ activity: { name: ayarlar.status.status_footer, type: ayarlar.status.status_type }, status: ayarlar.status.status_stat }).catch(err => { })

var durumlar = ayarlar.status.status_name

setInterval(function() {
var random = Math.floor(Math.random()*(durumlar.length-0+1)+0);
    
  client.user.setActivity(durumlar[random])
}, 5000)

setTimeout(() => {
  console.log(chalk.yellow(moment(new Date()).format("LLLL:ss"))+" / "+chalk.magenta("DiscowZombie | Bot")+" / "+chalk.bold.green("Bot Başarıyla Aktif Oldu.")+" "+chalk.bold.red(client.user.tag+" | "+client.user.id))
  db.add("Botlar_Girdi", +1)
      if(db.get("Botlar_Girdi") === 6) {
  cizgiconsole()
}
}, 2000)
})

//------------------------------------------------------------//------------------------------------------------------------//------------------------------------------------------------
//------------------------------------------------------------//------------------------------------------------------------//------------------------------------------------------------
//------------------------------------------------------------//------------------------------------------------------------//------------------------------------------------------------



//------------------------------------------------------------//------------------------------------------------------------//------------------------------------------------------------
//------------------------------------------------------------//------------------------------------------------------------//------------------------------------------------------------
//------------------------------------------------------------//------------------------------------------------------------//------------------------------------------------------------

function punish(arg, arg2, arg3, arg4) {
const swcik = client.guilds.cache.get(arg)
const uye = swcik.members.cache.get(arg2)
if(!uye) return;

    if(arg3 === "mute") {
  uye.roles.add(ayarlar.roles.muted, "DiscowZombie / Punish Function() ").catch(err => { console.log("Bir Kullanıcıyı Mutelerken Bir Hata Oluştu. / Hata : "+err)})
setTimeout(() => {
  uye.roles.remove(ayarlar.roles.muted, "DiscowZombie / Punish Function() ").catch(err => { console.log("Bir Kullanıcıyı Mutelerken Bir Hata Oluştu. / Hata : "+err)})
}, arg4)
}
  
    if(arg3 === "ban") {
  uye.ban({ reason: arg4}).catch(err => { console.log("Bir Kullanıcıyı Yasaklarken Bir Hata Oluştu. / Hata : "+err)})
}
  
    if(arg3 === "jail") {
  uye.roles.set([ayarlar.roles.jailed], "DiscowZombie / Punish Function() ").catch(err => { console.log("Bir Kullanıcıyı Jaile Atarken Bir Hata Oluştu. / Hata : "+err)})
}
  
}

function embedc(arg, arg2, arg3) {
  let discow = new Discord.MessageEmbed().setColor(arg2).setTimestamp().setFooter(ayarlar.status.status_footer, client.users.cache.get(arg3) ? client.users.cache.get(arg3).avatarURL({ dynamic: true, size: 2048 }) : client.user.avatarURL({ size: 2048 })).setDescription(arg)
  return discow;
}

//------------------------------------------------------------//------------------------------------------------------------//------------------------------------------------------------
//------------------------------------------------------------//------------------------------------------------------------//------------------------------------------------------------
//------------------------------------------------------------//------------------------------------------------------------//------------------------------------------------------------
