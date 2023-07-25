from interactions import (
	Client, OptionType,
	listen, user_context_menu,
	slash_command, slash_option
)
import math
import random
import remilib

robot = Client(token = remilib.TOKEN, debug_scope = remilib.SERVER)

######################################
############## COMMANDS ##############

@user_context_menu(name="Send virtual hug")
async def test(ctx):
	message = remilib.messageTemplate
	message.title = "Hugs!"
	message.description = f"Sending virtual hug to <@{ctx.target.user.id}>!"

	await ctx.send(embeds = message)



@slash_command(name='pat', description='Pat remi')
async def pat(ctx): await ctx.send('wah!')



@slash_command(name='echo', description='Repeat what you said')
@slash_option(
	name='input', description='what you said',
	opt_type=OptionType.STRING, required=True
)
async def echo(ctx, *, input: str):
	message = remilib.messageTemplate
	message.title = f'<@{ctx.author.id}> said:'
	message.description = input

	await ctx.send(embeds = message)



@slash_command(name='spell', description='Give you a list of letters from your word')
@slash_option(
	name='word', description='your word',
	opt_type=OptionType.STRING, required=True
)
async def spell(ctx, word: str):
	output = ", ".join([letter for letter in word])
	await ctx.send(output)



@slash_command(name='tellremi', description='Tell Remi')
@slash_option(
	name = 'input', description = 'What to tell',
	opt_type = OptionType.STRING, required = True,
	choices = [
		{'value':'nicejob', 'name':'Nice job'},
		{'value':'goodnight', 'name':'Good night'},
	]
)
async def tellremi(ctx, input: str):
	message = remilib.messageTemplate
	match input:
		case 'nicejob':
			message.title = 'tenkyou!'
		case 'goodnight':
			message.title = 'sleep well!!'

	await ctx.send(embeds = message)



@slash_command(name='calculate', description='Calculate two numbers')
@slash_option(
	name='num1', description='1st number',
	opt_type=OptionType.NUMBER, required=True
)
@slash_option(
	name='num2', description='2nd number',
	opt_type=OptionType.NUMBER, required=True
)
@slash_option(
	name='type', description='Operator',
	opt_type=OptionType.STRING, required=True, choices = remilib.operators
)
async def calculate(ctx, type: str, num1: float, num2: float):
	result = remilib.calculate(num1, num2, type)

	message = remilib.messageTemplate
	message.title = f'Your result is {str(result)}'
	message.description = f'Calculate {num1} {type} {num2}'

	await ctx.send(embeds = message)



@slash_command(name='trigonometry', description='Do trigonometry')
@slash_option(
	name='trig', description='Trig function',
	opt_type=OptionType.STRING, required=True, choices=remilib.trigFuncs
)
@slash_option(name='rad', description='Radian', opt_type=OptionType.NUMBER)
async def trigonometry(ctx, trig: str, rad: float = 1.0):
	result = remilib.trig(trig, rad)

	message = remilib.messageTemplate
	message.title = f'Your result is {result}'
	message.description = f'Calculate {trig}({rad}rad)'

	await ctx.send(embeds = message)



@slash_command(name='factorial', description='Calculate the factorial')
@slash_option(
	name='num', description='Number',
	opt_type=OptionType.INTEGER, required=True
)
async def factorial(ctx, num: int = 1):
	result = math.factorial(num)

	message = remilib.messageTemplate
	message.title = f'Your result is {result}'
	message.description = f'Factorial of {num}'

	await ctx.send(embeds = message)



@slash_command(name='randomnumber', description='Generate a random number')
@slash_option(
	name='from_num', description='Range bottom',
	opt_type=OptionType.INTEGER, required=True
)
@slash_option(
	name='to_num', description='Range top',
	opt_type=OptionType.INTEGER, required=True
)
async def randomnumber(ctx, from_num: int = 0, to_num: int = 100000):
	rnum = random.randint(from_num, to_num)

	message = remilib.messageTemplate
	message.title = f'Your number is {rnum}'
	message.description = f'Generate random number from {from_num} to {to_num}'

	await ctx.send(embeds = message)

######################################
############# ACTIVATION #############

@listen()
async def on_ready():
	print('Ready! Serving Discord server', remilib.SERVER)

robot.start()
