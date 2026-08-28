import argparse
import os
from rembg import remove
from PIL import Image

def remove_background(image_path):
    if not os.path.exists(image_path):
        print(f"Error: El archivo {image_path} no existe.")
        return False
        
    try:
        # Cargar la imagen original
        input_image = Image.open(image_path)
        
        # Procesar la imagen (eliminar fondo) con Alpha Matting para recuperar detalles finos (hojas/pelo)
        output_image = remove(
            input_image,
            alpha_matting=True,
            alpha_matting_foreground_threshold=240,
            alpha_matting_background_threshold=10,
            alpha_matting_erode_size=10
        )
        
        # Si la imagen procesada es en formato RGBA, necesitamos guardarla como PNG
        # Para evitar problemas con archivos que originalmente eran JPG, 
        # nos aseguramos de guardar siempre como PNG y actualizar la extensión.
        
        # Obtener el nombre del archivo sin extensión y su directorio
        dir_name = os.path.dirname(image_path)
        base_name = os.path.basename(image_path)
        name_without_ext, ext = os.path.splitext(base_name)
        
        # Eliminar el archivo original para reemplazarlo (como se solicitó)
        os.remove(image_path)
        
        # El nuevo archivo siempre será PNG (ya que JPG no soporta transparencia)
        new_path = os.path.join(dir_name, f"{name_without_ext}.png")
        
        # Guardar la nueva imagen
        output_image.save(new_path, format="PNG")
        print(f"Éxito: Fondo eliminado y guardado como {new_path}")
        return True
        
    except Exception as e:
        print(f"Error al procesar {image_path}: {str(e)}")
        return False

def main():
    parser = argparse.ArgumentParser(description="Script para eliminar el fondo de imágenes.")
    parser.add_argument(
        '--images', 
        nargs='+', 
        required=True, 
        help="Lista de rutas a las imágenes que se van a procesar."
    )
    
    args = parser.parse_args()
    
    success_count = 0
    for image_path in args.images:
        print(f"Procesando: {image_path}...")
        if remove_background(image_path):
            success_count += 1
            
    print(f"\nResumen: {success_count} de {len(args.images)} imágenes procesadas con éxito.")

if __name__ == "__main__":
    main()
