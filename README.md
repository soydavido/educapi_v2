# ¡Bienvenido a la API de las Cartas del curso Avanzado de Espacio Educa! 🃏✨

Esta API te permitira crear, consultar, modificar y eliminar las cartas que tengas en tu posesion.

## 🚀 Documentación de la API - ¡Descubre el Poder de las Cartas!

Direccion de la API

```
https://educapi-v2.onrender.com
```

### 🎴 GET /card - ¡Colecciona tus Cartas!
Obtén una lista paginada de cartas con filtros opcionales. ¡Como si estuvieras navegando por tu colección infinita! 📚

Para todos los request, debes tener un encabezado (header) de la peticion el cual se llama **UserSecretPasskey** y es unico para cada uno de los alumnos. 

**Peticion:**

**Headers:**
- `usersecretpasskey`: Como parte del primer ejemplo, puedes usar el **UserSecretPasskey** de prueba y su valor es "USR-SECRET-99"

Ejemplo:
Tipo de peticion - GET
```
https://educapi-v2.onrender.com/card
```


**Respuesta:**
```json
{
  "data": [
    {
      "idCard": 1,
      "name": "Carta Ejemplo",
      "description": "Descripción",
      "attack": 1000,
      "defense": 800,
      "lifePoints": 1500,
      "pictureUrl": "https://example.com/image.jpg",
      "attributes": {},
      "userSecret": null,
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": null
    }
  ],
  "total": 1,
  "page": 1,
  "limit": 20
}
```

### 🆕 POST /card - ¡Crea tu Carta Legendaria!
Crea una nueva carta. ¡Sé el creador de leyendas! ⚡

**Headers:**
- `usersecretpasskey` (string, opcional): Si pones `'USR-SECRET-99'`, ¡boom! Error 403 Forbidden. 😱 

Ejemplo:
Tipo de peticion - POST
```
https://educapi-v2.onrender.com/card
```

**Cuerpo de la Petición (Request Body):**
```json
{
  "name": "Nueva Carta",
  "description": "Descripción opcional",
  "attack": 2000,
  "defense": 1500,
  "lifePoints": 2500,
  "pictureUrl": "https://example.com/image.jpg",
  "attributes": {"tipo": "Mago"}
}
```

**Respuesta (¡Éxito! 🎉):**
```json
{
  "idCard": 2,
  "name": "Nueva Carta",
  "description": "Descripción opcional",
  "attack": 2000,
  "defense": 1500,
  "lifePoints": 2500,
  "pictureUrl": "https://example.com/image.jpg",
  "attributes": {"tipo": "Mago"},
  "userSecret": "secreto",
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": null
}
```

**Respuesta (Error 403 - ¡Acceso Denegado! 🚫):**
```json
{
  "statusCode": 403,
  "message": "No es posible crear cartas con el userSecretPassKey proporcionado"
}
```

### 🔍 GET /card/:id - ¡Una Carta en Específico!
Recupera una sola carta usando su `idCard`. Devuelve el mismo formato paginado que el listado general, con `data` conteniendo un único elemento.

**Headers:**
- `usersecretpasskey`: requerido para filtrar tu colección.

Ejemplo:
Tipo de peticion - GET
```
https://educapi-v2.onrender.com/card/123
```

**Respuesta:**
```json
{
  "data": [
    {
      "idCard": 123,
      "name": "Dragón de Obsidiana",
      "description": "...",
      "attack": 85,
      "defense": 60,
      "lifePoints": 120,
      "pictureUrl": "https://...",
      "attributes": {"elemento": "Fuego"},
      "userSecret": "USR-SECRET-99",
      "createdAt": "2026-02-07T03:48:10.874Z",
      "updatedAt": null
    }
  ],
  "total": 1,
  "page": 1,
  "limit": 1
}
```

### 🗑️ DELETE /card/:id - ¡Elimina una Carta! 💥
Borra la carta identificada por `idCard`. Se requiere el header secreto para validar que tienes permiso.

**Headers:**
- `usersecretpasskey`: obligatorio.

Ejemplo:
Tipo de peticion - DELETE
```
https://educapi-v2.onrender.com/card/123
```

**Respuesta (éxito):**
```json
{
  "message": "Carta eliminada satisfactoriamente"
}
```

**Respuesta (404 - No encontrada):**
```json
{
  "statusCode": 404,
  "message": "Carta no encontrada"
}
```

