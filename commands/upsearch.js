const Discord = require('discord.js');
module.exports.run = async (client, message, args, ops, PREFIX) => {
let Embed = new Discord.RichEmbed()
        .setColor(0x36393e);

    if (!args[0]) {
        Embed.setFooter(`Incorrect usage: ${PREFIX}upsearch <1+ characterSeach>`)
        return message.channel.send(Embed); // Make sure the user is actually searching a user.
    }

    if (args[0].length <= 1) {
        Embed.setFooter(`Incorrect usage: ${PREFIX}Upsearch <1+ characterSeach>`)
        return message.channel.send(Embed); // If the arg length is 1 the array length will without doubt exceed 32 which we should try avoid.
    }

    let array = []; // Making an empty array.

    let number = 0; // Setting the number to 0 so we can add 1 per user. Example: 1. User 2. User 3. User
    message.guild.members.map(m => { // Returns an array containing all users in the guild.
        if (m.user.username.toUpperCase().includes(args[0].toUpperCase())) { // Filtering it so only the users with what the user is searching for is added to the array.
            number++; // Increasing the number by 1 per user.
            array.push(`${number}. ${m.user.username}`); // Pushing each user into the array in a format. Example: 5. Mio / Μισάνθρωπος. . 
            //We can change this to include the discriminator by doing array.push(`${number}. ${m.user.username}${m.user.discriminator}`)
        }
    });
    
  
  let postMsg = await message.channel.send('**🔍Please Wait...**');
   message.channel.startTyping();
  
    Embed.setTitle(`Results for "${args[0]}"`)
    Embed.setDescription(`\`\`\`${array.slice(0, 30).join(`\n`)}\`\`\``)

    setTimeout(() => {
        postMsg.edit(Embed)
        }, 2000);
message.channel.stopTyping(true);
} 

module.exports.help = { 
name: "upsearch", 
description: "", 
usage: ""
} 