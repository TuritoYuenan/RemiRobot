'''Weather module powered by Accuweather'''
from datetime import datetime
import requests, json

#Getting
aKey = input("API Key for AccuWeather: ")
icoA = 'https://avatars.githubusercontent.com/u/44904471'
icoB = 'https://i.pinimg.com/originals/a8/7a/4a/a87a4a2994d5981084edf43747803f19.jpg'

aAPI = lambda x: json.loads(requests.get('https://dataservice.accuweather.com/'+x).text)[0]
lAPI = aAPI('locations/v1/cities/search?apikey='+aKey+'&q=ho%20chi%20minh')
wAPI = aAPI('currentconditions/v1/'+lAPI['Key']+'?apikey='+aKey+'&details=true')
#Processing
APITime = wAPI['LocalObservationDateTime']
rpTime = datetime.strftime(datetime.strptime(APITime, '%Y-%m-%dT%H:%M:%S+07:00'), '%Y-%m-%d %H:%M:%S')
wind = [wAPI['Wind']['Direction'], wAPI['Wind']['Speed']['Metric']]
temp = [wAPI['Temperature']['Metric'], wAPI['RealFeelTemperature']['Metric']]
p, v = wAPI['Pressure']['Metric'], wAPI['Visibility']['Metric']

#Reporting
overview = wAPI['WeatherText']
location = lAPI['EnglishName']+', '+lAPI['Country']['EnglishName']
widSpeed = str(wind[1]['Value'])   +' '+ wind[1]['Unit']
widDirec = str(wind[0]['Degrees']) +' '+ wind[0]['English']

mainReport = [
    ['UV Index'   , wAPI['UVIndexText']],
    ['Humidity'   , str(wAPI['RelativeHumidity'])+'%'],
    ['Pressure'   , str(p['Value'])+' '+p['Unit']],
    ['Visibilty'  , str(v['Value'])+' '+v['Unit']],
    ['Temperature', str(temp[0]['Value'])+' '+temp[0]['Unit']],
    ['RealFeel'   , str(temp[1]['Value'])+' '+temp[1]['Unit']],
    ['Wind'       , widSpeed+', '+widDirec]
]
