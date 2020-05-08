const Discord = require('discord.js');
var Jimp = require("jimp");
exports.run = async (bot, message, args) => {


    if (message.channel.type === "dm") return;
    let meow = message.content.split(" ").slice(1);
    let args1 = meow.join(' ');
    let illegal = `https://storage.googleapis.com/is-now-illegal.appspot.com/gifs/` + args1.toUpperCase() + `.gif`;
    if (!args1) {
        return message.reply(':x: **Please, specify a thing that trump will make illegal**');
    }
    if (meow.length > 1) {
        return message.reply(':x: **Max 1 word**');
    }
    const emb = new Discord.RichEmbed();
    emb.setAuthor("Trump has now made " + meow + " illegal!", "http://blog.adsy.me/wp-content/uploads/2016/11/angry-side-face-trump-transparent.png");
    emb.setImage(illegal);
    message.channel.send({
        embed: emb
    })
}
exports.help = {
 name: 'illegal' 
} 
