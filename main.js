const links = [
"https://discow-vizor.glitch.me/",
"https://discow-angel.glitch.me/",
"https://discow-report.glitch.me/",
"https://discow-stat.glitch.me/",
"https://discow-welcome.glitch.me/",
]


const fetch = require('node-fetch');

setInterval(() => {
    links.forEach(l => {
        fetch(l);
    });
}, 60000);

require('./guard-log')
require('./guard-process')
require('./guard-ban1')
require('./guard-ban2')
require('./guard-manager')
require('./guard-chat')


const db = require('quick.db')
new db({
    "isim": "Darksaga", // veri.js
    "klasor": "veriler" // database/veri.js
})


db.delete("Botlar_Aktif")
db.delete("Botlar_Girdi")
