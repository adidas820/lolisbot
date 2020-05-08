var figlet = require('figlet');

module.exports.run = (bot, message, args, ops, PREFIX, tools) => {
  
  if(args[0] == "help"){ message.reply(`Usage: \`${PREFIX}asciify <text>\``);
return;
  var maxLen = 14 // You can modify the max characters here
  
  if(args.join(' ').length > maxLen) return message.channel.send('Only 14 characters admitted!') 
  
  if(!args[0]) return message.channel.send('Please specify a test to asciify!');
  
  figlet(`${args.join(' ')}`, function(err, data) {
      if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
      }

      message.channel.send(`${data}`, {code: 'AsciiArt'});
  });


}

module.exports.help = { 
name: "asciify", 
description: "unik text", 
usage: "m!asciify <text>"
} 
}