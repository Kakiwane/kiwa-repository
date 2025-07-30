const { ActivityType } = require("discord.js");

module.exports = {
    name: "ready",
    once: true,
    execute(client) {
      console.log(`✅ Bot berhasil login sebagai ${client.user.tag}`);
      client.startTime = Date.now();
      client.user.setActivity("/list", { type: ActivityType.Playing });
    },
  };
  

  