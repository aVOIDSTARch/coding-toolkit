export interface Color {
  name: string;
  hex: string;
  rgb: [number, number, number];
  cmyk: [number, number, number, number];
  hsb: [number, number, number];
  hsl: [number, number, number];
  lab: [number, number, number];
}

export const summerSunset: Color[] = [{"name":"Atomic Tangerine","hex":"ff6b35","rgb":[255,107,53],"cmyk":[0,58,79,0],"hsb":[16,79,100],"hsl":[16,100,60],"lab":[63,54,56]},{"name":"Peach Glow","hex":"f7c59f","rgb":[247,197,159],"cmyk":[0,20,36,3],"hsb":[26,36,97],"hsl":[26,85,80],"lab":[83,13,26]},{"name":"Beige","hex":"efefd0","rgb":[239,239,208],"cmyk":[0,0,13,6],"hsb":[60,13,94],"hsl":[60,49,88],"lab":[94,-5,15]},{"name":"Steel Azure","hex":"004e89","rgb":[0,78,137],"cmyk":[100,43,0,46],"hsb":[206,100,54],"hsl":[206,100,27],"lab":[32,3,-39]},{"name":"Baltic Blue","hex":"1a659e","rgb":[26,101,158],"cmyk":[84,36,0,38],"hsb":[206,84,62],"hsl":[206,72,36],"lab":[41,-1,-37]}];
