import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';
import '../scss/slider.scss';

function getSlider(obj){
  this.init(obj);
  this.addListeners(obj);
}

getSlider.prototype = {
  swiper: undefined,
  documentElement: document.documentElement,

  init: function(obj){
    if(this.documentElement.clientWidth < 768){
      this.swiper = new Swiper(obj.container, obj.options);
    }
  },

  addListeners: function (obj) {
    window.addEventListener('resize', function () {
      if(this.documentElement.clientWidth < 768 && this.swiper === undefined){
        this.swiper = new Swiper(obj.container, obj.options)
      }else if(this.documentElement.clientWidth > 768 && this.swiper !== undefined){
        this.swiper.destroy(true, true);
        this.swiper = undefined;
        document.querySelector('.slider-pagination').textContent = '';
      }
    }.bind(this));
  }
};

document.addEventListener('DOMContentLoaded', function () {
  const mySlider = new getSlider({
    container: '.slider',
    options: {
      slidesPerView: 'auto',
      spaceBetween: 16,
      pagination: {
        el: '.slider-pagination',
        clickable: true
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
