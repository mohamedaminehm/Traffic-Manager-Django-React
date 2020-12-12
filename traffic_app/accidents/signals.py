from django.dispatch import Signal

new_accident = Signal(providing_args="data")