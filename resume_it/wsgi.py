"""
WSGI config for resume_it project.

Production configuration with WhiteNoise for static files.
For more information on this file, see
https://docs.djangoproject.com/en/6.0/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application
from whitenoise import WhiteNoise

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'resume_it.settings')

# Импортируем settings после установки переменной окружения
from django.conf import settings

# Получаем стандартное WSGI приложение Django
django_app = get_wsgi_application()

# Оборачиваем в WhiteNoise для обслуживания статических файлов
application = WhiteNoise(django_app, root=settings.STATIC_ROOT)

# Для медиа файлов (опционально, если веб-сервер не настроен)
application.add_files(settings.MEDIA_ROOT, prefix=settings.MEDIA_URL)