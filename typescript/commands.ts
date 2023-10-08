import { SlashCommandPartial } from "./deps.ts";

export const commands: SlashCommandPartial[] = [
    {
        name: "ping",
		description: "Return Article 18 in the Universal Declaration of Human Rights",
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
