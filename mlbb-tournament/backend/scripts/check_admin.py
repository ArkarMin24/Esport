import urllib.request
url='http://127.0.0.1:8000/admin/'
try:
    with urllib.request.urlopen(url, timeout=5) as r:
        print('Status', r.status)
        print('Length', len(r.read()))
except Exception as e:
    print('Error requesting admin:', type(e).__name__, e)
