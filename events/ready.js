const { ActivityType } = require("discord.js");

module.exports = {
    name: "ready",
    once: true,
    execute(client) {
      console.log(`✅ Bot berhasil login sebagai ${client.user.tag}`);
      client.user.setActivity("/list", { type: ActivityType.Playing });
    },
  };
  

  