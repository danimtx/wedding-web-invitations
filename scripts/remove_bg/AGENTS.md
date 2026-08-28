# Background Removal Script

Este directorio contiene un script de Python aislado y listo para usar (`remove_bg.py`) que elimina el fondo de una o más imágenes y **reemplaza el archivo original**. 

## Dependencias
El script utiliza `rembg` (basado en onnxruntime/U-2-Net) y `Pillow`. 
Todas sus dependencias están aisladas en el entorno virtual ubicado en `.venv` dentro de este directorio.

## ¿Cómo utilizar este script (Para Agentes de IA)?

Como agente, si necesitas eliminar el fondo de una o varias imágenes generadas o proporcionadas por el usuario, debes invocar el entorno virtual local de esta carpeta para ejecutar el script.

### Comando de ejecución en Windows (PowerShell)

Para ejecutar el script y procesar imágenes, usa la siguiente ruta absoluta o relativa al ejecutable de Python del entorno virtual:

```powershell
# Usando rutas absolutas
C:\Users\72873\Desktop\invitaciones\scripts\remove_bg\.venv\Scripts\python.exe C:\Users\72873\Desktop\invitaciones\scripts\remove_bg\remove_bg.py --images "C:\Ruta\A\Tu\imagen1.png" "C:\Ruta\A\Tu\imagen2.jpg"

# Si estás en un directorio cercano (ej: Desktop\invitaciones)
.\scripts\remove_bg\.venv\Scripts\python.exe .\scripts\remove_bg\remove_bg.py --images "ruta\a\imagen.png"
```

### Comportamiento Importante a Considerar
- El script **sobrescribirá** (eliminará y reemplazará) el archivo original.
- Siempre guardará la salida como un archivo `.png` (para mantener el canal alfa de transparencia).
- Si le pasas un archivo `.jpg`, borrará el `.jpg` y creará un nuevo `.png` con el mismo nombre base.
- Se puede procesar un solo archivo o una lista de archivos separados por espacios.

### Solución de Problemas
Si el script reporta un error de que falta algún módulo, asegúrate de estar utilizando el ejecutable `python.exe` correcto dentro de `.venv\Scripts\` en lugar del `python` global del sistema.
