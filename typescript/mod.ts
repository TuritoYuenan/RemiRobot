import "dotenv";
import { Client, EmbedPayload, event, Intents, Interaction, slash } from 'harmony';
import { commands, Operators } from './commands.ts';
import { strings } from './strings.ts';

const token: string = Deno.env.get('TOKEN') || '';
const srvID: string = Deno.env.get('SERVER') || '';

class RemiBot extends Client {
	@event('ready')
	bootstrap() {
		console.log('RemiBot online!');
		commands.forEach((command) => {
			this.interactions.commands.create(command, srvID)
				.then((cmd) => console.log(`Created Slash Command ${cmd.name}!`))
				.catch((cmd) => console.log(`Failed to create ${cmd.name} command!`));
		});
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
			let result = 0;

			switch (oprd) {
				case Operators.Plus:
					result = num1 + num2;
					break;
				case Operators.Minus:
					result = num1 - num2;
					break;
				case Operators.Multiply:
					result = num1 * num2;
					break;
				case Operators.Divide:
					result = num1 / num2;
					break;
			}

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
