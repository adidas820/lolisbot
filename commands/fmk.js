const Discord = require('discord.js');

// Make sure you use exports.run when you have a command handler!
module.exports.run = async (bot, message, args) => {

    let replies = ['MARRY :ring:', 'KILL :bomb:', 'FUCK :ok_hand:'];
    let result = Math.floor(Math.random() * replies.length);

    let makifuembed = new Discord.RichEmbed()

        .setDescription(`**${args[0]} has been choosed by <@${message.author.id}>**`)
        .setColor('RANDOM')
        .addField('You choosed:', replies[result])
        .setFooter('Fuck, Marry, Kill!', bot.user.displayAvatarURL)
        .setTimestamp();

    if (!message.mentions.users.first()) return message.channel.send(`<@${message.author.id}>, please mention a user you wanna choose!`).then(msg => {
        msg.delete(3000)
    });
  let postMsg = await message.channel.send('**Please Wait...**');

    setTimeout(() => {
        postMsg.edit(makifuembed)
        }, 1000);

}
// Make sure you got exports.help || otherwise the command won't work!
module.exports.help = {
    name: "fmk",

    description: "the command fmk is based on the game: Fuck, Marry kill",

    usage: "!fmk <user>"
}