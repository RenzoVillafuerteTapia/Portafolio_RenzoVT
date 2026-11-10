# Portafolio de Renzo Villafuerte Tapia

Landing page con mi información y mis proyectos. HTML, CSS y JavaScript sin dependencias ni paso de build.

Publicada con GitHub Pages: https://renzovillafuertetapia.github.io/Portafolio_RenzoVT/

## Estructura

| Archivo | Contenido |
|---|---|
| `index.html` | Todo el contenido, en español |
| `styles.css` | Colores, tipografía y layout (los tokens están al inicio) |
| `script.js` | Traducción al inglés y el diagrama interactivo de VetCare |

## Editar el contenido

- **Textos en español:** directamente en `index.html`.
- **Textos en inglés:** en el objeto `en` de `script.js`, con la misma clave que el atributo `data-i18n` del elemento.
- **Agregar un proyecto:** copia un `<li class="project-row">` en `index.html` y añade sus claves en `en`.

## Verlo en local

Abre `index.html` en el navegador, o sirve la carpeta:

```bash
python -m http.server 8000
```
