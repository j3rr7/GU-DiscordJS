import type { ChatInputCommandInteraction } from "discord.js";

export default class SubCommand {
  execute: (interaction: ChatInputCommandInteraction) => Promise<void> | void;

  constructor(options: {
    execute: (interaction: ChatInputCommandInteraction) => Promise<void> | void;
  }) {
    this.execute = options.execute;
  }

  setExecute(
    executeFunction: (
      interaction: ChatInputCommandInteraction
    ) => Promise<void> | void
  ): void {
    this.execute = executeFunction;
  }
}
