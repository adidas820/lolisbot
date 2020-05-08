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

    const answers = [ //KATAKATAPOKESAMWAN
        `${message.author.tag}  is hugging **${args[0]}**`,
        `Soo Sweett!!!!`
    ];

    const pokeself = [
        `No idea what ${message.author.tag} doing`,
        `Anybody, please hug ${message.author.tag}`,
        `Sorry ${message.author.tag}, i can't hug you! >>w<<`  
    ]

    //VARIABLEJALAN
    let postMsg = await message.channel.send('**🔍Please Wait...**');
    message.channel.startTyping();
    let {body} = await superagent.get("https://nekos.life/api/v2/img/hug")
     const wordAnswer = answers[Math.floor(Math.random() * answers.length)], 
           pokeselff = pokeself[Math.floor(Math.random() * pokeself.length)], 
        alonedesc = `**${message.author.username}** is lonely and hugging themselves..\nHere some hugs for ${message.author.tag}`;
    let description, image, footer;
    !args[0] ? (description = alonedesc, footer = pokeselff) : (description = wordAnswer, footer = `${message.author.tag} hugging someone. CUTE!`);

    // RESULTS
    
    var embed = new Discord.RichEmbed()
        .setAuthor("Minasaki - Hug")
        .setDescription(`${description}`)
        .setImage(body.url)
        .setColor("RANDOM")
        .setFooter(`${footer}`)
    setTimeout(() => {
postMsg.edit(embed) 
}, 1000);
  message.channel.stopTyping(true);
}; 

module.exports.help = { 
name: "huh", 
description: "", 
usage: ""
} 