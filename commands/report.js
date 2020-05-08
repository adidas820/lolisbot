const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
      let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
      if(!rUser) return message.channel.send("Couldn't find user.");
      let reason = args.join(" ").slice(22);

      let reportEmbed = new Discord.RichEmbed()
        .setAuthor("Log | Report", `https://images-ext-1.discordapp.net/external/fthmtHB4VcjVNH0P_yelzxnIj208kreL34GdDZOwxBU/https/qph.ec.quoracdn.net/main-qimg-83c6de25ed91d13a4f09fb5f11ca8853`)
      .setColor(3447003)
      .addField("⚠️Reported User", `${rUser}`)
      .addField("📧Reported By", `${message.author}`)
      .addField("🔖Channel", message.channel)
      .addField("⏱️Time", message.createdAt)
      .addField("Reason", reason);

      message.delete().catch(O_o=>{});
      message.channel.send("Your Reports Has Been Send");

      let modlog = message.guild.channels.find(`name`, "mod-logs");
      if(!modlog) return message.channel.send("Can't Find mod-logs channel.");

      modlog.send(reportEmbed);

}

module.exports.help = {
    name: "report"
  }
