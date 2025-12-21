export interface Color {
  name: string;
  hex: string;
  rgb: [number, number, number];
  cmyk: [number, number, number, number];
  hsb: [number, number, number];
  hsl: [number, number, number];
  lab: [number, number, number];
}

export const redSunburst: Color[] = [{"name":"Night Bordeaux","hex":"4f000b","rgb":[79,0,11],"cmyk":[0,100,86,69],"hsb":[352,100,31],"hsl":[352,100,15],"lab":[14,35,17]},{"name":"Dark Amaranth","hex":"720026","rgb":[114,0,38],"cmyk":[0,100,67,55],"hsb":[340,100,45],"hsl":[340,100,22],"lab":[23,46,13]},{"name":"Amaranth","hex":"ce4257","rgb":[206,66,87],"cmyk":[0,68,58,19],"hsb":[351,68,81],"hsl":[351,59,53],"lab":[49,56,19]},{"name":"Coral Glow","hex":"ff7f51","rgb":[255,127,81],"cmyk":[0,50,68,0],"hsb":[16,68,100],"hsl":[16,100,66],"lab":[67,45,47]},{"name":"Sandy Brown","hex":"ff9b54","rgb":[255,155,84],"cmyk":[0,39,67,0],"hsb":[25,67,100],"hsl":[25,100,66],"lab":[73,31,52]}];
