#!/bin/bash

# Convert Coolors.co palette files to TypeScript
# Usage: ./coolors-to-ts.sh <file1> [file2] ... or ./coolors-to-ts.sh *.palette

convert_file() {
    local input_file="$1"
    local filename=$(basename "$input_file")
    local output_file="${input_file}.ts"

    # Extract the Extended Array JSON (line after "- Extended Array")
    local json=$(awk '/^- Extended Array$/{getline; getline; print}' "$input_file")

    if [ -z "$json" ]; then
        echo "Error: Could not find Extended Array in $input_file"
        return 1
    fi

    # Convert filename to camelCase for the export name
    local export_name=$(echo "$filename" | awk -F'-' '{
        for(i=1;i<=NF;i++){
            if(i==1) printf "%s", tolower(substr($i,1,1)) substr($i,2)
            else printf "%s", toupper(substr($i,1,1)) substr($i,2)
        }
    }')

    # Create TypeScript file
    cat > "$output_file" << EOF
export interface Color {
  name: string;
  hex: string;
  rgb: [number, number, number];
  cmyk: [number, number, number, number];
  hsb: [number, number, number];
  hsl: [number, number, number];
  lab: [number, number, number];
}

export const ${export_name}: Color[] = ${json};
EOF

    echo "Created: $output_file"
}

# Check if any arguments provided
if [ $# -eq 0 ]; then
    echo "Usage: $0 <file1> [file2] ..."
    echo "       $0 *  (for batch processing)"
    exit 1
fi

# Process each file
for file in "$@"; do
    # Skip directories and the script itself
    if [ -d "$file" ] || [ "$(basename "$file")" = "coolors-to-ts.sh" ]; then
        continue
    fi
    # Skip already converted .ts files
    if [[ "$file" == *.ts ]]; then
        continue
    fi
    convert_file "$file"
done

echo "Done!"
