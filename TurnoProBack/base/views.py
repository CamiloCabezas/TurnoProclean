from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Usuario, Empleado, Empresa, TipoTurno, TurnoAsignado
from .serializers import EmpleadoSerializer, TurnoAsignadoSerializer

@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def get_user_empresa(request, empresa):
    try:
        empresa_obj = Empresa.objects.get(nombre=empresa)
        print(empresa)
    except Empresa.DoesNotExist:
        return Response({"error": "Empresa no encontrada"}, status=404)
    

    empleados = Empleado.objects.filter(empresa=empresa_obj)

    if not empleados.exists():
        return Response({'message': 'No hay empleados para esta empresa'}, status=404)
    
    serializer = EmpleadoSerializer(empleados, many=True)
    return Response(serializer.data, status=200)



@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def asignacion_turnos(request):
    empleado_id = request.data.get("empleado_id")
    tipo_turno = request.data.get("tipo_turno")
    fecha = request.data.get("fecha")

    if not empleado_id or not tipo_turno or not fecha:
        return Response({"Error":"Faltan Campos requeridos para poder asignar el turno"})

    try:
        tipo_turno = TipoTurno.objects.get(nombre = tipo_turno)
    except TipoTurno.DoesNotExist:
        return Response({"Error":"El tipo de turno no existe"}, status=404)
    
    try:
        empleado = Empleado.objects.get(id=empleado_id)
    except Empleado.DoesNotExist:
        return Response({"Error":"El Usuario al que le quieres asignar el turno no existe"})
    
    turno_asignado = TurnoAsignado.objects.create(
        empleado = empleado,
        tipo_turno = tipo_turno,
        fecha = fecha

    )

    serializer = TurnoAsignadoSerializer(turno_asignado)
    return Response(serializer.data, status=201)









#Ver como se va a presentar en el front






