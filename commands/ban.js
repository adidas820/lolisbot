const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args, ops, PREFIX) => {

  if(args[0] == "help"){ message.reply(`Usage: \`${PREFIX}ban <@mention> <reason>\``);
return;
} 
    if(!message.member.hasPermission("BAN_MEMBERS")) return errors.noPerms(message, "BAN_MEMBERS");
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return errors.cantfindUser(message);
    let bReason = args.join(" ").slice(22);
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");
    if(!bReason) return errors.noReason(message);
    let banEmbed = new Discord.RichEmbed()
    .setDescription("~Ban~")
    .setColor("#bc0000")
    .addField("<:Rip:462908343938318346> Banned User", `${bUser} with ID ${bUser.id}`)
    .addField("<:BanHammer:446920411414921217> Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("<:buhbye:261291850105749514> Banned In", message.channel)
    .addField("🗓️Time", message.createdAt)
    .addField("📓Reason", bReason);

    let incidentchannel = message.guild.channels.find(`name`, "mod-logs");
    if(!incidentchannel) return message.channel.send("Can't find mod-logs channel.");

    message.guild.member(bUser).ban(bReason);
    incidentchannel.send(banEmbed);
    message.channel.send(`${bUser} Sucessfully Banned`);
}

module.exports.help = {
  name:"ban"
}
