import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';
import '../scss/slider.scss';

function getSlider(obj){
  this.init(obj);
}

getSlider.prototype = {
  swiper: undefined,

  init: function(obj){
    let documentElement = document.documentElement;
    if(documentElement.clientWidth < 768){
      this.swiper = new Swiper(obj.container, obj.options);
    }
  }
};

document.addEventListener('DOMContentLoaded', function () {
  const mySlider = new getSlider({
    container: '.swiper-container',
    options: {
      slidesPerView: 'auto',
      spaceBetween: 16,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      slideClass: 'slider-item',
    }
  });

  var expandedButton = document.querySelector('.expand-button');
  var slider = document.querySelector('.slider');

  expandedButton.addEventListener('click', function (e) {
    e.preventDefault();
    expandedButton.classList.toggle('expand-button--expanded');
    expandedButton.textContent = (expandedButton.classList.contains('expand-button--expanded')) ? 'Скрыть' : 'Показать все';
    slider.classList.toggle('slider--expand');
  });
});
