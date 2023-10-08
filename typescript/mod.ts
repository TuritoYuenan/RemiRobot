import { Client, EmbedPayload, Intents, Interaction, event, slash } from "./deps.ts";
import { commands } from "./commands.ts";
import { strings } from "./strings.ts";

const token: string = Deno.env.get("TOKEN") || "";
const srvID: string = Deno.env.get("SERVER") || "";

class RemiBot extends Client {
	@event('ready')
	bootstrap() {
		console.log("RemiBot online!")
		commands.forEach(command => {
			this.interactions.commands.create(command, srvID)
				.then(cmd => console.log(`Created Slash Command ${cmd.name}!`))
				.catch(cmd => console.log(`Failed to create ${cmd.name} command!`));
		})
	}

	@slash('ping')
	ping(i: Interaction) {
		const pong: EmbedPayload = {
			author: { name: 'United Nations' },
			title: strings.article18.title,
			description: strings.article18.text,
			color: 0x009EDB
		};

		i.respond({ embeds: [pong] })
	}

	@slash('spell')
	spell(i: Interaction) {
		const spelt: EmbedPayload = {}
		i.respond({ embeds: [spelt] })
	}
}

const bot = new RemiBot();
bot.connect(token, Intents.None);
