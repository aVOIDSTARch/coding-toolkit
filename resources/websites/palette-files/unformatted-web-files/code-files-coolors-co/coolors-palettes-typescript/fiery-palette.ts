export interface Color {
  name: string;
  hex: string;
  rgb: [number, number, number];
  cmyk: [number, number, number, number];
  hsb: [number, number, number];
  hsl: [number, number, number];
  lab: [number, number, number];
}

export const fieryPalette: Color[] = [{"name":"Crimson Violet","hex":"5f0f40","rgb":[95,15,64],"cmyk":[0,84,33,63],"hsb":[323,84,37],"hsl":[323,73,22],"lab":[21,39,-9]},{"name":"Deep Crimson","hex":"9a031e","rgb":[154,3,30],"cmyk":[0,98,81,40],"hsb":[349,98,60],"hsl":[349,96,31],"lab":[32,55,31]},{"name":"Princeton Orange","hex":"fb8b24","rgb":[251,139,36],"cmyk":[0,45,86,2],"hsb":[29,86,98],"hsl":[29,96,56],"lab":[69,36,68]},{"name":"Autumn Leaf","hex":"e36414","rgb":[227,100,20],"cmyk":[0,56,91,11],"hsb":[23,91,89],"hsl":[23,84,48],"lab":[58,46,62]},{"name":"Dark Teal","hex":"0f4c5c","rgb":[15,76,92],"cmyk":[84,17,0,64],"hsb":[192,84,36],"hsl":[192,72,21],"lab":[30,-13,-15]}];
