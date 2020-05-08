const Discord = module.require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {
              if(!message.member.hasPermission("MANAGE_MESSAGES")) return errors.noPerms(message, "MANAGE_MESSAGES");
          let wUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
              if(!wUser) return errors.cantfindUser(message, "channel");
              let wReason = args.join(" ").slice(22);
              if(!wReason) return errors.noReason(message)
              

          message.delete()
          let bicon = bot.user.displayAvatarURL;
          let warningajaembed = new Discord.RichEmbed()
          .setColor(3447003)
          .setThumbnail(bicon)

          .setDescription("**WARNED**")
          .addField("**By:**", `${message.author}`)
          .addField("Reason", wReason)
          .setTimestamp();

        return message.guild.member(wUser).sendMessage(warningajaembed) + message.channel.send(`**✔️ SUCCED WARNED ${message.guild.member(wUser)}** `);

        let modlog = message.guild.channels.find(`name`, "mod-logs");
        if(!modlog) return message.channel.send("Can't Find mod-logs channel.");

        modlog.send(warningajaembed);

}

module.exports.help = {
    name: "warn"
  }
