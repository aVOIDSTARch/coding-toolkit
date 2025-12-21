export interface Color {
  name: string;
  hex: string;
  rgb: [number, number, number];
  cmyk: [number, number, number, number];
  hsb: [number, number, number];
  hsl: [number, number, number];
  lab: [number, number, number];
}

export const goldenTwilight: Color[] = [{"name":"Ink Black","hex":"000814","rgb":[0,8,20],"cmyk":[100,60,0,92],"hsb":[216,100,8],"hsl":[216,100,4],"lab":[2,0,-6]},{"name":"Prussian Blue","hex":"001d3d","rgb":[0,29,61],"cmyk":[100,52,0,76],"hsb":[211,100,24],"hsl":[211,100,12],"lab":[11,4,-24]},{"name":"Regal Navy","hex":"003566","rgb":[0,53,102],"cmyk":[100,48,0,60],"hsb":[209,100,40],"hsl":[209,100,20],"lab":[22,5,-33]},{"name":"School Bus Yellow","hex":"ffc300","rgb":[255,195,0],"cmyk":[0,24,100,0],"hsb":[46,100,100],"hsl":[46,100,50],"lab":[82,8,84]},{"name":"Gold","hex":"ffd60a","rgb":[255,214,10],"cmyk":[0,16,96,0],"hsb":[50,96,100],"hsl":[50,100,52],"lab":[87,-1,86]}];
