from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser
from datetime import datetime, timedelta
from django.utils import timezone

class Usuario(AbstractUser):
    ROLES = (
        ('admin', 'Administrador'),
        ('empresa', 'Empresa'),
        ('empleado', 'Empleado'),
    )

    GENEROS = (
        ('M', 'Masculino'),
        ('F', 'Femenino'),
        ('O', 'Otro'),
    )

    email = models.EmailField(unique=True)
    rol = models.CharField(max_length=20, choices=ROLES, default='empleado')
    genero = models.CharField(max_length=2, choices=GENEROS, default='O')
    years = models.PositiveIntegerField(null=True, blank=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return f"{self.username} ({self.rol})"
    
class Empresa(models.Model):
    usuario = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='empresa_perfil'
    )
    nombre = models.CharField(max_length=100)
    nit = models.CharField(max_length=20, unique=True)
    descripcion = models.TextField(max_length=500, blank=True, null=True)
    direccion = models.CharField(max_length=100)
    logo = models.ImageField(upload_to='profile_image/', blank=True, null=True)

    def __str__(self):
        return self.nombre
    
    
class Empleado(models.Model):
    usuario = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='empleado_perfil'
    )
    empresa = models.ForeignKey(
        Empresa,
        on_delete=models.CASCADE,
        related_name='empleados'
    )
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    cargo = models.CharField(max_length=100)
    fecha_ingreso = models.DateField()
    num_identificacion = models.CharField(max_length=20, unique=True)
    foto_perfil =models.ImageField(upload_to='profile_image/', blank=True, null=True)

    def __str__(self):
        return f"{self.usuario.username} - {self.cargo} - {self.empresa}"


class TipoTurno(models.Model):
    nombre = models.CharField(max_length=50)
    hora_inicio = models.TimeField()
    hora_fin = models.TimeField()
    duracion = models.DurationField(editable=False, null=True, blank=True)

    def save(self, *args, **kwargs):

        hora_inicio_dt = datetime.combine(timezone.now().date(), self.hora_inicio)
        hora_fin_dt = datetime.combine(timezone.now().date(), self.hora_fin)

        if hora_fin_dt <= hora_inicio_dt:
            hora_fin_dt += timedelta(days=1)

        self.duracion = hora_fin_dt - hora_inicio_dt
        super().save(*args, **kwargs)

    def __str__(self):
        horas = self.duracion.total_seconds() / 3600 if self.duracion else 0
        return f"{self.nombre} ({horas:.1f} h)"


class TurnoAsignado(models.Model):
    empleado = models.ForeignKey(
        'Empleado',
        on_delete=models.CASCADE,
        related_name='turnos_asignados'
    )
    # empresa = models.ForeignKey(
    #     'Empresa', 
    #     on_delete=models.CASCADE,
    #     related_name='Empresa'
    # )

    tipo_turno = models.ForeignKey(
        TipoTurno,
        on_delete=models.CASCADE,
        related_name='asignaciones'
    )
    fecha = models.DateField(default=timezone.now)
    hora_ingreso_real = models.TimeField(null=True, blank=True)
    hora_salida_real = models.TimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.empleado.usuario.username} - {self.tipo_turno.nombre} ({self.fecha})"
