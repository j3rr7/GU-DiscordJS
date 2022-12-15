import { REST, Routes } from "discord.js";
import { RESTPostAPIApplicationCommandsJSONBody } from "discord.js";
import { readdirSync } from "fs";

const { TOKEN, CLIENT_ID } = process.env;

export default async function deployCommands() {
  const commands: RESTPostAPIApplicationCommandsJSONBody[] = [];
  const commandFiles: string[] = readdirSync("./commands").filter(
    (file) => file.endsWith(".js") || file.endsWith(".ts")
  );

  for (const file of commandFiles) {
    const command: ApplicationCommand = (await import(`./commands/${file}`))
      .default as ApplicationCommand;
    const commandData = command.data.toJSON();
    commands.push(commandData);
  }
}
