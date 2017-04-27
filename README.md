# NODEPOP (PRIMERA FASE) - GUÍA BÁSICA

_Nota: Este proyecto es simplemente un ejercicio para practicar el uso de Node.js y los diferentes módulos de npm (express, mongoose...). No tiene ninguna utilidad práctica_

## Arranque de la base de datos

1. Realiza la conexión con el servidor de la base de datos "localhost:27017".
2. Ejecuta el comando "npm run installDB" en la consola.

## Inicio de sesión

1. Conectar a "http://localhost:3000/nodepop" (o usar Postman en caso alternativo).
2. Inicia sesión con una cuenta que hayas introducido en la base de datos.
3. Guarda el token mostrado y vuelve a la pantalla de inicio.

## Listado de anuncios

Accede a la lista de anuncios a través de la dirección "http://localhost:3000/nodepop/anuncios?token=mitoken", donde mitoken es el token que hemos guardado previamente.

### Filtros

Los filtros se añaden en la dirección. "Ejemplo: http://localhost:3000/nodepop/anuncios?​tag​s=mobile&​venta​=false&​nombre​=ip&​precio​=50-&​skip=0&​limit​=2&​sort​=precio&token​=mitoken"

* tags: Las etiquetas del anuncio. Sólo hay disponibles 4: "lifestyle", "mobile", "motor" y "work".
* venta: Si el producto está en venta (true) o no (false).
* nombre: El nombre del anuncio. Podemos poner cualquier combinación de letras que coincida o forme parte del nombre del anuncio que queramos buscar.
* precio: El precio del producto anunciado. De momento existen 4 rangos:
	* [num]-: Precios mayores o iguales que el número indicado.
	* [num1]-[num2]: Precios que figuran entre el primer y segundo número indicados.
	* -[num]: Precios menores o iguales que el número indicado.
	* Numero exacto: Precios que coincidan con el numero que busquemos.
* skip: Número que indica la posición del anuncio a partir del cual queremos mostrar la lista.
* limit: Número que indica la cantidad de anuncios que queramos ver.
* sort: Si queremos ordenar los anuncios según uno de sus atributos.
* token: El token asignado al iniciar sesión.

## Lista de etiquetas

Accede a la lista de etiquetas (tags) existentes a través de la dirección "http://localhost:3000/nodepop/anuncios/tags".

