const Discord = require("discord.js");
const ms = require("ms");
const errors =require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {
            if(!message.member.hasPermission("MANAGE_MESSAGES")) return errors.noPerms(message, "MANAGE_MESSAGES");
            let udReason = args.join(" ").slice(22);

            let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
            if(!toMute) return errors.cantfindUser(message);

            let role = message.guild.roles.find(r => r.name === "Muted");

            if(!role || !toMute.roles.has(role.id)) return message.channel.send("This user is already mute!");

            let unmuteembed = new Discord.RichEmbed() 
            
            .setColor(3447003)
            .addField("✅ Succed Unmuted!", `toMute`)
            .addField(`Reason »`, `udReason`)
            .setTimestamp()
            .setFooter(`Executor : ${message.author.username}#${message.author.discriminator}`);

            if(!udReason) return errors.noReason(message);

            await toMute.removeRole(role);
            
            return message.channel.send(`✅ Succed Unmute ${toMute}`);

            let modlog = message.guild.channels.find(`name`, "mod-logs");
            if(!modlog) return message.channel.send("Can't Find mod-logs channel.");

            modlog.send(unmuteembed);

}

module.exports.help = {
    name: "unmute"
  }
