from django.urls import path
from .views import get_user_empresa, asignacion_turnos, get_turnos_asignados

urlpatterns = [
    path("empleados/<str:empresa>/", get_user_empresa),
    path("asignarTurnos/", asignacion_turnos),
    path("TurnosAsignados/<str:empresa>/", get_turnos_asignados),
]