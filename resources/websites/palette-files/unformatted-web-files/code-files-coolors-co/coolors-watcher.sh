#!/bin/bash

# Watch for new Coolors palette files, convert to TypeScript, and organize
# Usage: ./coolors-watcher.sh

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROCESSED_DIR="$SCRIPT_DIR/raw-coolors-files-processed"
OUTPUT_DIR="$SCRIPT_DIR/coolors-palettes-typescript"

# Ensure directories exist
mkdir -p "$PROCESSED_DIR"
mkdir -p "$OUTPUT_DIR"

convert_and_move() {
    local input_file="$1"
    local filename=$(basename "$input_file")

    # Extract the Extended Array JSON
    local json=$(awk '/^- Extended Array$/{getline; getline; print}' "$input_file")

    if [ -z "$json" ]; then
        echo "Skipping $filename: No Extended Array found"
        return 1
    fi

    # Convert filename to camelCase for the export name
    local export_name=$(echo "$filename" | awk -F'-' '{
        for(i=1;i<=NF;i++){
            if(i==1) printf "%s", tolower(substr($i,1,1)) substr($i,2)
            else printf "%s", toupper(substr($i,1,1)) substr($i,2)
        }
    }')

    local ts_file="$OUTPUT_DIR/${filename}.ts"

    # Create TypeScript file
    cat > "$ts_file" << EOF
import type { Color } from './coolors-palette';

export const ${export_name}: Color[] = ${json};
EOF

    echo "Created: $ts_file"

    # Move original to processed folder
    mv "$input_file" "$PROCESSED_DIR/"
    echo "Moved: $filename -> raw-coolors-files-processed/"
}

process_folder() {
    local found=0
    for file in "$SCRIPT_DIR"/*; do
        # Skip if not a regular file
        [[ ! -f "$file" ]] && continue

        local filename=$(basename "$file")

        # Skip scripts, ts files, html files
        [[ "$filename" == *.sh ]] && continue
        [[ "$filename" == *.ts ]] && continue
        [[ "$filename" == *.html ]] && continue

        found=1
        convert_and_move "$file"
    done
    return $found
}

echo "=== Coolors Palette Watcher ==="
echo "Watch dir: $SCRIPT_DIR"
echo "Output dir: $OUTPUT_DIR"
echo "Processed dir: $PROCESSED_DIR"
echo ""

# Process any existing files first
echo "Checking for existing files..."
process_folder
echo ""

echo "Watching for new files (polling every 2s)..."
echo "Press Ctrl+C to stop"
echo ""

while true; do
    process_folder
    sleep 2
done
