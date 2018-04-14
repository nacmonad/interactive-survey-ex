export const colourGenerator = function (group) {
  switch(group){
    case 1:
      return "#26BCD7";
    case 2:
      return "#003768";
    case 3:
      return "#B6BF00";
    case 4:
      return "#E98300";
    case 5:
      return "#A31A7E";
    case 6:
      return "#8BA4BA";
    case 7:
      return "#00AD83"
    case 8:
      return "#111200"
    case 9:
      return "#88DAE9"
    case 10:
      return "#F4E501"
    case 11:
      return "#E7ECF1"

    default:
      return "pink"
  }
}

export const convertToRgba  = function (hex, alpha){
  var c;
  if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+','+alpha+')';
    }
    throw new Error('Bad Hex');
}
