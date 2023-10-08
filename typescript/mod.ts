// Import dependencies from depts. Client is a class provided by the
// Harmony library and Intents is an enum used to specify bot intentions
// and permissions.
import { Client, Intents, Interaction } from "./deps.ts";
import { commands } from "./commands.ts";

// Retrieve the bot token and serverID from the environmental variable.
const token: string = Deno.env.get("TOKEN") || "";
const serverID: string = Deno.env.get("SERVER") || "";

// This creates the bot class which extends the harmony class. Right now
// its basically just the bare minimum of what we need to fire up the bot.
class MyBot extends Client {
	constructor(updateCommands = false) {
		super();

		// Set up an event listener for the "ready" event. it will fire
		// when the bot is connected and ready to go.
		this.on("ready", () => {
			console.log("Ready!");

			// Check if updateCommands is set to true.
			if (updateCommands) {
				this.updateCommands();
			}
		});

		// Set up an event listener for interacting with the bot.
		this.on("interactionCreate", (interaction: Interaction) => {
			// If the interaction is not a slash command we return early.
			if (!interaction.isApplicationCommand()) return;

			// Extract the data sent with the application interaction.
			const { data } = interaction;

			// If its our ping command, respond with Pong!!
			if (data.name === "ping") {
				interaction.respond({
					content: "Pong!!",
				});
			}
		});
	}

	// This iterates over the commands and issues the create method for each.
	async updateCommands() {
		try {
			for (const cmd of commands) {
				await this.interactions.commands.create(cmd, serverID);
				console.log(`Created command ${cmd.name}!`);
			}
		} catch (err) {
			console.log(`Command creation failed: ${err}`);
		}
	}
}

// Create an instance of the bot. Set parameter to true if you
// want to create or update the commands.
const bot = new MyBot(true);

// Connecting the bot to discord using the token, we don't need any
// Intents for our usecase at the moment.
bot.connect(token, Intents.None);
