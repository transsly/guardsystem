//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

const Discord = require('discord.js');
const db = require('discowdb');


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

    //if(!sahipler) return;
    //if(!sahipler && !yoneticiler) return dikkatm(`**Bu Komutu Sadece \`Yöneticiler\` Kullanabilir.**`)

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
  aliases: ["taslak"],
  isim: 'Taslak Komutu',
  kategori: "taslak"
};

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
