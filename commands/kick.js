const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args, ops, PREFIX) => {

  
  if(args[0] == "help"){ message.reply(`Usage: \`${PREFIX}kick <@mention> <reason>\``);
return;
                       }
    
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return errors.noPerms(message, "MANAGE_MESSAGES");
  
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("Can't find user!");
    let kReason = args.join(" ").slice(22);
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");
    if(!kReason) return errors.noReason(message, "channel");
   
    let kickEmbed = new Discord.RichEmbed()
    .setDescription("~Kick~")
    .setColor("#e56b00")
    .addField("<:Rip:462908343938318346> Kicked User", `${kUser} with ID ${kUser.id}`)
    .addField("<:buhbye:261291850105749514> Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Kicked In", message.channel)
    .addField("🗓️ Time", message.createdAt)
    .addField("📓 Reason", kReason);

    let kickChannel = message.guild.channels.find(`name`, "mod-logs");
    if(!kickChannel) return message.channel.send("Can't find mod-logs channel.");

    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);
    message.channel.send(`${kUser} Sucessfully Kicked`);
}

module.exports.help = {
  name:"kick"
}
