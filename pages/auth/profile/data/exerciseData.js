const ExerciseData = {
  squat: {
    labels: ["04월 21일", "04월 22일", "04월 23일", "04월 24일", "04월 25일", "04월 26일", "04월 27일"],
    datasets: [
      {
        data: [
          Math.floor(Math.random() * 40 + 60),
          Math.floor(Math.random() * 40 + 60),
          Math.floor(Math.random() * 40 + 60),
          Math.floor(Math.random() * 40 + 60),
          Math.floor(Math.random() * 40 + 60),
          Math.floor(Math.random() * 40 + 60),
          Math.floor(Math.random() * 40 + 60),
          Math.floor(Math.random() * 40 + 60),
        ],
      },
    ],
  },
  pushup: {
    labels: ["04월 21일", "04월 22일", "04월 23일", "04월 24일", "04월 25일", "04월 26일", "04월 27일"],
    datasets: [
      {
        data: [
          Math.floor(Math.random() * 20 + 30),
          Math.floor(Math.random() * 20 + 30),
          Math.floor(Math.random() * 20 + 30),
          Math.floor(Math.random() * 20 + 30),
          Math.floor(Math.random() * 20 + 30),
          Math.floor(Math.random() * 20 + 30),
          Math.floor(Math.random() * 20 + 30),
        ],
      },
    ],
  },
  situp: {
    labels: ["04월 21일", "04월 22일", "04월 23일", "04월 24일", "04월 25일", "04월 26일", "04월 27일"],
    datasets: [
      {
        data: [
          Math.floor(Math.random() * 20 + 50),
          Math.floor(Math.random() * 20 + 50),
          Math.floor(Math.random() * 20 + 50),
          Math.floor(Math.random() * 20 + 50),
          Math.floor(Math.random() * 20 + 50),
          Math.floor(Math.random() * 20 + 50),
          Math.floor(Math.random() * 20 + 50),
        ],
      },
    ],
  },
};

export default ExerciseData;
