import { assertEquals } from 'assert';
import { Operators, arithmetic } from './maths.ts';

Deno.test("Calculation test", () => {
	assertEquals(arithmetic(3, 478, Operators.Plus), 481);
	assertEquals(arithmetic(20, 46, Operators.Minus), -26);
	assertEquals(arithmetic(27, 478, Operators.Multiply), 12_906)
})

Deno.test("Division test", () => {
	assertEquals(arithmetic(20, 4, Operators.Divide), 5);
	assertEquals(arithmetic(150, 2, Operators.Divide), 75);
	assertEquals(arithmetic(2048, 512, Operators.Divide), 4);
	assertEquals(arithmetic(2, 10, Operators.Divide), 0.2);
	assertEquals(arithmetic(16, 3, Operators.Divide), 5.333333333333333);
	assertEquals(arithmetic(5, 0, Operators.Divide), '[Indivisible by 0]');
})
