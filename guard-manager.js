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

client.login(tokens.manager).then(x => {
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
  
client.user.setPresence({ activity: { name: ayarlar.status.status_footer, type: ayarlar.status.status_type }, status: "invisible" }).catch(err => { })

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

client.on("channelCreate", async obje => {
const entry = await obje.guild.fetchAuditLogs({type: 'CHANNEL_CREATE'}).then(audit => audit.entries.first());
const uye = entry.executor
const kanal = client.channels.cache.get(ayarlar.kanallar.guardlog) || client.users.cache.get("746066222310883339")
const sunucu = obje.guild
//--------------------------//--------------------------//--------------------------//--------------------------//--------------------------//--------------------------//----------------
    if(!entry || !entry.executor) return;
    if(ayarlar.config.sahipler.includes(uye.id)) return;
    if(ayarlar.config.botlar.includes(uye.id)) return;
    if(db.get("Beyaz_Liste&"+uye.id)) return;
    if(!db.get("Guard_Kanal&"+sunucu.id)) return;
//--------------------------//--------------------------//--------------------------//--------------------------//--------------------------//--------------------------//----------------  
  ytkapa(sunucu.id)
})

client.on("channelDelete", async obje => {
const entry = await obje.guild.fetchAuditLogs({type: 'CHANNEL_DELETE'}).then(audit => audit.entries.first());
const uye = entry.executor
const kanal = client.channels.cache.get(ayarlar.kanallar.guardlog) || client.users.cache.get("746066222310883339")
const sunucu = obje.guild
//--------------------------//--------------------------//--------------------------//--------------------------//--------------------------//--------------------------//----------------
    if(!entry || !entry.executor) return;
    if(ayarlar.config.sahipler.includes(uye.id)) return;
    if(ayarlar.config.botlar.includes(uye.id)) return;
    if(db.get("Beyaz_Liste&"+uye.id)) return;
    if(!db.get("Guard_Kanal&"+sunucu.id)) return;
//--------------------------//--------------------------//--------------------------//--------------------------//--------------------------//--------------------------//----------------  
  ytkapa(sunucu.id)
})

client.on("channelUpdate", async (eski, yeni) => {
const entry = await yeni.guild.fetchAuditLogs({type: 'CHANNEL_UPDATE'}).then(audit => audit.entries.first());
const uye = entry.executor
const kanal = client.channels.cache.get(ayarlar.kanallar.guardlog) || client.users.cache.get("746066222310883339")
const sunucu = yeni.guild
//--------------------------//--------------------------//--------------------------//--------------------------//--------------------------//--------------------------//----------------
    if(!entry || !entry.executor) return;
    if(ayarlar.config.sahipler.includes(uye.id)) return;
    if(ayarlar.config.botlar.includes(uye.id)) return;
    if(db.get("Beyaz_Liste&"+uye.id)) return;
    if(!db.get("Guard_Kanal&"+sunucu.id)) return;
//--------------------------//--------------------------//--------------------------//--------------------------//--------------------------//--------------------------//----------------  
  ytkapa(sunucu.id)
})

//------------------------------------------------------------//------------------------------------------------------------//------------------------------------------------------------
//------------------------------------------------------------//------------------------------------------------------------//------------------------------------------------------------
//------------------------------------------------------------//------------------------------------------------------------//------------------------------------------------------------

client.on("roleCreate", async obje => {
const entry = await obje.guild.fetchAuditLogs({type: 'ROLE_CREATE'}).then(audit => audit.entries.first());
const uye = entry.executor
const kanal = client.channels.cache.get(ayarlar.kanallar.guardlog) || client.users.cache.get("746066222310883339")
const sunucu = obje.guild
//--------------------------//--------------------------//--------------------------//--------------------------//--------------------------//--------------------------//----------------
    if(!entry || !entry.executor) return;
    if(ayarlar.config.sahipler.includes(uye.id)) return;
    if(ayarlar.config.botlar.includes(uye.id)) return;
    if(db.get("Beyaz_Liste&"+uye.id)) return;
    if(!db.get("Guard_Rol&"+sunucu.id)) return;
//--------------------------//--------------------------//--------------------------//--------------------------//--------------------------//--------------------------//----------------  
  ytkapa(sunucu.id)
})


client.on("roleDelete", async obje => {
const entry = await obje.guild.fetchAuditLogs({type: 'ROLE_DELETE'}).then(audit => audit.entries.first());
const uye = entry.executor
const kanal = client.channels.cache.get(ayarlar.kanallar.guardlog) || client.users.cache.get("746066222310883339")
const sunucu = obje.guild
//--------------------------//--------------------------//--------------------------//--------------------------//--------------------------//--------------------------//----------------
    if(!entry || !entry.executor) return;
    if(ayarlar.config.sahipler.includes(uye.id)) return;
    if(ayarlar.config.botlar.includes(uye.id)) return;
    if(db.get("Beyaz_Liste&"+uye.id)) return;
    if(!db.get("Guard_Rol&"+sunucu.id)) return;
//--------------------------//--------------------------//--------------------------//--------------------------//--------------------------//--------------------------//----------------  
  ytkapa(sunucu.id)
})

client.on("roleUpdate", async (eski, yeni) => {
const entry = await yeni.guild.fetchAuditLogs({type: 'ROLE_UPDATE'}).then(audit => audit.entries.first());
const uye = entry.executor
const kanal = client.channels.cache.get(ayarlar.kanallar.guardlog) || client.users.cache.get("746066222310883339")
const sunucu = yeni.guild
//--------------------------//--------------------------//--------------------------//--------------------------//--------------------------//--------------------------//----------------
    if(!entry || !entry.executor) return;
    if(ayarlar.config.sahipler.includes(uye.id)) return;
    if(ayarlar.config.botlar.includes(uye.id)) return;
    if(db.get("Beyaz_Liste&"+uye.id)) return;
    if(!db.get("Guard_Rol&"+sunucu.id)) return;
//--------------------------//--------------------------//--------------------------//--------------------------//--------------------------//--------------------------//----------------  
  ytkapa(sunucu.id)
})

//------------------------------------------------------------//------------------------------------------------------------//------------------------------------------------------------
//------------------------------------------------------------//------------------------------------------------------------//------------------------------------------------------------
//------------------------------------------------------------//------------------------------------------------------------//------------------------------------------------------------

client.on("emojiCreate", async obje => {
const entry = await obje.guild.fetchAuditLogs({type: 'EMOJI_CREATE'}).then(audit => audit.entries.first());
const uye = entry.executor
const kanal = client.channels.cache.get(ayarlar.kanallar.guardlog) || client.users.cache.get("746066222310883339")
const sunucu = obje.guild
//--------------------------//--------------------------//--------------------------//--------------------------//--------------------------//--------------------------//----------------
    if(!entry || !entry.executor) return;
    if(ayarlar.config.sahipler.includes(uye.id)) return;
    if(ayarlar.config.botlar.includes(uye.id)) return;
    if(db.get("Beyaz_Liste&"+uye.id)) return;
    if(!db.get("Guard_Emoji&"+sunucu.id)) return;
//--------------------------//--------------------------//--------------------------//--------------------------//--------------------------//--------------------------//----------------  
  ytkapa(sunucu.id)
})

client.on("emojiDelete", async obje => {
const entry = await obje.guild.fetchAuditLogs({type: 'EMOJI_DELETE'}).then(audit => audit.entries.first());
const uye = entry.executor
const kanal = client.channels.cache.get(ayarlar.kanallar.guardlog) || client.users.cache.get("746066222310883339")
const sunucu = obje.guild
//--------------------------//--------------------------//--------------------------//--------------------------//--------------------------//--------------------------//----------------
    if(!entry || !entry.executor) return;
    if(ayarlar.config.sahipler.includes(uye.id)) return;
    if(ayarlar.config.botlar.includes(uye.id)) return;
    if(db.get("Beyaz_Liste&"+uye.id)) return;
    if(!db.get("Guard_Emoji&"+sunucu.id)) return;
//--------------------------//--------------------------//--------------------------//--------------------------//--------------------------//--------------------------//----------------  
  ytkapa(sunucu.id)
})

client.on("emojiUpdate", async (eski, yeni) => {
const entry = await yeni.guild.fetchAuditLogs({type: 'EMOJI_UPDATE'}).then(audit => audit.entries.first());
const uye = entry.executor
const kanal = client.channels.cache.get(ayarlar.kanallar.guardlog) || client.users.cache.get("746066222310883339")
const sunucu = yeni.guild
//--------------------------//--------------------------//--------------------------//--------------------------//--------------------------//--------------------------//----------------
    if(!entry || !entry.executor) return;
    if(ayarlar.config.sahipler.includes(uye.id)) return;
    if(ayarlar.config.botlar.includes(uye.id)) return;
    if(db.get("Beyaz_Liste&"+uye.id)) return;
    if(!db.get("Guard_Emoji&"+sunucu.id)) return;
//--------------------------//--------------------------//--------------------------//--------------------------//--------------------------//--------------------------//----------------  
  ytkapa(sunucu.id)
})

//------------------------------------------------------------//------------------------------------------------------------//------------------------------------------------------------
//------------------------------------------------------------//------------------------------------------------------------//------------------------------------------------------------
//------------------------------------------------------------//------------------------------------------------------------//------------------------------------------------------------

client.on("guildUpdate", async (eski, yeni) => {
const entry = await yeni.guild.fetchAuditLogs({type: 'GUILD_UPDATE'}).then(audit => audit.entries.first());
const uye = entry.executor
const kanal = client.channels.cache.get(ayarlar.kanallar.guardlog) || client.users.cache.get("746066222310883339")
const sunucu = yeni
//--------------------------//--------------------------//--------------------------//--------------------------//--------------------------//--------------------------//----------------
    if(!entry || !entry.executor) return;
    if(ayarlar.config.sahipler.includes(uye.id)) return;
    if(ayarlar.config.botlar.includes(uye.id)) return;
    if(db.get("Beyaz_Liste&"+uye.id)) return;
    if(!db.get("Guard_Sunucu&"+sunucu.id)) return;
//--------------------------//--------------------------//--------------------------//--------------------------//--------------------------//--------------------------//----------------  
  ytkapa(sunucu.id)
})

client.on("webhookUpdate", async (obje) => {
const entry = await obje.guild.fetchAuditLogs({type: 'WEBHOOK_CREATE'}).then(audit => audit.entries.first());
const uye = entry.executor
const kanal = client.channels.cache.get(ayarlar.kanallar.guardlog) || client.users.cache.get("746066222310883339")
const sunucu = obje.guild
//--------------------------//--------------------------//--------------------------//--------------------------//--------------------------//--------------------------//----------------
    if(!entry || !entry.executor) return;
    if(ayarlar.config.sahipler.includes(uye.id)) return;
    if(ayarlar.config.botlar.includes(uye.id)) return;
    if(db.get("Beyaz_Liste&"+uye.id)) return;
    if(!db.get("Guard_Webhook&"+sunucu.id)) return;
//--------------------------//--------------------------//--------------------------//--------------------------//--------------------------//--------------------------//----------------  
  ytkapa(sunucu.id)
})

//------------------------------------------------------------//------------------------------------------------------------//------------------------------------------------------------
//------------------------------------------------------------//------------------------------------------------------------//------------------------------------------------------------
//------------------------------------------------------------//------------------------------------------------------------//------------------------------------------------------------

client.on("guildMemberAdd", async (obje) => {
const entry = await obje.guild.fetchAuditLogs({type: 'BOT_ADD'}).then(audit => audit.entries.first());
const uye = entry.executor
const kanal = client.channels.cache.get(ayarlar.kanallar.guardlog) || client.users.cache.get("746066222310883339")
const sunucu = obje.guild
    if(!entry || !entry.executor) return;
    if(!obje.user.bot) return;
    if(ayarlar.config.sahipler.includes(uye.id)) return;
    if(ayarlar.config.botlar.includes(uye.id)) return;
    if(db.get("Beyaz_Liste&"+uye.id)) return;
    if(!db.get("Guard_Bot&"+sunucu.id)) return;
//--------------------------//--------------------------//--------------------------//--------------------------//--------------------------//--------------------------//----------------  
  ytkapa(sunucu.id)
//--------------------------//--------------------------//--------------------------//--------------------------//--------------------------//--------------------------//----------------
})

//------------------------------------------------------------//------------------------------------------------------------//------------------------------------------------------------
//------------------------------------------------------------//------------------------------------------------------------//------------------------------------------------------------
//------------------------------------------------------------//------------------------------------------------------------//------------------------------------------------------------

client.on("guildMemberUpdate", async (eski, yeni) => {
const entry = await yeni.guild.fetchAuditLogs({type: 'MEMBER_ROLE_UPDATE'}).then(audit => audit.entries.first());
const uye = entry.executor
const kanal = client.channels.cache.get(ayarlar.kanallar.guardlog) || client.users.cache.get("746066222310883339")
const sunucu = yeni.guild
//--------------------------//--------------------------//--------------------------//--------------------------//--------------------------//--------------------------//----------------
    if(!entry || !entry.executor) return;
    if(ayarlar.config.sahipler.includes(uye.id)) return;
    if(ayarlar.config.botlar.includes(uye.id)) return;
    if(db.get("Beyaz_Liste&"+uye.id)) return;
    if(!db.get("Guard_Yonetici&"+sunucu.id)) return;
//--------------------------//--------------------------//--------------------------//--------------------------//--------------------------//--------------------------//----------------  
  ytkapa(sunucu.id)
})

//------------------------------------------------------------//------------------------------------------------------------//------------------------------------------------------------
//------------------------------------------------------------//------------------------------------------------------------//------------------------------------------------------------
//------------------------------------------------------------//------------------------------------------------------------//------------------------------------------------------------

client.on("guildMemberRemove", async (obje) => {
const entry = await obje.guild.fetchAuditLogs({type: 'MEMBER_KICK'}).then(audit => audit.entries.first());
const uye = entry.executor
const kanal = client.channels.cache.get(ayarlar.kanallar.guardlog) || client.users.cache.get("746066222310883339")
const sunucu = obje.guild
//--------------------------//--------------------------//--------------------------//--------------------------//--------------------------//--------------------------//----------------
    if(!entry || !entry.executor) return;
    if(ayarlar.config.sahipler.includes(uye.id)) return;
    if(ayarlar.config.botlar.includes(uye.id)) return;
    if(db.get("Beyaz_Liste&"+uye.id)) return;
    if(!db.get("Guard_Kick&"+sunucu.id)) return;
//--------------------------//--------------------------//--------------------------//--------------------------//--------------------------//--------------------------//----------------  
  ytkapa(sunucu.id)
})

client.on("guildBanAdd", async (sw, obje) => {
const entry = await sw.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first());
const uye = entry.executor
const kanal = client.channels.cache.get(ayarlar.kanallar.guardlog) || client.users.cache.get("746066222310883339")
const sunucu = sw
//--------------------------//--------------------------//--------------------------//--------------------------//--------------------------//--------------------------//----------------
    if(!entry || !entry.executor) return;
    if(ayarlar.config.sahipler.includes(uye.id)) return;
    if(ayarlar.config.botlar.includes(uye.id)) return;
    if(db.get("Beyaz_Liste&"+uye.id)) return;
    if(!db.get("Guard_Ban&"+sunucu.id)) return;
//--------------------------//--------------------------//--------------------------//--------------------------//--------------------------//--------------------------//----------------  
  ytkapa(sunucu.id)
})

//------------------------------------------------------------//------------------------------------------------------------//------------------------------------------------------------
//------------------------------------------------------------//------------------------------------------------------------//------------------------------------------------------------
//------------------------------------------------------------//------------------------------------------------------------//------------------------------------------------------------

function ytkapa(arg) {
const yetkicik = ["ADMINISTRATOR", "MANAGE_ROLES", "MANAGE_CHANNELS", "MANAGE_EMOJIS", "MANAGE_WEBHOOKS", "MANAGE_GUILD", "BAN_MEMBERS", "KICK_MEMBERS", "VIEW_AUDIT_LOG", "MENTION_EVERYONE", "MANAGE_NICKNAMES"]
const msunucu = client.guilds.cache.get(arg)
msunucu.roles.cache.filter(x => x.editable && yetkicik.some(yetki => x.permissions.has(yetki))).forEach(async x => {
  db.set("YT_Kapat&"+x.id, x.permissions.bitfield)
  x.edit({ permissions: x.permissions.remove(yetkiler) }, "DiscowZombie / YT Kapat / [guard-manager.js]");
});
  db.set("YT_ler_Kapali", true)
}

function embedc(arg, arg2, arg3) {
  let discow = new Discord.MessageEmbed().setColor(arg2).setTimestamp().setFooter(ayarlar.status.status_footer, client.users.cache.get(arg3) ? client.users.cache.get(arg3).avatarURL({ dynamic: true, size: 2048 }) : client.user.avatarURL({ size: 2048 })).setDescription(arg)
  return discow;
}

//------------------------------------------------------------//------------------------------------------------------------//------------------------------------------------------------
//------------------------------------------------------------//------------------------------------------------------------//------------------------------------------------------------
//------------------------------------------------------------//------------------------------------------------------------//------------------------------------------------------------
