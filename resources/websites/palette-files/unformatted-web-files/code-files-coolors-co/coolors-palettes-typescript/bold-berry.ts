export interface Color {
  name: string;
  hex: string;
  rgb: [number, number, number];
  cmyk: [number, number, number, number];
  hsb: [number, number, number];
  hsl: [number, number, number];
  lab: [number, number, number];
}

export const boldBerry: Color[] = [{"name":"Soft Apricot","hex":"f9dbbd","rgb":[249,219,189],"cmyk":[0,12,24,2],"hsb":[30,24,98],"hsl":[30,83,86],"lab":[89,6,19]},{"name":"Cotton Candy","hex":"ffa5ab","rgb":[255,165,171],"cmyk":[0,35,33,0],"hsb":[356,35,100],"hsl":[356,100,82],"lab":[77,34,11]},{"name":"Blush Rose","hex":"da627d","rgb":[218,98,125],"cmyk":[0,55,43,15],"hsb":[347,55,85],"hsl":[347,62,62],"lab":[57,50,8]},{"name":"Berry Crush","hex":"a53860","rgb":[165,56,96],"cmyk":[0,66,42,35],"hsb":[338,66,65],"hsl":[338,49,43],"lab":[41,48,1]},{"name":"Night Bordeaux","hex":"450920","rgb":[69,9,32],"cmyk":[0,87,54,73],"hsb":[337,87,27],"hsl":[337,77,15],"lab":[13,30,2]}];
