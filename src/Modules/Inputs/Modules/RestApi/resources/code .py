import requests

# 1. Login and get an access token

login_url = "https://api.caracal.cloud/account/login/"

login_payload = {
    'email': 'joe@example.com',
    'password': 'Happy123'
}

login_res = requests.post(login_url, data=payload).json()
access_token = login_res.access_token

# 2. Add a record

add_url = "https://api.caracal.cloud/source/add_record/"

add_payload = {
	"write_key": "YOUR_WRITE_KEY",
	"datetime_recorded": "2020-01-01 10:20:30",
	"lat": 20.000,
	"lon": 20.000,
	"device_id": "abc123",
	"alt_m": 12.00,
	"speed_kmh": 42.00,
	"temp_c": 23.00
}

add_headers = {
    'Authorization': 'JWT ' + access_token
}

add_res = requests.post(add_url, headers=login_headers, data=add_payload)