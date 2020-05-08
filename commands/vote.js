const DBL = require('dblapi.js');
const dbl = new DBL(process.env.DBL_TOKEN);

exports.run = async (bot, message, args) => {
dbl.hasVoted(message.author.id).then(voted => {
    if (!voted) return message.reply(`Give Minasaki Upvotes on DBL | https://discordbots.org/bot/452360666020577281/vote`);
if (voted)  return message.channel.send({ embed: { color: 0x5cf442, description: `${message.author} You already give me upvote. Comeback in 12 Hour :)`}})
})
}

