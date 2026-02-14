from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Empresa, Empleado, TipoTurno, TurnoAsignado
from datetime import datetime, timedelta
from django.utils import timezone

Usuario = get_user_model()

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = [
            'id',
            'username',
            'email',
            'rol',
            'genero',
            'years',
            'fecha_creacion',
        ]
        read_only_fields = ['id', 'fecha_creacion']

class EmpresaSerializer(serializers.ModelSerializer):
    usuario = UsuarioSerializer(read_only=True)

    class Meta:
        model = Empresa
        fields = [
            'id',
            'usuario',
            'nombre',
            'nit',
            'descripcion',
            'direccion',
            'logo',
        ]        
class EmpleadoSerializer(serializers.ModelSerializer):
    usuario = UsuarioSerializer(read_only=True)
    empresa = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Empleado
        fields = [
            'id',
            'usuario',
            'empresa',
            'cargo',
            'fecha_ingreso',
            'nombre',
            'apellido',
            'num_identificacion',
            'foto_perfil',
        ]

class TipoTurnoSerializer(serializers.ModelSerializer):
    duracion_horas = serializers.SerializerMethodField()

    class Meta:
        model = TipoTurno
        fields = [
            'id',
            'nombre',
            'hora_inicio',
            'hora_fin',
            'duracion',
            'duracion_horas',
        ]
        read_only_fields = ['duracion', 'duracion_horas']

    def get_duracion_horas(self, obj):
        if obj.duracion:
            return round(obj.duracion.total_seconds() / 3600, 2)
        return 0
    

class TurnoAsignadoSerializer(serializers.ModelSerializer):
    empleado = serializers.StringRelatedField(read_only=True)
    tipo_turno = TipoTurnoSerializer(read_only=True)
    horas_trabajadas = serializers.SerializerMethodField()

    class Meta:
        model = TurnoAsignado
        fields = [
            'id',
            'empleado',
            'tipo_turno',
            'fecha',
            'hora_ingreso_real',
            'hora_salida_real',
            'horas_trabajadas',
        ]

    def get_horas_trabajadas(self, obj):


        if obj.hora_ingreso_real and obj.hora_salida_real:
            ingreso = datetime.combine(timezone.now().date(), obj.hora_ingreso_real)
            salida = datetime.combine(timezone.now().date(), obj.hora_salida_real)
            if salida <= ingreso:
                salida += timedelta(days=1)
            horas = (salida - ingreso).total_seconds() / 3600
            return round(horas, 2)
        return 0

class EmpresaRegisterSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True)

    class Meta:
        model = Empresa
        fields = (
            "username",
            "email",
            "password",
            "nombre",
            "nit",
            "descripcion",
            "direccion",
            "logo",
        )

        def create(self, validated_data):
            user = Usuario.objects.create_user(
                username=validated_data["username"],
                email=validated_data["email"],
                password=validated_data["password"],
                rol="empresa",
            )
            empresa = Empresa.objects.create(
                usuario=user,
                nombre=validated_data["nombre"],
                nit=validated_data["nit"],
                descripcion=validated_data["descripcion"],
                direccion=validated_data["direccion"],
                logo=validated_data["logo"])

            return empresa


            