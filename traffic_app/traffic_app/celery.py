import os
from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'traffic_app.settings')

app = Celery('tuto')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks() #search for a file named tasks



@app.task(bind=True)
def debug_task(self):
    print('Request: {0!r}'.format(self.request))