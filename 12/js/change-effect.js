import { previewImageElement } from './form.js';

const sliderElement = document.querySelector('.effect-level__slider');
const sliderElementWrapper = document.querySelector('.effect-level');
const effectfilterList = document.querySelectorAll('.effects__radio');
const effectValueElement = document.querySelector('.effect-level__value');

sliderElementWrapper.style.display = 'none';

noUiSlider.create(sliderElement, {
  start: [1],
  step: 0.1,
  range: {
    min: 0,
    max: 1,
  },
  connect: 'lower',
});

const changeEffect = (value) => {
  let effectName = '';
  if (value === 'chrome') {
    sliderElementWrapper.style.display = 'block';
    effectName = 'grayscale';
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    });
    sliderElement.noUiSlider.on('update', (values, handle) => {
      previewImageElement.style.filter = '';
      previewImageElement.style.filter = `${effectName}(${values[handle]})`;
    });
  } else if (value === 'sepia') {
    sliderElementWrapper.style.display = 'block';
    effectName = 'sepia';
    sliderElement.noUiSlider.updateOptions({
      start: [1],
      step: 0.1,
      range: {
        min: 0,
        max: 1,
      },
    });
    sliderElement.noUiSlider.on('update', (values, handle) => {
      previewImageElement.style.filter = '';
      previewImageElement.style.filter = `${effectName}(${values[handle]})`;
    });
  } else if (value === 'marvin') {
    sliderElementWrapper.style.display = 'block';
    effectName = 'invert';
    sliderElement.noUiSlider.updateOptions({
      start: [100],
      step: 1,
      range: {
        min: 0,
        max: 100,
      },
    });
    sliderElement.noUiSlider.on('update', (values, handle) => {
      previewImageElement.style.filter = '';
      previewImageElement.style.filter = `${effectName}(${values[handle]}%)`;
    });
  } else if (value === 'phobos') {
    sliderElementWrapper.style.display = 'block';
    effectName = 'blur';
    sliderElement.noUiSlider.updateOptions({
      start: [3],
      step: 0.1,
      range: {
        min: 0,
        max: 3,
      },
    });
    sliderElement.noUiSlider.on('update', (values, handle) => {
      sliderElementWrapper.style.display = 'block';
      previewImageElement.style.filter = '';
      previewImageElement.style.filter = `${effectName}(${values[handle]}px)`;
    });
  } else if (value === 'heat') {
    sliderElementWrapper.style.display = 'block';
    effectName = 'brightness';
    sliderElement.noUiSlider.updateOptions({
      start: [3],
      step: 0.1,
      range: {
        min: 1,
        max: 3,
      },
    });
    sliderElement.noUiSlider.on('update', (values, handle) => {
      previewImageElement.style.filter = '';
      previewImageElement.style.filter = `${effectName}(${values[handle]})`;
    });
  } else if (value === 'none') {
    previewImageElement.style.filter = '';
    sliderElementWrapper.style.display = 'none';
  }
};

effectfilterList.forEach((item) => {
  item.addEventListener('change', (e) => {
    changeEffect(e.target.value);
  });
});

sliderElement.noUiSlider.on('update', () => {
  effectValueElement.value = sliderElement.noUiSlider.get();
});

export { sliderElementWrapper };
