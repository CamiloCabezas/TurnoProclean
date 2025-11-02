from django.contrib import admin
from .models import Usuario, Empresa, Empleado, TipoTurno, TurnoAsignado

admin.site.register(Usuario)
admin.site.register(Empresa)
admin.site.register(Empleado)
admin.site.register(TipoTurno)
admin.site.register(TurnoAsignado)