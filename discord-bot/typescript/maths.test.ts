import { assertEquals } from 'assert';
import { arithmetic, Operators } from './maths.ts';

Deno.test('Calculation test', () => {
	assertEquals(arithmetic(3, 478, Operators.Plus), 481);
	assertEquals(arithmetic(20, 46, Operators.Minus), -26);
	assertEquals(arithmetic(27, 478, Operators.Multiply), 12_906);
});

Deno.test('Division test', (test) => {
	test.step('Casual division', () => {
		assertEquals(arithmetic(20, 4, Operators.Divide), 5);
	});

	test.step('Rational division', () => {
		assertEquals(arithmetic(16, 3, Operators.Divide), 5.333333333333333);
	});

	test.step('Divide by 0 Handling', () => {
		assertEquals(arithmetic(5, 0, Operators.Divide), '[Indivisible by 0]');
	});
});
