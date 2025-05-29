#!/usr/bin/env python3

import os
import shutil
from PIL import Image
import sys

def get_file_size_mb(filepath):
    """Get file size in MB"""
    return os.path.getsize(filepath) / (1024 * 1024)

def optimize_small_png(input_path, max_width=1024, max_height=1024):
    """Optimize smaller PNG files by resizing and PNG compression"""
    original_size = get_file_size_mb(input_path)
    
    with Image.open(input_path) as img:
        # Keep original mode for small PNGs to preserve transparency
        original_mode = img.mode
        
        # Only resize if significantly larger than max dimensions
        if img.width > max_width * 1.5 or img.height > max_height * 1.5:
            img.thumbnail((max_width, max_height), Image.Resampling.LANCZOS)
        
        # Save with PNG optimization
        img.save(input_path, 'PNG', optimize=True)
    
    new_size = get_file_size_mb(input_path)
    return new_size

def smart_optimize(input_path, backup_dir="backup_original"):
    """Smart optimization based on file size and characteristics"""
    
    original_size = get_file_size_mb(input_path)
    
    try:
        with Image.open(input_path) as img:
            print(f"Processing: {input_path}")
            print(f"  Original size: {original_size:.2f} MB")
            print(f"  Original dimensions: {img.width}x{img.height}")
            print(f"  Mode: {img.mode}")
            
            # Strategy 1: Very large files (>1MB) - convert to JPEG
            if original_size > 1.0:
                # Convert to RGB for JPEG
                if img.mode in ('RGBA', 'LA', 'P'):
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
                
                # Resize if very large
                if img.width > 1920 or img.height > 1080:
                    img.thumbnail((1920, 1080), Image.Resampling.LANCZOS)
                    print(f"  Resized to: {img.width}x{img.height}")
                
                # Save as JPEG
                output_path = input_path.replace('.png', '.jpg')
                img.save(output_path, 'JPEG', quality=85, optimize=True)
                os.remove(input_path)
                print(f"  Converted to JPEG")
                
                new_size = get_file_size_mb(output_path)
                
            # Strategy 2: Medium files (0.2-1MB) - try different approaches
            elif 0.2 <= original_size <= 1.0:
                # Try PNG optimization first
                temp_path = input_path + '.temp'
                shutil.copy2(input_path, temp_path)
                
                # Try resizing and PNG optimization
                if img.width > 1024 or img.height > 1024:
                    img.thumbnail((1024, 1024), Image.Resampling.LANCZOS)
                
                img.save(temp_path, 'PNG', optimize=True)
                temp_size = get_file_size_mb(temp_path)
                
                # If PNG optimization didn't help much, try JPEG
                if temp_size > original_size * 0.7:  # Less than 30% reduction
                    # Convert to JPEG
                    if img.mode in ('RGBA', 'LA', 'P'):
                        if img.mode == 'P':
                            img = img.convert('RGBA')
                        
                        if 'transparency' in img.info or img.mode in ('RGBA', 'LA'):
                            background = Image.new('RGB', img.size, (255, 255, 255))
                            if img.mode == 'RGBA':
                                background.paste(img, mask=img.split()[-1])
                            img = background
                        else:
                            img = img.convert('RGB')
                    elif img.mode != 'RGB':
                        img = img.convert('RGB')
                    
                    jpeg_path = input_path.replace('.png', '.jpg')
                    img.save(jpeg_path, 'JPEG', quality=85, optimize=True)
                    jpeg_size = get_file_size_mb(jpeg_path)
                    
                    # Use the better option
                    if jpeg_size < temp_size:
                        os.remove(temp_path)
                        os.remove(input_path)
                        output_path = jpeg_path
                        new_size = jpeg_size
                        print(f"  Converted to JPEG")
                    else:
                        os.remove(jpeg_path)
                        shutil.move(temp_path, input_path)
                        output_path = input_path
                        new_size = temp_size
                        print(f"  Optimized as PNG")
                else:
                    shutil.move(temp_path, input_path)
                    output_path = input_path
                    new_size = temp_size
                    print(f"  Optimized as PNG")
            
            # Strategy 3: Small files (<0.2MB) - gentle PNG optimization only
            else:
                new_size = optimize_small_png(input_path)
                output_path = input_path
                print(f"  Gentle PNG optimization")
            
            savings = ((original_size - new_size) / original_size) * 100 if original_size > 0 else 0
            print(f"  New size: {new_size:.2f} MB")
            print(f"  Size reduction: {savings:.1f}%")
            print()
            
            return output_path, original_size, new_size, savings
            
    except Exception as e:
        print(f"Error processing {input_path}: {str(e)}")
        return input_path, original_size, original_size, 0

def main():
    static_dir = "/workspaces/stablehub.aid-lab.hfg-gmuend.de/static"
    
    # Focus on specific large files that need optimization
    large_files = [
        "styles/futuristic.png",
        "styles/pixar.png", 
        "styles/realistic.png",
        "styles/appdesign.png",
        "icon/rightIcon.png"
    ]
    
    print("Optimizing remaining PNG files with smart strategy")
    print("=" * 60)
    
    total_original = 0
    total_new = 0
    
    for file_rel in large_files:
        file_path = os.path.join(static_dir, file_rel)
        if os.path.exists(file_path):
            result = smart_optimize(file_path)
            total_original += result[1]
            total_new += result[2]
    
    print("=" * 60)
    print("OPTIMIZATION SUMMARY:")
    print(f"Total original size: {total_original:.2f} MB")
    print(f"Total new size: {total_new:.2f} MB")
    total_savings = ((total_original - total_new) / total_original) * 100 if total_original > 0 else 0
    print(f"Total size reduction: {total_savings:.1f}%")
    print(f"Space saved: {total_original - total_new:.2f} MB")

if __name__ == "__main__":
    main()
