import {
	Client,
	EmbedPayload,
	event,
	Intents,
	slash,
	SlashCommandInteraction,
} from 'harmony';
import { arithmetic, trigonometry } from './maths.ts';
import { srvID, strings, token } from './strings.ts';
import { commands } from './commands.ts';
import { zenQuotes } from './apis.ts';

function option(i: SlashCommandInteraction, id: string) {
	return i.data.options.find((e) => e.name == id)!.value;
}

class RemiBot extends Client {
	@event('ready')
	bootstrap() {
		for (const command of commands) {
			this.interactions.commands.create(command, srvID)
				.then((cmd) => console.log(`🟩 Command /${cmd.name} ONLINE`))
				.catch((cmd) => console.log(`🔴 Command /${cmd.name} FAILED`));
		}
		console.log(`RemiBot ONLINE: https://discord.com/channels/${srvID}`);
	}

	@slash('ping')
	ping(i: SlashCommandInteraction) {
		const response: EmbedPayload = {
			author: { name: 'United Nations' },
			title: strings.article18.title,
			description: strings.article18.text,
			color: 0x009EDB,
			type: 'article',
		};

		i.respond({ embeds: [response] });
	}

	@slash('spell')
	spell(i: SlashCommandInteraction) {
		const input = option(i, 'data');
		const spelt = input.split('').toString();

		i.respond({ content: spelt });
	}

	@slash('quote')
	async quote(i: SlashCommandInteraction) {
		const data = await fetch(zenQuotes);
		const quote = await data.json();

		const response: EmbedPayload = {
			author: { name: quote[0].a }, // Author
			title: quote[0].q, // Quote
			provider: { name: 'Zen Quotes API', url: 'https://zenquotes.io' },
			color: 0x009473,
			type: 'article',
		};

		i.respond({ embeds: [response] });
	}

	@slash('calculate')
	calculate(i: SlashCommandInteraction) {
		const num1 = option(i, 'num1');
		const num2 = option(i, 'num2');
		const oprd = option(i, 'operator');

		const result = arithmetic(num1, num2, oprd);

		const response: EmbedPayload = {
			title: `The result is ${result}`,
			description: `Calculate ${num1} ${oprd} ${num2}`,
			color: 0xFFCC00,
		};

		i.respond({ embeds: [response], ephemeral: true });
	}

	@slash('trigonometry')
	calculateTrig(i: SlashCommandInteraction) {
		const type = option(i, 'type');
		const rad = option(i, 'radian');

		const result = trigonometry(type, rad);

		const response: EmbedPayload = {
			title: `The result is ${result}`,
			description: `Calculate ${type}(${rad})`,
		};

		i.respond({ embeds: [response], ephemeral: true });
	}
}

const bot = new RemiBot();
bot.connect(token, Intents.None);
