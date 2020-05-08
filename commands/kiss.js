const Discord = require('discord.js');
const superagent = require("superagent")
const nekoclient = require('nekos.life');
const neko = new nekoclient();

/*
The code base is from :
https://github.com/shidoitsuka/another-miku-bot
Thanks to him!! COOLAH CODAA!!! ^^--^^
*/

module.exports.run = async (bot, message, args) => {

    const pokesamwan = [ //KATAKATAPOKESAMWAN
        `${message.author.tag}  is giving kiss to **${args[0]}**`,
        `Muahh!! >>__<<`, 
        `woooww >>__<<`
    ];

    const pokeself = [
        `No idea what ${message.author.tag} doing`,
        `Sorry ${message.author.tag}, i can't kiss you! >>w<<`  
    ]

    //VARIABLEJALAN
    let postMsg = await message.channel.send('**🔍Please Wait...**');
    message.channel.startTyping();
    let {body} = await superagent.get("https://nekos.life/api/v2/img/kiss")
     const wordAnswer = pokesamwan[Math.floor(Math.random() * pokesamwan.length)], 
           pokeselff = pokeself[Math.floor(Math.random() * pokeself.length)],
        alonedesc = `**${message.author.username}** is quite funny to kiss themselves!`;
        let description, image, footer;
        !args[0] ? (description = alonedesc, footer = pokeselff) : (description = wordAnswer, footer = `${message.author.tag} kissing someone. CUTE!`);

    // RESULTS
    const embed = new Discord.RichEmbed()
        .setTitle("Minasaki - Kiss")
        .setDescription(description)
        .setImage(body.url)
        .setColor("RANDOM")
        .setFooter(`${footer}`)
        setTimeout(() => {
        postMsg.edit(embed)
        }, 2000);
message.channel.stopTyping(true);
};

module.exports.help = { 
name: "kiss", 
description: "", 
usage: ""
} 