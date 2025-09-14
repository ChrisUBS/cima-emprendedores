# 🎓 Cimarrones Emprendedores

**Cimarrones Emprendedores** es una plataforma web desarrollada en la **UABC** para el registro e inscripción de participantes a talleres de emprendimiento. 

El sistema permite a los usuarios registrarse en talleres y recibir un correo de confirmación con un **código QR** para llevar control de asistencia el día del evento. 

Asimismo, cuenta con un rol de administrador que gestiona el sistema completo.

---

## 🚀 Tecnologías utilizadas

- **Frontend:** HTML, CSS, Bootstrap, JavaScript  
- **Backend:** PHP, MySQL  
- **Servidor local:** XAMPP  
- **Dependencias:** Composer (para librerías en `BE/`)  

---

## ⚙️ Instalación y configuración

1. Clonar el repositorio:  
   ```bash
   git clone https://github.com/ChrisUBS/cimarrones-emprendedores.git
    ```

2. Hay que mover el proyecto a la carpeta **htdocs** de XAMPP.

3. En la carpeta **BE**, instalar las dependencias con Composer:
    ```bash
    composer install
    ```
4. Habilitar la extensión gd en el archivo **php.ini** (necesaria para generar QR).

5. Configurar las variables globales:
    - Copiar el archivo **.env.example** a **.env**.
    - Editar **.env** con las credenciales del correo electrónico y el acceso a tu base de datos MySQL.

6. Si se requiere hay que dar permisos de escritura a la carpeta donde se generan los QR (opcional):
    ```bash
    sudo chmod -R 777 /Applications/XAMPP/xamppfiles/htdocs/cimarrones-emprendedores/plugins/codes
    ```

7. Iniciar MySQL en XAMPP, crear una nueva base de datos e importar la plantilla de **BE/backupBasedata/cimarrones_emprendedores.sql**

8. Iniciar Apache en XAMPP y abrir en el navegador:
    - http://localhost/cimarrones-emprendedores
---

## 📌 Funcionalidades principales

### 👤 Usuarios:
- Registro en talleres.
- Recepción de correo de confirmación.
- Obtención de un QR único para asistencia.

### 🛠️ Administrador:
- Gestión de usuarios.
- Administración de talleres.
- Control de registros y asistencia.
---

## 🏫 Autores

Proyecto desarrollado por estudiantes de Ingeniería de Software en FCITEC - UABC.

---

## 📄 Licencia

Este software es propiedad de la Universidad Autónoma de Baja California (UABC).

Su uso, distribución o modificación está restringido salvo autorización expresa de la institución.

---

## 📬 Contacto

Para más información o soporte, escribir a: software.fcitec@uabc.edu.mx