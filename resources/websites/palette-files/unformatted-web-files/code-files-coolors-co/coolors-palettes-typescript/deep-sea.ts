export interface Color {
  name: string;
  hex: string;
  rgb: [number, number, number];
  cmyk: [number, number, number, number];
  hsb: [number, number, number];
  hsl: [number, number, number];
  lab: [number, number, number];
}

export const deepSea: Color[] = [{"name":"Ink Black","hex":"0d1321","rgb":[13,19,33],"cmyk":[61,42,0,87],"hsb":[222,61,13],"hsl":[222,43,9],"lab":[6,2,-10]},{"name":"Deep Space Blue","hex":"1d2d44","rgb":[29,45,68],"cmyk":[57,34,0,73],"hsb":[215,57,27],"hsl":[215,40,19],"lab":[18,1,-16]},{"name":"Blue Slate","hex":"3e5c76","rgb":[62,92,118],"cmyk":[47,22,0,54],"hsb":[208,47,46],"hsl":[208,31,35],"lab":[38,-3,-18]},{"name":"Dusty Denim","hex":"748cab","rgb":[116,140,171],"cmyk":[32,18,0,33],"hsb":[214,32,67],"hsl":[214,25,56],"lab":[57,-1,-19]},{"name":"Eggshell","hex":"f0ebd8","rgb":[240,235,216],"cmyk":[0,2,10,6],"hsb":[47,10,94],"hsl":[47,44,89],"lab":[93,-2,10]}];
