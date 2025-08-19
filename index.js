// AlessBot - automático /stock cada 2 horas + comando /talk
const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require("discord.js");

const TOKEN = "MTQwNjc2MTUxODM0NzA2MzMxOA.Ga9q8t.8H40GWouS4Ujgg5OkNfdpJnLsjWGr0jW4YYQG8";             // token de tu bot
const CLIENT_ID = "1406761518347063318";          // Application ID (en Developer Portal)
const GUILD_ID = "1406597186124251229";      // ID de tu servidor
const CHANNEL_ID = "1406756138774564938";   // ID del canal donde enviará /stock

// Crear cliente
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

// -------- REGISTRAR COMANDO /talk --------
const commands = [
  new SlashCommandBuilder()
    .setName("talk")
    .setDescription("El bot responde con hola")
].map(cmd => cmd.toJSON());

const rest = new REST({ version: "10" }).setToken(TOKEN);

(async () => {
  try {
    console.log("⏳ Registrando comandos...");
    await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      { body: commands }
    );
    console.log("✅ Comando /talk registrado");
  } catch (error) {
    console.error("❌ Error al registrar comandos:", error);
  }
})();

// -------- BOT LISTO --------
client.once("ready", () => {
  console.log(`✅ AlessBot conectado como ${client.user.tag}`);

  // Cada 2 horas manda /stock
  setInterval(() => {
    const channel = client.channels.cache.get(CHANNEL_ID);
    if (channel) {
      channel.send("/stock"); // este mensaje lo captará tu otro bot
    }
  }, 2 * 60 * 60 * 1000); // 2 horas
});

// -------- MANEJAR COMANDO /talk --------
client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "talk") {
    await interaction.reply("hola 👋");
  }
});

client.login(TOKEN);


