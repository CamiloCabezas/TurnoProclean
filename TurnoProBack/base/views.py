from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from .models import Usuario, Empleado, Empresa, TipoTurno, TurnoAsignado
from .serializers import EmpleadoSerializer, EmpresaSerializer, EmpresaRegisterSerializer, TurnoAsignadoSerializer, TipoTurnoSerializer
from django.utils import timezone
from datetime import datetime

@api_view(['GET'])
@permission_classes([IsAuthenticated])
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
        empresa_obj = Empresa.objects.get(id=empresa)
    except Empresa.DoesNotExist:
        return Response({"error": "Empresa no encontrada"}, status=404)
    

    empleados = Empleado.objects.filter(empresa=empresa_obj)

    if not empleados.exists():
        return Response({'message': 'No hay empleados para esta empresa'}, status=404)
    

    
    fecha_inicio = request.data.get("fecha_inicio")
    fecha_fin = request.data.get("fecha_fin")

    turnos = TurnoAsignado.objects.filter(empleado__in=empleados)

    if fecha_inicio and fecha_fin:
        turnos = turnos.filter(fecha__range=[fecha_inicio, fecha_fin])

    

    if not turnos.exists():
        return Response({"message": "No hay turnos asignados para los filtros dados."}, status=404)

    serializer = TurnoAsignadoSerializer(turnos, many=True)
    return Response(serializer.data, status=200)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def asignacion_turnos(request):
    empleado_id = request.data.get("empleado_id")
    tipo_turno_id = request.data.get("tipo_turno")
    fecha = request.data.get("fecha")

    if not empleado_id or not tipo_turno_id or not fecha:
        return Response(
            {"error": "Faltan campos requeridos"},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        tipo_turno = TipoTurno.objects.get(id=tipo_turno_id)
        empleado = Empleado.objects.get(id=empleado_id)
    except (TipoTurno.DoesNotExist, Empleado.DoesNotExist):
        return Response(
            {"error": "Empleado o tipo de turno no existe"},
            status=status.HTTP_404_NOT_FOUND
        )

    existe = TurnoAsignado.objects.filter(
        empleado=empleado,
        tipo_turno=tipo_turno,
        fecha=fecha
    ).exists()

    if existe:
        return Response(
            {
                "error": "Este empleado ya tiene asignado este turno en esta fecha"
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    turno_asignado = TurnoAsignado.objects.create(
        empleado=empleado,
        tipo_turno=tipo_turno,
        fecha=fecha
    )

    serializer = TurnoAsignadoSerializer(turno_asignado)
    return Response(serializer.data, status=status.HTTP_201_CREATED)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
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


@api_view(["GET"])
@permission_classes([IsAuthenticated]) 
def get_tipoTurnos(request):
    tipoTurnos = TipoTurno.objects.all()

    if not tipoTurnos:
        return Response({"Error":"No hay turnos creados"})
    
    serializer = TipoTurnoSerializer(tipoTurnos, many=True)
    return Response(serializer.data, status=200)
    

@api_view(['POST'])
@permission_classes([AllowAny])
def register_empresa(request):
    username = request.data.get("username")
    password = request.data.get("password")
    email = request.data.get("email")
    nombre = request.data.get("nombre")
    nit = request.data.get("nit")
    descripcion = request.data.get("descripcion")
    direccion = request.data.get("direccion")
    logo = request.data.get("logo")

    if not username or not password or not email or not nombre or not nit or not descripcion or not direccion :
        return Response({"error": "Faltan campos requeridos"}, status=400)
    
    serializer = EmpresaRegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_empresas(request):
    empresas = Empresa.objects.all()
    serializer = EmpresaSerializer(empresas, many=True)
    return Response(serializer.data, status=200)

#Ver como se va a presentar en el front






