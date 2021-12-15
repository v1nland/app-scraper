export const messageCreate = (message) => {
  if (message.author.bot) return false;

  console.log(`message from "${message.author.username}": "${message.content}"`);

  message.channel.send(`Hello, ${message.author.username}!`);
};
