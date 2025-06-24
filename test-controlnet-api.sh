#!/bin/bash

# Test ControlNet API direkt
echo "Testing ControlNet API..."

# Beispiel API-Call (Sie müssen ein echtes Bild als image1 hochladen)
curl -X POST "https://playground.transferscope.org/api/controlnet?controlnet_strength=0.75&start_percent=0&end_percent=1&prompt=beautiful+landscape&cfg=1.3&steps=6&seed=0&uid=Jochen" \
  -F "image1=@/path/to/your/image.jpg" \
  -v

echo "Fertig."
