/**
 * Represents a quote
 */
export interface IQuote {
	/** Quote */
	text: string;

	/** Author */
	author: string;
}

/**
 * Get a randomised quote from ZenQuotes.io
 * @access Must be used with await
 */
export async function getQuote(): Promise<IQuote> {
	const response = await fetch('https://zenquotes.io/api/random');
	const quoteData = await response.json();

	return quoteData[0];
}
