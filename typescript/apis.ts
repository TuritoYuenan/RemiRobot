export interface Quote {
	/** Quote */
	q: string
	/** Author */
	a: string
	/** HTML format */
	h: string
}

/**
 * Get a randomised quote from ZenQuotes.io
 * @access Must be used with await
 */
export async function getQuote(): Promise<Quote> {
	const response = await fetch('https://zenquotes.io/api/random');
	const quoteData = await response.json();

	return quoteData[0];
}
