const Discord = require("discord.js");
const TOKENS = require("./tokens.js");

const getRandomMessage = () =>
  new Promise((resolve) => {
    const discordClient = new Discord.Client();

    discordClient.login(TOKENS.discordToken);

    const randomNumber = (max = 100) => Math.floor(Math.random() * max);

    discordClient.on("ready", async () => {
      let collection = new Discord.Collection();
      const channel = discordClient.channels.cache.get(TOKENS.channelId);

      let before;
      while (true) {
        const messagesCollection = await channel.messages.fetch({
          limit: 100,
          before,
        });

        collection = collection.concat(messagesCollection);

        const last = messagesCollection.last();
        if (last) {
          before = last.id;
        } else {
          break;
        }
      }

      const messages = collection.array();
      const targetNumber = randomNumber(messages.length);
      discordClient.destroy();
      resolve(messages[targetNumber].content);
    });
  });

module.exports = getRandomMessage;
