#!/usr/bin/env python3

import os
import shutil
from PIL import Image
import sys

def get_file_size_mb(filepath):
    """Get file size in MB"""
    return os.path.getsize(filepath) / (1024 * 1024)

def optimize_png(input_path, backup_dir="backup_original", quality=85, max_width=1920, max_height=1080):
    """
    Optimize PNG files by:
    1. Resizing if too large
    2. Converting large files to JPEG for better compression
    3. Optimizing PNG compression for smaller files
    """
    
    # Create backup directory if it doesn't exist
    if not os.path.exists(backup_dir):
        os.makedirs(backup_dir)
    
    # Create backup of original file
    backup_path = os.path.join(backup_dir, os.path.basename(input_path))
    shutil.copy2(input_path, backup_path)
    
    original_size = get_file_size_mb(input_path)
    
    try:
        with Image.open(input_path) as img:
            print(f"Processing: {input_path}")
            print(f"  Original size: {original_size:.2f} MB")
            print(f"  Original dimensions: {img.width}x{img.height}")
            
            # Convert RGBA to RGB for JPEG compatibility
            if img.mode in ('RGBA', 'LA', 'P'):
                # Create a white background for transparent images
                if img.mode == 'P':
                    img = img.convert('RGBA')
                
                if 'transparency' in img.info or img.mode in ('RGBA', 'LA'):
                    background = Image.new('RGB', img.size, (255, 255, 255))
                    if img.mode == 'RGBA':
                        background.paste(img, mask=img.split()[-1])
                    elif img.mode == 'LA':
                        background.paste(img, mask=img.split()[-1])
                    img = background
                else:
                    img = img.convert('RGB')
            elif img.mode != 'RGB':
                img = img.convert('RGB')
            
            # Resize if too large
            original_dimensions = (img.width, img.height)
            if img.width > max_width or img.height > max_height:
                img.thumbnail((max_width, max_height), Image.Resampling.LANCZOS)
                print(f"  Resized to: {img.width}x{img.height}")
            
            # Decide format based on file size and type
            if original_size > 0.5:  # 500KB threshold
                # Large files: convert to JPEG for better compression
                output_path = input_path.replace('.png', '.jpg')
                img.save(output_path, 'JPEG', quality=quality, optimize=True)
                # Remove original PNG file
                os.remove(input_path)
                print(f"  Converted to JPEG: {output_path}")
            else:
                # Small files: keep as PNG but optimize
                img.save(input_path, 'PNG', optimize=True)
                output_path = input_path
                print(f"  Optimized as PNG")
            
            new_size = get_file_size_mb(output_path)
            savings = ((original_size - new_size) / original_size) * 100
            print(f"  New size: {new_size:.2f} MB")
            print(f"  Size reduction: {savings:.1f}%")
            print()
            
            return output_path, original_size, new_size, savings
            
    except Exception as e:
        print(f"Error processing {input_path}: {str(e)}")
        # Restore from backup if there was an error
        if os.path.exists(backup_path):
            shutil.copy2(backup_path, input_path)
        return input_path, original_size, original_size, 0

def main():
    static_dir = "/workspaces/stablehub.aid-lab.hfg-gmuend.de/static"
    backup_dir = os.path.join(static_dir, "backup_original")
    
    # Find all PNG files
    png_files = []
    for root, dirs, files in os.walk(static_dir):
        # Skip backup directory
        if 'backup_original' in root:
            continue
        for file in files:
            if file.lower().endswith('.png'):
                png_files.append(os.path.join(root, file))
    
    print(f"Found {len(png_files)} PNG files to optimize")
    print("=" * 60)
    
    total_original = 0
    total_new = 0
    results = []
    
    for png_file in png_files:
        result = optimize_png(png_file, backup_dir)
        results.append(result)
        total_original += result[1]
        total_new += result[2]
    
    print("=" * 60)
    print("OPTIMIZATION SUMMARY:")
    print(f"Total original size: {total_original:.2f} MB")
    print(f"Total new size: {total_new:.2f} MB")
    total_savings = ((total_original - total_new) / total_original) * 100 if total_original > 0 else 0
    print(f"Total size reduction: {total_savings:.1f}%")
    print(f"Space saved: {total_original - total_new:.2f} MB")
    print()
    print("Backup of original files saved in:", backup_dir)

if __name__ == "__main__":
    main()
