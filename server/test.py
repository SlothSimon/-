import urllib
import json
import urllib2

url = "http://simonproject.sinaapp.com/test.php"

values = {
	'msg': 'shenmegui',
}

data = json.JSONEncoder().encode(values)
print data
req = urllib2.Request(url, data)
response = urllib2.urlopen(req)
the_page = response.read()
print the_page