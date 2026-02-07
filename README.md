# 🕒 TurnoPro – Workforce & Shift Management System

**TurnoPro** es una aplicación web diseñada para que **empresas puedan gestionar su personal**, asignar **turnos de trabajo**, realizar **marcajes de entrada y salida**, y consultar la información de forma segura mediante **autenticación con JWT**.

El proyecto está pensado como una **solución tipo SaaS**, donde cada empresa puede administrar a sus empleados y sus turnos de manera organizada y centralizada.

---

## 🎯 Problema que resuelve

Muchas empresas pequeñas y medianas:
- Manejan turnos de forma manual
- No tienen control claro de entradas y salidas
- No cuentan con sistemas simples y económicos para gestionar horarios

**TurnoPro** soluciona esto permitiendo:
- Asignar turnos por empleado y fecha
- Registrar marcajes de entrada y salida
- Filtrar información por rangos de fechas
- Proteger la información con autenticación segura

---

## 🚀 Funcionalidades principales

### 🔐 Autenticación
- Login con **JWT (access y refresh tokens)**
- Tokens almacenados en `localStorage`
- Rutas protegidas en el frontend
- Logout seguro

### 👥 Gestión de empleados
- Consulta de empleados por empresa
- Relación empresa → empleados

### 📆 Gestión de turnos
- Asignación de turnos por:
  - Empleado
  - Tipo de turno
  - Fecha
- Validación para evitar turnos duplicados en el mismo día

### ⏱️ Marcaje de turnos
- Registro de:
  - Entrada
  - Salida
- Asociación del marcaje a un turno asignado

### 🔎 Filtros avanzados
- Filtro por rango de fechas
- Estado global de filtros usando **Redux Toolkit**
- Aplicación de filtros bajo demanda (botón)

---

## 🧠 Arquitectura

### Backend
- API REST
- Autenticación con JWT
- Relaciones:
  - Empresa
  - Empleado
  - Turno
  - Marcajes
- Validaciones de negocio (turnos duplicados, datos obligatorios)

### Frontend
- SPA (Single Page Application)
- Consumo de API REST
- Manejo de estado global
- Protección de rutas

---

## 🛠️ Tecnologías utilizadas

### Backend
- Django
- Django REST Framework
- JWT Authentication
- PostgreSQL / SQLite (según entorno)

### Frontend
- React
- React Router DOM
- Redux Toolkit
- Axios
- Bootstrap
- Vite

---

## 📂 Estructura general del proyecto

