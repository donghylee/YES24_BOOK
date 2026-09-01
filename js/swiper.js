// 첫번째 섹션 스와이프

var swiper = new Swiper('.mySwiper', {
  loop: true,
  spaceBetween: 5,
  slidesPerView: 5,
  freeMode: true,
  watchSlidesProgress: true,
});


// 두번째 섹션 왼쪽 스와이프
var textSwiper = new Swiper('.mySwiper1Text',{
  allowTouchMove: false,
});

var swiper1 = new Swiper('.mySwiper1', {
  pagination: {
    el: '.s-left .swiper-pagination',
    type: 'fraction',
  },
  navigation: {
    nextEl: '.s-left .swiper-button-next',
    prevEl: '.s-left .swiper-button-prev',
  },
  on: {
    slideChange: function() {
      textSwiper.slideTo(this.activeIndex);
    },
  },
});

// 첫번째 섹션 스와이프

var swiper2 = new Swiper('.mySwiper2', {
  loop: true,
  spaceBetween: 5,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  thumbs: {
    swiper: swiper,
  },
});

