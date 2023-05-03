import Situp from "./detect-pose/situp";
import Squat from "./detect-pose/squat";

export default function EstimatePose(type) {
  switch (type) {
    case "squat":
      return Squat();
    case "situp":
      return Situp();
    default:
      return Squat();
  }
}
