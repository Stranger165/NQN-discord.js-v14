const { Client, Discord } = require("discord.js");
const client = new Client({
  intents: [
      "GUILDS",
      "GUILD_MEMBERS",
      "GUILD_BANS",
      "GUILD_INTEGRATIONS",
      "GUILD_WEBHOOKS",
      "GUILD_INVITES",
      "GUILD_VOICE_STATES",
      "GUILD_PRESENCES",
      "GUILD_MESSAGES",
      "GUILD_MESSAGE_REACTIONS",
      "GUILD_MESSAGE_TYPING",
      "DIRECT_MESSAGES",
      "DIRECT_MESSAGE_REACTIONS",
      "DIRECT_MESSAGE_TYPING",
  ],
});
const { token } = require("./config.json")

client.on("ready", () => {
  console.log("[--------------------- R E A D Y ---------------------]");
  client.user.setActivity("CODED BY CORTEX CRAFT YT");
})

client.on("messageCreate", async (messageCreate) => {
  if (messageCreate.author.bot) return;
  let msg = messageCreate.content;

  let emojis = msg.match(/(?<=:)([^:\s]+)(?=:)/g)
  if (!emojis) return;
  emojis.forEach(m => {
    let emoji = client.emojis.cache.find(x => x.name === m)
    if (!emoji) return;
    let temp = emoji.toString()
    if (new RegExp(temp, "g").test(msg)) msg = msg.replace(new RegExp(temp, "g"), emoji.toString())
    else msg = msg.replace(new RegExp(":" + m + ":", "g"), emoji.toString());
  })

  if (msg === messageCreate.content) return;

  let webhook = await messageCreate.channel.fetchWebhooks();
  let number = randomNumber(1, 2);
  webhook = webhook.find(x => x.name === "NQN" + number);

  if (!webhook) {
    webhook = await messageCreate.channel.createWebhook(`NQN` + number, {
      avatar: client.user.displayAvatarURL({ dynamic: true })
    });
  }

  await webhook.edit({
    name: messageCreate.member.nickname ? messageCreate.member.nickname : messageCreate.author.username,
    avatar: messageCreate.author.displayAvatarURL({ dynamic: true })
  })

  messageCreate.delete().catch(err => { })
  webhook.send(msg).catch(err => { })

  await webhook.edit({
    name: `NQN` + number,
    avatar: client.user.displayAvatarURL({ dynamic: true })
  })


})



client.login(token);
//--------------------------------------------------- F U N C T I O N S --------------------------------------

function randomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
} 
