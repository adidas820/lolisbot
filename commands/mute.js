const Discord = require("discord.js");
const ms = require("ms");
const errors = require("../utils/errors.js");
module.exports.run = async (bot, message, args, ops, PREFIX) => {
  
     if(args[0] == "help"){ message.reply(`Usage: \`${PREFIX}mute <@mention> <time>\``);
return;
} 
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return errors.noPerms(message, "MANAGE_MESSAGES");
    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!tomute) return errors.cantfindUser(message);
    if (tomute.hasPermission("MANAGE_MESSAGES")) return errors.equalPerms(message);
    let muterole = message.guild.roles.find(`name`, "Muted");

    if (!muterole) {
        try {
            muterole = await message.guild.createRole({
                name: "Muted",
                color: "#000000",
                permissions: []
            })
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        } catch (e) {
            console.log(e.stack);
        }
    }

    let mutetime = args[1];
    if (!mutetime) return errors.noTime(message);

    await (tomute.addRole(muterole.id));
    message.channel.send(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`);

    setTimeout(function() {
        tomute.removeRole(muterole.id);
        message.channel.send(`<@${tomute.id}> has been unmuted!`);
    }, ms(mutetime));
    
    let modlog = message.guild.channels.find(`name`, "mod-logs");
            if(!modlog) return message.channel.send("Can't Find mod-logs channel.");
   
    modlog.send(`<@${tomute.id}> Has been Muted for ${ms(ms(mutetime))}`);

}
exports.conf = {
    aliases: [],
    permLevel: 2
};

module.exports.help = {
    name: "mute",
    description: 'Denies the user from speaking for the time provided.',
    usage: 'mute [time: hours, minitues, or days.]'
}
