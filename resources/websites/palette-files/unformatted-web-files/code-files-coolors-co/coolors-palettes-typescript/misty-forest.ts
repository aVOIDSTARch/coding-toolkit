export interface Color {
  name: string;
  hex: string;
  rgb: [number, number, number];
  cmyk: [number, number, number, number];
  hsb: [number, number, number];
  hsl: [number, number, number];
  lab: [number, number, number];
}

export const mistyForest: Color[] = [{"name":"Slate Grey","hex":"77878b","rgb":[119,135,139],"cmyk":[14,3,0,45],"hsb":[192,14,55],"hsl":[192,8,51],"lab":[55,-5,-4]},{"name":"Dark Slate Grey","hex":"305252","rgb":[48,82,82],"cmyk":[41,0,0,68],"hsb":[180,41,32],"hsl":[180,26,25],"lab":[32,-12,-4]},{"name":"Gunmetal","hex":"373e40","rgb":[55,62,64],"cmyk":[14,3,0,75],"hsb":[193,14,25],"hsl":[193,8,23],"lab":[26,-2,-2]},{"name":"Teal","hex":"488286","rgb":[72,130,134],"cmyk":[46,3,0,47],"hsb":[184,46,53],"hsl":[184,30,40],"lab":[51,-18,-8]},{"name":"Light Blue","hex":"b7d5d4","rgb":[183,213,212],"cmyk":[14,0,0,16],"hsb":[178,14,84],"hsl":[178,26,78],"lab":[83,-10,-3]}];
