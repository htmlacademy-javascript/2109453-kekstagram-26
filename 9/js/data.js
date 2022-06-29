import { getRandomPositiveInteger, getRandomNotRepeated } from './util.js';
const POST_NUMBER = 25;
let index = 0;

const messageTemplate = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const descriptionTemplate = [
  'Когда радости нет предела.',
  'Грусть, я тебя не боюсь.',
  'Поднимаю настроение мини–фотосессией.',
  'Любовь в каждом пикселе.',
  'Фото, заряженное на позитив.',
  'Улыбаюсь новому дню.',
  'Я не плачу — это просто дождь.',
  'Карабас–Барабас или «я в плохом расположении духа».',
  'Как мало нужно для счастья.',
  'Теплые воспоминания в холодное время года.',
  'В гневе я страшен.',
  'Знали бы вы, что у меня на уме.',
  'В диком восторге от происходящего.',
  'Поймал дзен.',
  'Досадно, но ладно.',
];

const nameTemplate = [
  'Анна',
  'София',
  'Виктория',
  'Дарья',
  'Анастасия',
  'Мария',
  'Вероника',
  'Полина',
  'Соломия',
  'Ангелина',
  'Артем',
  'Александр',
  'Максим',
  'Дмитрий',
  'Матвей',
  'Назар',
  'Богдан',
  'Марк',
  'Владислав',
  'Михаил',
];

const createComment = (length) => {
  const newArr = [];
  for (let i = 0; i < length; i++) {
    newArr.push({
      id: getRandomNotRepeated(),
      avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
      message:
        messageTemplate[
          getRandomPositiveInteger(0, messageTemplate.length - 1)
        ],
      name: nameTemplate[
        getRandomPositiveInteger(0, messageTemplate.length - 1)
      ],
    });
  }
  return newArr;
};

const createPost = () => {
  index++;
  return {
    id: index,
    url: `photos/${index}.jpg`,
    likes: getRandomPositiveInteger(15, 200),
    description:
      descriptionTemplate[
        getRandomPositiveInteger(0, descriptionTemplate.length - 1)
      ],
    comments: createComment(getRandomPositiveInteger(1, 10)),
  };
};

const createRandomPosts = () => Array.from({ length: POST_NUMBER }, createPost);

export { createRandomPosts };
