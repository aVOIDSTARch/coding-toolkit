export interface Color {
  name: string;
  hex: string;
  rgb: [number, number, number];
  cmyk: [number, number, number, number];
  hsb: [number, number, number];
  hsl: [number, number, number];
  lab: [number, number, number];
}

export const goldenSummerGlow: Color[] = [{"name":"Regal Navy","hex":"0d3b66","rgb":[13,59,102],"cmyk":[87,42,0,60],"hsb":[209,87,40],"hsl":[209,77,23],"lab":[24,2,-30]},{"name":"Lemon Chiffon","hex":"faf0ca","rgb":[250,240,202],"cmyk":[0,4,19,2],"hsb":[48,19,98],"hsl":[48,83,89],"lab":[95,-3,20]},{"name":"Royal Gold","hex":"f4d35e","rgb":[244,211,94],"cmyk":[0,14,61,4],"hsb":[47,61,96],"hsl":[47,87,66],"lab":[85,-2,61]},{"name":"Sandy Brown","hex":"ee964b","rgb":[238,150,75],"cmyk":[0,37,68,7],"hsb":[28,68,93],"hsl":[28,83,61],"lab":[70,27,52]},{"name":"Tomato","hex":"f95738","rgb":[249,87,56],"cmyk":[0,65,78,2],"hsb":[10,78,98],"hsl":[10,94,60],"lab":[59,60,51]}];
