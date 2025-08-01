require("dotenv").config();
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const fs = require("fs");
const path = require("path");

// Inisialisasi bot dengan semua intent yang diperlukan
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,     // ✅ Diperlukan agar bisa baca jumlah dan daftar member
    GatewayIntentBits.GuildPresences    // ✅ Diperlukan agar bisa tahu siapa yang online
  ],
});

client.commands = new Collection();
client.textCommands = new Collection(); // Koleksi untuk command dengan `

// Load slash command files
const commandFiles = fs.readdirSync(path.join(__dirname, "commands")).filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data?.name || command.name, command);
  if (!command.data) {
    client.textCommands.set(command.name, command); // Simpan text command juga
  }
}

// Load event files
const eventFiles = fs.readdirSync(path.join(__dirname, "events")).filter(file => file.endsWith(".js"));
for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
}

// running
client.login(process.env.TOKEN);
