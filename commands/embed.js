const Discord = require('discord.js');

module.exports.run = async (bot, message, args, ops) => {
let API = (bot.ping).toFixed(2)
    let specifyembed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setDescription(`${message.author}, Please specify a word or message to embed.`)
        .setTimestamp();

    var text = args.join(" ");
    if (!text) return message.channel.send(specifyembed);
  
    message.channel.startTyping();
    let postMsg = await message.channel.send('**Please Wait...**');
    let embedsay = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setDescription(`${text}`);

    setTimeout(() => {
postMsg.edit(embedsay)
}, 100);
  message.channel.stopTyping(true);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "embed",
    category: "Miscelaneous",
    description: "Embed a message you want.",
    usage: "embed"
};
