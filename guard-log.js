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

global.discow = client
global.conf = ayarlar

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

function eventconsole(arg) {
const tarih = moment(new Date()).add(3, "hours").format("LLLL:ss")
  console.log(chalk.yellow(tarih)+" / "+chalk.magenta("DiscowZombie | Event")+" / "+chalk.bold.green(chalk.bold.red(arg)+" Fonksiyonu Başarıyla Başlatıldı."))
}

function komutsayconsole(arg) {
const tarih = moment(new Date()).add(3, "hours").format("LLLL:ss")
  console.log(chalk.yellow(tarih)+" / "+chalk.magenta("DiscowZombie | Komutsay")+" / "+chalk.bold.green(chalk.bold.red(arg)+" Adet Komut Yüklenicek."))
}

function komutconsole(arg, arg2, arg3) {
const tarih = moment(new Date()).add(3, "hours").format("LLLL:ss")
  console.log(chalk.yellow(tarih)+" / "+chalk.magenta("DiscowZombie | Komut")+" / "+chalk.bold.green("Bir Komut  Yüklendi. / Yüklenek Komut : "+chalk.bold.red(arg)+" / Yüklenen Kod : "+chalk.bold.red(arg2)+" / Komutun Alias'ları : "+chalk.bold.red(arg3)))
}

function logconsole(arg) {
const tarih = moment(new Date()).add(3, "hours").format("LLLL:ss")
  console.log(chalk.yellow(tarih)+" / "+chalk.magenta("DiscowZombie | Bot")+" / "+chalk.bold.green(arg))
}

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

require('discord-buttons')(client);
require('./A-events/komut')(client);

fs.readdir("./A-komutlar/", async (err, files) => {
    if (err) console.error(err);
  cizgiconsole()
  komutsayconsole(files.length)
files.forEach(f => {
let props = require(`./A-komutlar/${f}`);
  komutconsole(props.discow.isim,f,props.discow.aliases.map(x => `${x}`).join(", "));
  client.commands.set(props.discow.isim, props);
props.discow.aliases.forEach(alias => {
  client.aliases.set(alias, props.discow.isim);
}); 
});
});

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

fs.readdir("./B-fonksiyonlar", (err, files) => {
    if (err) return console.error(err);
  cizgiconsole()
files.filter((file) => file.endsWith(".js")).forEach((file) => {
let prop = require(`./B-fonksiyonlar/${file}`);
    if (!prop.conf) return;
  client.on(prop.conf.name, prop);
  eventconsole(prop.conf.name+" / "+prop.conf.aciklama);
});
  cizgiconsole()
});

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

client.login(tokens.log).then(x => {
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
  punish(sunucu.id, uye.id, "ban", `DiscowZombie / Kanal Koruma Sistemi [${moment(new Date()).format("LLLL:ss")}]`)
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
  punish(sunucu.id, uye.id, "ban", `DiscowZombie / Kanal Koruma Sistemi [${moment(new Date()).format("LLLL:ss")}]`)
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
  punish(sunucu.id, uye.id, "ban", `DiscowZombie / Kanal Koruma Sistemi [${moment(new Date()).format("LLLL:ss")}]`)
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
  punish(sunucu.id, uye.id, "ban", `DiscowZombie / Rol Koruma Sistemi [${moment(new Date()).format("LLLL:ss")}]`)
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
  punish(sunucu.id, uye.id, "ban", `DiscowZombie / Rol Koruma Sistemi [${moment(new Date()).format("LLLL:ss")}]`)
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
  punish(sunucu.id, uye.id, "ban", `DiscowZombie / Rol Koruma Sistemi [${moment(new Date()).format("LLLL:ss")}]`)
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
  punish(sunucu.id, uye.id, "ban", `DiscowZombie / Emoji Koruma Sistemi [${moment(new Date()).format("LLLL:ss")}]`)
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
  punish(sunucu.id, uye.id, "ban", `DiscowZombie / Emoji Koruma Sistemi [${moment(new Date()).format("LLLL:ss")}]`)
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
  punish(sunucu.id, uye.id, "ban", `DiscowZombie / Emoji Koruma Sistemi [${moment(new Date()).format("LLLL:ss")}]`)
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
  punish(sunucu.id, uye.id, "ban", `DiscowZombie / Sunucu Koruma Sistemi [${moment(new Date()).format("LLLL:ss")}]`)
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
  punish(sunucu.id, uye.id, "ban", `DiscowZombie / Webhook Koruma Sistemi [${moment(new Date()).format("LLLL:ss")}]`)
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
  punish(sunucu.id, uye.id, "ban", `DiscowZombie / Bot Ekleme Koruma Sistemi [${moment(new Date()).format("LLLL:ss")}]`)
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
  punish(sunucu.id, uye.id, "ban", `DiscowZombie / Yönetici Verme Koruma Sistemi [${moment(new Date()).format("LLLL:ss")}]`)
})

client.on("voiceStateUpdate", async (eski, yeni) => {

const entry = await yeni.guild.fetchAuditLogs({ type: 'MEMBER_DISCONNECT'}).then(audit => audit.entries.first());
  
if(eski.channel && !yeni.channel) {
  
const uye = entry.executor
const kanal = client.channels.cache.get(ayarlar.kanallar.guardlog) || client.users.cache.get("746066222310883339")
const sunucu = yeni.guild
const uye1 = sunucu.members.cache.get(uye.id)
const uye2 = sunucu.members.cache.get(yeni.member.id)
//--------------------------//--------------------------//--------------------------//--------------------------//--------------------------//--------------------------//----------------
    if(!entry || !entry.executor) return;
    if(ayarlar.config.sahipler.includes(uye.id)) return;
    if(ayarlar.config.botlar.includes(uye.id)) return;
    if(db.get("Beyaz_Liste&"+uye.id)) return;
    if(!db.get("Guard_Ses&"+sunucu.id)) return;
//--------------------------//--------------------------//--------------------------//--------------------------//--------------------------//--------------------------//---------------- 
  console.log("Bir Kullanıcının Bağlantısı Kesildi. / Kesen : "+uye1.user.tag+" / Kullanıcı : "+uye2.user.tag)
  punish(sunucu.id, uye.id, "jail", `DiscowZombie / Bağlantı Kesme Koruma Sistemi [${moment(new Date()).format("LLLL:ss")}]`)
}
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
  punish(sunucu.id, uye.id, "ban", `DiscowZombie / Kick Koruma Sistemi [${moment(new Date()).format("LLLL:ss")}]`)
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
  punish(sunucu.id, uye.id, "ban", `DiscowZombie / Ban Koruma Sistemi [${moment(new Date()).format("LLLL:ss")}]`)
})

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
