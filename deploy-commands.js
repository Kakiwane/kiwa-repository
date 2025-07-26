require("dotenv").config();
const { REST, Routes } = require("discord.js");
const fs = require("fs");
const path = require("path");
const { token, clientId } = require("./config");

const commands = [];
const commandFiles = fs.readdirSync(path.join(__dirname, "commands")).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  if (!command.data || !command.data.toJSON) {
    console.warn(`⚠️  Perintah di ${file} tidak valid dan dilewati.`);
    continue; 
  }
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "10" }).setToken(token);

(async () => {
  try {
    console.log("📡 Mendaftarkan perintah...");
    await rest.put(Routes.applicationCommands(clientId), { body: commands });
    console.log("✅ Perintah berhasil didaftarkan.");
  } catch (error) {
    console.error("❌ Gagal mendaftarkan perintah:", error);
  }
})();
