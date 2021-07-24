const Discord = require("discord.js");
const TOKENS = require("./tokens.js");

const getRandomMessage = () => new Promise((resolve) => {
  const discordClient = new Discord.Client();

  discordClient.login(TOKENS.discordToken);

  const randomNumber = (max = 100) => Math.floor(Math.random() * max);

  discordClient.on("ready", () => {
    const channel = discordClient.channels.cache.get(TOKENS.channelId);

    let targetNumber = randomNumber();
    channel.messages.fetch({ limit: targetNumber }).then(messagesCollection => {
      const messages = messagesCollection.array()
      if (messages.length < targetNumber + 1) {
        targetNumber = randomNumber(messages.length);
      }
      discordClient.destroy();
      resolve(messages[targetNumber].content);
    });
  });
});

module.exports = getRandomMessage;