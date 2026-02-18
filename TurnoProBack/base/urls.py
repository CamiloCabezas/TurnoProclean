from django.urls import path
from .views import get_user_empresa, asignacion_turnos, get_turnos_asignados, maracaje_turno, get_tipoTurnos, register_empresa, get_empresas
from django.urls import path
from rest_framework_simplejwt.views import ( TokenObtainPairView,TokenRefreshView)

urlpatterns = [
    path("empleados/<str:empresa>/", get_user_empresa),
    path("asignarTurnos/", asignacion_turnos),
    path("TurnosAsignados/<str:empresa>/", get_turnos_asignados),
    path("maracaje_turno/", maracaje_turno),
    path("tipoTurnos/", get_tipoTurnos),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("register_empresa/", register_empresa),
    path("empresas/", get_empresas)
]