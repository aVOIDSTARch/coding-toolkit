export interface Color {
  name: string;
  hex: string;
  rgb: [number, number, number];
  cmyk: [number, number, number, number];
  hsb: [number, number, number];
  hsl: [number, number, number];
  lab: [number, number, number];
}

export const forestHues: Color[] = [{"name":"Dark Slate Grey","hex":"283d3b","rgb":[40,61,59],"cmyk":[34,0,3,76],"hsb":[174,34,24],"hsl":[174,21,20],"lab":[24,-9,-1]},{"name":"Stormy Teal","hex":"197278","rgb":[25,114,120],"cmyk":[79,5,0,53],"hsb":[184,79,47],"hsl":[184,66,28],"lab":[44,-23,-11]},{"name":"Powder Petal","hex":"edddd4","rgb":[237,221,212],"cmyk":[0,7,11,7],"hsb":[22,11,93],"hsl":[22,41,88],"lab":[89,4,6]},{"name":"Tomato Jam","hex":"c44536","rgb":[196,69,54],"cmyk":[0,65,72,23],"hsb":[6,72,77],"hsl":[6,57,49],"lab":[47,50,36]},{"name":"Chestnut","hex":"772e25","rgb":[119,46,37],"cmyk":[0,61,69,53],"hsb":[7,69,47],"hsl":[7,53,31],"lab":[29,31,22]}];
