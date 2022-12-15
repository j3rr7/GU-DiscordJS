import { Events } from "discord.js";
import Event from "../templates/Event";

export default new Event({
    name: Events.ClientReady,
    once: true,
    execute(): void {
        console.log(`Logged in as ${client.user?.tag as string}!`)
    },
})
