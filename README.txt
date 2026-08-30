STUDENTBNB ESPAÑA — DB READY v2 · MERCADOS UNIVERSITARIOS 20K+
==============================================================

Base funcional: StudentBnB_Espana_DBReady_v1.
Mejora gráfica: recupera el mapa ilustrado de España y las fotografías de ciudades de la versión española anterior.

CRITERIO DE CIUDADES
- Se incluyen 19 ciudades o polos universitarios con una escala aproximada superior a 20.000 estudiantes.
- Para el umbral se consideran Grado, Máster y Doctorado.
- Cuando varios campus forman un único mercado de alquiler estudiantil se usa el polo (ej.: Bilbao–Leioa, Oviedo–Gijón, Cádiz–Puerto Real, Alicante–San Vicente).
- No se usa el total de una universidad multicampus para atribuir automáticamente todos sus estudiantes a una sola ciudad.

MERCADOS ACTIVOS
- Madrid · Comunidad de Madrid · 12 barrios/zonas
- Barcelona · Cataluña · 12 barrios/zonas
- Valencia · Comunitat Valenciana · 14 barrios/zonas
- Sevilla · Andalucía · 13 barrios/zonas
- Granada · Andalucía · 12 barrios/zonas
- Zaragoza · Aragón · 12 barrios/zonas
- Málaga · Andalucía · 11 barrios/zonas
- Murcia · Región de Murcia · 11 barrios/zonas
- Alicante–San Vicente · Comunitat Valenciana · 10 barrios/zonas
- Salamanca · Castilla y León · 11 barrios/zonas
- Santiago de Compostela · Galicia · 10 barrios/zonas
- Valladolid · Castilla y León · 11 barrios/zonas
- Bilbao–Leioa · País Vasco · 12 barrios/zonas
- Córdoba · Andalucía · 12 barrios/zonas
- Pamplona · Navarra · 10 barrios/zonas
- La Laguna–Santa Cruz · Canarias · 11 barrios/zonas
- Oviedo–Gijón · Asturias · 12 barrios/zonas
- Alcalá de Henares · Comunidad de Madrid · 8 barrios/zonas
- Cádiz–Puerto Real · Andalucía · 10 barrios/zonas

ARQUITECTURA PARA BASE DE DATOS EUROPEA ÚNICA
- countryCode = ES
- cityId estable por mercado
- slug de ciudad/polo independiente del dominio
- IDs de anuncios/solicitudes compatibles con UUID
- contrato de datos en database-contract.json
- futuro API común en /api/v1 con filtro por country y city_id

GRÁFICA
- Mapa principal: assets/img/spagna-proposta1.webp (recuperado de la versión española anterior).
- Fotografías locales válidas de 13 ciudades de la versión anterior reutilizadas como cabeceras representativas; el archivo antiguo de Valladolid estaba vacío y se sustituyó por una imagen de Wikimedia Commons.
- Para Valladolid, Pamplona, La Laguna, Oviedo, Alcalá de Henares y Cádiz se usan imágenes remotas de Wikimedia Commons mediante Special:FilePath; ver ASSET_CREDITS.txt.

PUBLICACIÓN
Subir el contenido de esta carpeta a la raíz de casastudent.es. El sitio sigue funcionando en modo demo/localStorage hasta la conexión con el backend único.
