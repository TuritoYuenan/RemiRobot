import { Client, EmbedPayload, event, Intents, Interaction, slash } from 'harmony';
import { arithmetic } from './maths.ts';
import { commands } from './commands.ts';
import { strings } from './strings.ts';
import 'dotenv';

const token: string = Deno.env.get('TOKEN') || '';
const srvID: string = Deno.env.get('SERVER') || '';

class RemiBot extends Client {
	@event('ready')
	bootstrap() {
		console.log('RemiBot is online!');
		for (const command of commands) {
			this.interactions.commands.create(command, srvID)
				.then((cmd) => console.log(`🟩 Command /${cmd.name} ONLINE`))
				.catch((cmd) => console.log(`🔴 Command /${cmd.name} FÄLLT AUS`));
		}
	}

	@slash('ping')
	ping(i: Interaction) {
		const pong: EmbedPayload = {
			author: { name: 'United Nations' },
			title: strings.article18.title,
			description: strings.article18.text,
			color: 0x009EDB,
		};

		i.respond({ embeds: [pong] });
	}

	@slash('spell')
	spell(i: Interaction) {
		if ('options' in i.data!) {
			const input = i.data.options.find((e) => e.name == 'input');
			const word: string = input?.value;
			const spelt = word.split('').toString();
			i.respond({ content: spelt });
		}
	}

	@slash('calculate')
	calculate(i: Interaction) {
		if ('options' in i.data!) {
			const num1 = i.data.options.find((e) => e.name == 'num1')?.value;
			const num2 = i.data.options.find((e) => e.name == 'num2')?.value;
			const oprd = i.data.options.find((e) => e.name == 'operator')?.value;

			const result = arithmetic(num1, num2, oprd)

			const response: EmbedPayload = {
				title: `The result is ${result}`,
				description: `Calculate: ${num1} ${oprd} ${num2}`,
				color: 0xFFCC00,
			};

			i.respond({ embeds: [response] });
		}
	}
}

const bot = new RemiBot();
bot.connect(token, Intents.None);
