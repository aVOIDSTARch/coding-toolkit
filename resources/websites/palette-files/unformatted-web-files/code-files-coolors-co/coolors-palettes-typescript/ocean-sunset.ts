export interface Color {
  name: string;
  hex: string;
  rgb: [number, number, number];
  cmyk: [number, number, number, number];
  hsb: [number, number, number];
  hsl: [number, number, number];
  lab: [number, number, number];
}

export const oceanSunset: Color[] = [{"name":"Prussian Blue","hex":"001427","rgb":[0,20,39],"cmyk":[100,49,0,85],"hsb":[209,100,15],"hsl":[209,100,8],"lab":[6,0,-15]},{"name":"Deep Teal","hex":"708d81","rgb":[112,141,129],"cmyk":[21,0,9,45],"hsb":[155,21,55],"hsl":[155,11,50],"lab":[56,-13,3]},{"name":"Jasmine","hex":"f4d58d","rgb":[244,213,141],"cmyk":[0,13,42,4],"hsb":[42,42,96],"hsl":[42,82,75],"lab":[86,1,40]},{"name":"Brick Ember","hex":"bf0603","rgb":[191,6,3],"cmyk":[0,97,98,25],"hsb":[1,98,75],"hsl":[1,97,38],"lab":[40,64,53]},{"name":"Blood Red","hex":"8d0801","rgb":[141,8,1],"cmyk":[0,94,99,45],"hsb":[3,99,55],"hsl":[3,99,28],"lab":[29,50,42]}];
