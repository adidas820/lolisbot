const Discord = require("discord.js")
const fs = require("fs");

module.exports.run = async (bot, message, args,ops) => {
  if(message.author.id !== '444454206800396309') return message.channel.send("Sorry, Only my owner can use this!")

  try{
    delete require.cache[require.resolve(`./${args[0]}.js`)];

    return message.channel.send(`Successfully reloaded **${args[0]}.js**`).then(m => m.delete(5000))
     }catch(e){
     return message.channel.send(`Unable to reload ${args[0]}`).then(m => m.delete(2000));
     }
}; 

module.exports.help = {
name: "reload"
}