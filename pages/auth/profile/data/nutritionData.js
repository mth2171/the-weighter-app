import moment from "moment";

const NutritionData = {
  month: {
    labels: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
    legend: ["그 외", "지방", "단백질", "탄수화물"],
    data: [
      [
        Math.floor(Math.random() * 200 + 400 * 90),
        Math.floor(Math.random() * 200 + 400 * 90),
        Math.floor(Math.random() * 200 + 400 * 90),
        Math.floor(Math.random() * 200 + 400 * 90),
      ],
      [
        Math.floor(Math.random() * 200 + 400 * 90),
        Math.floor(Math.random() * 200 + 400 * 90),
        Math.floor(Math.random() * 200 + 400 * 90),
        Math.floor(Math.random() * 200 + 400 * 90),
      ],
      [
        Math.floor(Math.random() * 200 + 400 * 90),
        Math.floor(Math.random() * 200 + 400 * 90),
        Math.floor(Math.random() * 200 + 400 * 90),
        Math.floor(Math.random() * 200 + 400 * 90),
      ],
      [
        Math.floor(Math.random() * 200 + 400 * 90),
        Math.floor(Math.random() * 200 + 400 * 90),
        Math.floor(Math.random() * 200 + 400 * 90),
        Math.floor(Math.random() * 200 + 400 * 90),
      ],
      [
        Math.floor(Math.random() * 200 + 400 * 90),
        Math.floor(Math.random() * 200 + 400 * 90),
        Math.floor(Math.random() * 200 + 400 * 90),
        Math.floor(Math.random() * 200 + 400 * 90),
      ],
      [
        Math.floor(Math.random() * 200 + 400 * 90),
        Math.floor(Math.random() * 200 + 400 * 90),
        Math.floor(Math.random() * 200 + 400 * 90),
        Math.floor(Math.random() * 200 + 400 * 90),
      ],
      [
        Math.floor(Math.random() * 200 + 400 * 90),
        Math.floor(Math.random() * 200 + 400 * 90),
        Math.floor(Math.random() * 200 + 400 * 90),
        Math.floor(Math.random() * 200 + 400 * 90),
      ],
      [
        Math.floor(Math.random() * 200 + 400 * 90),
        Math.floor(Math.random() * 200 + 400 * 90),
        Math.floor(Math.random() * 200 + 400 * 90),
        Math.floor(Math.random() * 200 + 400 * 90),
      ],
      [
        Math.floor(Math.random() * 200 + 400 * 90),
        Math.floor(Math.random() * 200 + 400 * 90),
        Math.floor(Math.random() * 200 + 400 * 90),
        Math.floor(Math.random() * 200 + 400 * 90),
      ],
      [
        Math.floor(Math.random() * 200 + 400 * 90),
        Math.floor(Math.random() * 200 + 400 * 90),
        Math.floor(Math.random() * 200 + 400 * 90),
        Math.floor(Math.random() * 200 + 400 * 90),
      ],
      [
        Math.floor(Math.random() * 200 + 400 * 90),
        Math.floor(Math.random() * 200 + 400 * 90),
        Math.floor(Math.random() * 200 + 400 * 90),
        Math.floor(Math.random() * 200 + 400 * 90),
      ],
      [
        Math.floor(Math.random() * 200 + 400 * 90),
        Math.floor(Math.random() * 200 + 400 * 90),
        Math.floor(Math.random() * 200 + 400 * 90),
        Math.floor(Math.random() * 200 + 400 * 90),
      ],
    ],
    barColors: ["rgb(212, 212, 212)", "rgb(125, 211, 252)", "rgb(240, 171, 252)", "rgb(190, 242, 100)"],
  },
  week: {
    labels: ["04월 21일", "04월 22일", "04월 23일", "04월 24일", "04월 25일", "04월 26일", "04월 27일"],
    legend: ["그 외", "지방", "단백질", "탄수화물"],
    data: [
      [
        Math.floor(Math.random() * 200 + 400 * 3),
        Math.floor(Math.random() * 200 + 400 * 3),
        Math.floor(Math.random() * 200 + 400 * 3),
        Math.floor(Math.random() * 200 + 400 * 3),
      ],
      [
        Math.floor(Math.random() * 200 + 400 * 3),
        Math.floor(Math.random() * 200 + 400 * 3),
        Math.floor(Math.random() * 200 + 400 * 3),
        Math.floor(Math.random() * 200 + 400 * 3),
      ],
      [
        Math.floor(Math.random() * 200 + 400 * 3),
        Math.floor(Math.random() * 200 + 400 * 3),
        Math.floor(Math.random() * 200 + 400 * 3),
        Math.floor(Math.random() * 200 + 400 * 3),
      ],
      [
        Math.floor(Math.random() * 200 + 400 * 3),
        Math.floor(Math.random() * 200 + 400 * 3),
        Math.floor(Math.random() * 200 + 400 * 3),
        Math.floor(Math.random() * 200 + 400 * 3),
      ],
      [
        Math.floor(Math.random() * 200 + 400 * 3),
        Math.floor(Math.random() * 200 + 400 * 3),
        Math.floor(Math.random() * 200 + 400 * 3),
        Math.floor(Math.random() * 200 + 400 * 3),
      ],
      [
        Math.floor(Math.random() * 200 + 400 * 3),
        Math.floor(Math.random() * 200 + 400 * 3),
        Math.floor(Math.random() * 200 + 400 * 3),
        Math.floor(Math.random() * 200 + 400 * 3),
      ],
      [
        Math.floor(Math.random() * 200 + 400 * 3),
        Math.floor(Math.random() * 200 + 400 * 3),
        Math.floor(Math.random() * 200 + 400 * 3),
        Math.floor(Math.random() * 200 + 400 * 3),
      ],
    ],
    barColors: ["rgb(212, 212, 212)", "rgb(125, 211, 252)", "rgb(240, 171, 252)", "rgb(190, 242, 100)"],
  },
  day: {
    labels: ["아침", "점심", "저녁"],
    legend: ["그 외", "지방", "단백질", "탄수화물"],
    data: [
      [
        Math.floor(Math.random() * 200 + 400),
        Math.floor(Math.random() * 200 + 400),
        Math.floor(Math.random() * 200 + 400),
        Math.floor(Math.random() * 200 + 400),
      ],
      [
        Math.floor(Math.random() * 200 + 400),
        Math.floor(Math.random() * 200 + 400),
        Math.floor(Math.random() * 200 + 400),
        Math.floor(Math.random() * 200 + 400),
      ],
      [
        Math.floor(Math.random() * 200 + 400),
        Math.floor(Math.random() * 200 + 400),
        Math.floor(Math.random() * 200 + 400),
        Math.floor(Math.random() * 200 + 400),
      ],
    ],
    barColors: ["rgb(212, 212, 212)", "rgb(125, 211, 252)", "rgb(240, 171, 252)", "rgb(190, 242, 100)"],
  },
};

export default NutritionData;
