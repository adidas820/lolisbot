embed: async (channel, message, deleteTimer) => {
  
  channel.send({
    embed:{
      description: message, 
      color: 0x1D82B6
    }
  }).then(msg => {
    
    if (!isNaN(deleteTimer)) {
    msg.delete(deleteTimer)
      
  }
          })
}