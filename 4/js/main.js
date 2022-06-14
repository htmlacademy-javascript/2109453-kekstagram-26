function getRandomPositiveInteger(a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}
const POST_NUMBER = 25;
let index = 0;

const messageTemplate = [
  "Всё отлично!",
  "В целом всё неплохо. Но не всё.",
  "Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.",
  "Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.",
  "Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.",
  "Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!",
];
const nameTemplate = [
  "Анна",
  "София",
  "Виктория",
  "Дарья",
  "Анастасия",
  "Мария",
  "Вероника",
  "Полина",
  "Соломия",
  "Ангелина",
  "Артем",
  "Александр",
  "Максим",
  "Дмитрий",
  "Матвей",
  "Назар",
  "Богдан",
  "Марк",
  "Владислав",
  "Михаил",
];

const notRepeatedNumberList = [];

function getRandomNotRepeated() {
  let randomNumber = getRandomPositiveInteger(1, 50);

  if (!notRepeatedNumberList.includes(randomNumber)) {
    notRepeatedNumberList.push(randomNumber);
    return randomNumber;
  }
  return getRandomNotRepeated();
}

const createPost = () => {
  index++;
  return {
    id: index,
    url: `photos/${index}.jpg`,
    likes: getRandomPositiveInteger(15, 200),
    comments: {
      id: getRandomNotRepeated(),
      avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
      message:
        messageTemplate[
          getRandomPositiveInteger(0, messageTemplate.length - 1)
        ],
      name: nameTemplate[
        getRandomPositiveInteger(0, messageTemplate.length - 1)
      ],
    },
  };
};

const randomPosts = Array.from({ length: POST_NUMBER }, createPost);
