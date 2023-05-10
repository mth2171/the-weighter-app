import { useState, useEffect } from "react";
import { getKeypointsObject, getAngle } from "../pose-utils";

export default function Squat() {
  const [count, setCount] = useState(false);
  const [step, setStep] = useState(false);

  const [down, setDown] = useState(false);
  const [up, setUp] = useState(false);

  const checkPoses = (pose) => {
    const { right_hip, right_knee, left_hip, left_knee } = getKeypointsObject(pose);

    const angleKnee = {
      rightHigh: getAngle(right_hip.x, right_hip.y, right_knee.x, right_knee.y),
      leftHigh: getAngle(left_hip.x, left_hip.y, left_knee.x, left_knee.y),
    };

    if (right_knee.score > 0.3 && left_knee.score > 0.3) {
      setDown(checkDown(angleKnee));
      setUp(checkUp(angleKnee));
    } else {
      setDown(false);
      setUp(false);
    }
  };

  useEffect(() => {
    if (!step && down) {
      setStep(true);
      setCount(false);
    }
  }, [down, step]);

  useEffect(() => {
    if (step && up) {
      setStep(false);
      setCount(true);
    }
  }, [up, step, count]);

  return [count, step, checkPoses];
}

const checkDown = (angleKnee) => {
  if (angleKnee.rightHigh > 160 && angleKnee.leftHigh > 160) {
    return true;
  } else if (angleKnee.rightHigh < 20 && angleKnee.leftHigh < 20) {
    return true;
  } else {
    return false;
  }
};

const checkUp = (angleKnee) => {
  if (angleKnee.rightHigh > 70 && angleKnee.rightHigh < 110 && angleKnee.leftHigh > 70 && angleKnee.leftHigh < 110) {
    return true;
  } else {
    return false;
  }
};
