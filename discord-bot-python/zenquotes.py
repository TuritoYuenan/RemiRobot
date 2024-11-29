import requests, json

zenquotes = json.loads(requests.get('https://zenquotes.io/api/random').text)
quote = zenquotes[0]['q'] + ' - ' + zenquotes[0]['a']
