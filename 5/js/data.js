import { getRandomPositiveInteger, getRandomNotRepeated } from './util.js';

let index = 0;

const messageTemplate = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
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

export { createPost };
