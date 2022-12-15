const { GuildMember, Guild, TextChannel, Message, MessageEmbed, ReactionCollector } = require("discord.js");

Guild.prototype.kanalBul = function(isim) {
let obje = this.channels.cache.find(k => k.name === isim)
  return obje;
}

Guild.prototype.rolBul = function(isim) {
let obje = this.roles.cache.find(k => k.name === isim)
  return obje;
}
Guild.prototype.uyeBul = function(isim) {
let obje = this.members.cache.find(k => k.name === isim)
  return obje;
}

Guild.prototype.kanalBulID = function(idcik) {
let obje = this.channels.cache.find(k => k.id === idcik)
  return obje;
}

Guild.prototype.rolBulID = function(idcik) {
let obje = this.roles.cache.find(k => k.id === idcik)
  return obje;
}

Guild.prototype.uyeBulID = function(idcik) {
let obje = this.members.cache.find(k => k.id === idcik)
  return obje;
}