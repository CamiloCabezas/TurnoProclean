from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Usuario, Empleado, Empresa, TipoTurno, TurnoAsignado
from .serializers import EmpleadoSerializer, TurnoAsignadoSerializer
from django.utils import timezone
from datetime import datetime

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
def get_turnos_asignados(request, empresa):
    try:
        empresa_obj = Empresa.objects.get(nombre=empresa)
    except Empresa.DoesNotExist:
        return Response({"error": "Empresa no encontrada"}, status=404)
    

    empleados = Empleado.objects.filter(empresa=empresa_obj)

    if not empleados.exists():
        return Response({'message': 'No hay empleados para esta empresa'}, status=404)
    

    fecha = request.data.get('fecha')
    fecha_inicio = request.data.get('fecha_inicio')
    fecha_fin = request.data.get('fecha_fin')

    turnos = TurnoAsignado.objects.filter(empleado__in=empleados)

    if fecha:
        turnos = turnos.filter(fecha=fecha)

    if fecha_inicio and fecha_fin:
        turnos = turnos.filter(fecha__range=[fecha_inicio, fecha_fin])

    if not turnos.exists():
        return Response({"message": "No hay turnos asignados para los filtros dados."}, status=404)

    serializer = TurnoAsignadoSerializer(turnos, many=True)
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

@api_view(['GET'])
def maracaje_turno(request):
    print(request.data)
    turno_id = request.data.get("turno_id")
    tipo_marca = request.data.get("tipo_marca")
    hora_marca = request.data.get("hora_marca")

    if not turno_id or not tipo_marca:
        return Response({"Error":"Debes indicar el turno y la marca"}, status=400)
    
    if tipo_marca not in ["entrada", 'salida']:
        return Response({"Error":"El tipo de marcaje debe ser salida o ingres"})
    
    try:
        turno = TurnoAsignado.objects.get(id = turno_id)
    except TurnoAsignado.DoesNotExist:
        return Response({"Error":"Turno no Existe"}, status=404)
    

    if hora_marca :
        try:
            hora = datetime.strptime(hora_marca, "%H:%M:%S").time()
        except ValueError:
            return Response(
                {"error": "Formato de hora inválido (HH:MM:SS)"},
                status=400)
    else:
        hora = timezone.localtime().time()

    if tipo_marca == "entrada":
        if turno.hora_ingreso_real:
            return Response({"Error":"La entrada ya fue marcada"}, status=400)
    
        turno.hora_ingreso_real=hora
        turno.save()

        return Response({
            'message':'Entrada registrada correctamente',
            'hora':str(hora)
        }, status=200)
    
    if tipo_marca == "salida":
        if not turno.hora_ingreso_real:
            return Response({"Error":"No puedes marcar la salida sin haber marcado la entrada"}, status=400)
        
        if turno.hora_salida_real:
            return Response({"error" : "La salida ya fue marcada"}, status=400)
        
        turno.hora_salida_real = hora
        turno.save()

        return Response({
            "message": "Salida registrada correctamente",
            "hora": str(hora)
        }, status=200)








#Ver como se va a presentar en el front






