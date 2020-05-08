const snekfetch = require('snekfetch');
exports.run = async (client, msg, args) => {
  if(args.length < 1) return msg.channel.send('No text added') 
  msg.channel.startTyping();
  const searchMessage = await msg.channel.send('🖌️Painting...');
  const { body } = await snekfetch.get(`https://nekobot.xyz/api/imagegen?type=changemymind&text=${encodeURIComponent(args.join(' '))}`);
  msg.channel.send({file: { attachment:body.message, name: 'changemymind.png'}}).then(()=> { searchMessage.delete(); msg.channel.stopTyping(); });
};
