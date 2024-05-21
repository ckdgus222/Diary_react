// img 모듈화

import back from "./../assets/back.png";
import chest from "./../assets/chest.png";
import leg from "./../assets/leg.png";
import shoulder from "./../assets/shoulder.png";
import arm from "./../assets/arm.png";

// export 내보내기
export function getEmotionImage(part) {
  switch (part) {
    case 1:
      return back;
    case 2:
      return chest;
    case 3:
      return leg;
    case 4:
      return shoulder;
    case 5:
      return arm;
    default:
      return null;
  }
}
