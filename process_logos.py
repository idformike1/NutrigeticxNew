import os
import subprocess

def decode_rle_tga(data, depth, width, height):
    pixels = []
    idx = 0
    bytes_per_pixel = depth // 8
    total_pixels = width * height
    
    while len(pixels) < total_pixels and idx < len(data):
        packet_header = data[idx]
        idx += 1
        
        is_rle = (packet_header & 0x80) != 0
        count = (packet_header & 0x7F) + 1
        
        if is_rle:
            # Read one pixel
            pixel_bytes = data[idx : idx + bytes_per_pixel]
            idx += bytes_per_pixel
            if bytes_per_pixel == 3:
                r, g, b, a = pixel_bytes[2], pixel_bytes[1], pixel_bytes[0], 255
            else:
                r, g, b, a = pixel_bytes[2], pixel_bytes[1], pixel_bytes[0], pixel_bytes[3]
            for _ in range(count):
                pixels.append([r, g, b, a])
        else:
            # Read count raw pixels
            for _ in range(count):
                pixel_bytes = data[idx : idx + bytes_per_pixel]
                idx += bytes_per_pixel
                if bytes_per_pixel == 3:
                    r, g, b, a = pixel_bytes[2], pixel_bytes[1], pixel_bytes[0], 255
                else:
                    r, g, b, a = pixel_bytes[2], pixel_bytes[1], pixel_bytes[0], pixel_bytes[3]
                pixels.append([r, g, b, a])
                
    return pixels

def process_tga(input_path, output_path, bg_color='white', crop_right_half=False):
    # Read the TGA file
    with open(input_path, 'rb') as f:
        header = bytearray(f.read(18))
        data = bytearray(f.read())
        
    width = header[12] + (header[13] << 8)
    height = header[14] + (header[15] << 8)
    image_type = header[2]
    depth = header[16]
    orig_descriptor = header[17]
    
    print(f"Processing {os.path.basename(input_path)}: {width}x{height}, {depth}bpp, type={image_type}, desc={orig_descriptor}")
    
    # We want to output a 32-bit RGBA TGA file (uncompressed type = 2)
    out_header = bytearray(header)
    out_header[2] = 2   # Uncompressed true-color
    out_header[16] = 32 # 32 bpp
    # Preserve original horizontal/vertical flip flags (bits 4 and 5) while setting alpha depth to 8 (bits 0-3)
    out_header[17] = (orig_descriptor & 0x30) | 8
    
    # Decode pixels
    if image_type == 2:
        # Uncompressed true-color
        pixels = []
        idx = 0
        if depth == 24:
            while idx < len(data):
                b, g, r = data[idx], data[idx+1], data[idx+2]
                pixels.append([r, g, b, 255])
                idx += 3
        elif depth == 32:
            while idx < len(data):
                b, g, r, a = data[idx], data[idx+1], data[idx+2], data[idx+3]
                pixels.append([r, g, b, a])
                idx += 4
    elif image_type == 10:
        # RLE compressed true-color
        pixels = decode_rle_tga(data, depth, width, height)
    else:
        raise ValueError(f"Unsupported image type: {image_type}")
        
    # Crop right half if requested
    if crop_right_half:
        new_width = width // 2
        cropped_pixels = []
        for row in range(height):
            row_start = row * width
            row_end = row_start + width
            row_pixels = pixels[row_start:row_end]
            # Take the right half
            cropped_pixels.extend(row_pixels[new_width:])
        pixels = cropped_pixels
        width = width - new_width
        out_header[12] = width & 0xFF
        out_header[13] = (width >> 8) & 0xFF
        
    # Apply transparency filter
    out_data = bytearray()
    for p in pixels:
        r, g, b, a = p
        
        # Check background color
        if bg_color == 'white':
            if r > 210 and g > 210 and b > 210:
                a = 0
        elif bg_color == 'black':
            if r < 45 and g < 45 and b < 45:
                a = 0
                
        # Write as BGRA
        out_data.append(b)
        out_data.append(g)
        out_data.append(r)
        out_data.append(a)
        
    with open(output_path, 'wb') as f:
        f.write(out_header)
        f.write(out_data)

def main():
    # Use relative pathing based on script location
    script_dir = os.path.dirname(os.path.abspath(__file__))
    images_dir = os.path.join(script_dir, "public/images")
    
    # 1. Akshaya Patra (Black background)
    akshaya_jpg = os.path.join(images_dir, "media__1779420762685.jpg")
    if os.path.exists(akshaya_jpg):
        subprocess.run(["sips", "-s", "format", "tga", akshaya_jpg, "--out", "akshaya.tga"])
        process_tga("akshaya.tga", "akshaya_proc.tga", bg_color='black')
        subprocess.run(["sips", "-s", "format", "png", "akshaya_proc.tga", "--out", os.path.join(images_dir, "logo_akshaya_patra.png")])
        
    # 2. NITI Aayog (White background)
    niti_jpg = os.path.join(images_dir, "media__1779420762694.jpg")
    if os.path.exists(niti_jpg):
        subprocess.run(["sips", "-s", "format", "tga", niti_jpg, "--out", "niti.tga"])
        process_tga("niti.tga", "niti_proc.tga", bg_color='white')
        subprocess.run(["sips", "-s", "format", "png", "niti_proc.tga", "--out", os.path.join(images_dir, "logo_niti_aayog.png")])

    # 3. FSSAI (White background)
    fssai_png = os.path.join(images_dir, "media__1779420776136.png")
    if os.path.exists(fssai_png):
        subprocess.run(["sips", "-s", "format", "tga", fssai_png, "--out", "fssai.tga"])
        process_tga("fssai.tga", "fssai_proc.tga", bg_color='white')
        subprocess.run(["sips", "-s", "format", "png", "fssai_proc.tga", "--out", os.path.join(images_dir, "logo_fssai.png")])

    # 4. ICMR Standalone (White background)
    icmr_png = os.path.join(images_dir, "media__1779420776161.png")
    if os.path.exists(icmr_png):
        subprocess.run(["sips", "-s", "format", "tga", icmr_png, "--out", "icmr.tga"])
        process_tga("icmr.tga", "icmr_proc.tga", bg_color='white')
        subprocess.run(["sips", "-s", "format", "png", "icmr_proc.tga", "--out", os.path.join(images_dir, "logo_icmr.png")])

    # 5. NIN (Cropped right half of joint logo media__1779420776150.png, white background)
    nin_joint_png = os.path.join(images_dir, "media__1779420776150.png")
    if os.path.exists(nin_joint_png):
        subprocess.run(["sips", "-s", "format", "tga", nin_joint_png, "--out", "nin_joint.tga"])
        process_tga("nin_joint.tga", "nin_proc.tga", bg_color='white', crop_right_half=True)
        subprocess.run(["sips", "-s", "format", "png", "nin_proc.tga", "--out", os.path.join(images_dir, "logo_nin.png")])

    # Cleanup temporary TGA files
    for temp_file in ["akshaya.tga", "akshaya_proc.tga", "niti.tga", "niti_proc.tga", 
                      "fssai.tga", "fssai_proc.tga", "icmr.tga", "icmr_proc.tga", 
                      "nin_joint.tga", "nin_proc.tga"]:
        if os.path.exists(temp_file):
            os.remove(temp_file)
            
    print("All logos processed and saved to public/images/!")

if __name__ == "__main__":
    main()
