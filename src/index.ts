import { Client, GatewayIntentBits, Collection, Partials } from "discord.js";
import { config } from "dotenv";
import { readdirSync } from "fs";
import { join } from "path";
import type ApplicationCommand from "./templates/ApplicationCommand";
import type Event from "./templates/Event";
import type MessageCommand from "./templates/MessageCommand";

config();

const { TOKEN } = process.env;

const client = new Client({
  intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildMembers
  ],
  partials: [
      Partials.User,
      Partials.Message
  ]
});

const commandFiles: string[] = readdirSync("./commands").filter(
        (file) => file.endsWith(".js") || file.endsWith(".ts")
    )

for (const file of commandFiles) {
    const command: ApplicationCommand = (await import(`./commands/${file}`))
    .default as ApplicationCommand
    client.commands.set(command.data.name, command)
}

const msgCommandFiles: string[] = readdirSync("./messageCommands").filter(
        (file) => file.endsWith(".js") || file.endsWith(".ts")
        )

for (const file of msgCommandFiles) {
    const command: MessageCommand = (await import(`./messageCommands/${file}`))
    .default as MessageCommand
    client.msgCommands.set(command.name, command)
}

const eventFiles: string[] = readdirSync("./events").filter(
        (file) => file.endsWith(".js") || file.endsWith(".ts")
        )


for (const file of eventFiles) {
    const event: Event = (await import(`./events/${file}`)).default as Event
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args))
    } else {
        client.on(event.name, (...args) => event.execute(...args))
    }
}

await client.login(TOKEN);
