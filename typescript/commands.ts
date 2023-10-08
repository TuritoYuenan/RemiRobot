import { SlashCommandPartial } from 'harmony';

export const commands: SlashCommandPartial[] = [
	{
		name: 'ping',
		description: 'Return Article 18 in the UDHR',
	},
	{
		name: "spell",
		description: "Spell out the inputed word",
		options: [{
			name: "input",
			description: "Word to spell",
			type: "STRING"
		}],
	}
];
