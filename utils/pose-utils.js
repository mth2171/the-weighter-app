export function getKeypointsObject(pose) {
  return pose[0].keypoints.reduce((obj, item) => {
    obj[item.name] = {
      score: item.score,
      x: item.x,
      y: item.y,
    };
    return obj;
  }, {});
}

export function getAngle(x1, y1, x2, y2) {
  const rad = Math.atan2(y2 - y1, x2 - x1);
  return Math.abs(1 * ((rad * 180) / Math.PI));
}
