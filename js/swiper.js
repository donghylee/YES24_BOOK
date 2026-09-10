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
  loop: true,
  allowTouchMove: false,
});

var swiper1 = new Swiper('.mySwiper1', {
  loop: true,
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


// -----------------------------------------------------------------
function toggleDropdown() {
  const list = event.currentTarget.nextElementSibling;
  list.classList.toggle('active');
}

document.addEventListener('DOMContentLoaded', function () {
  const rankTabs = document.querySelectorAll('.rank-tab');
  const bookLists = document.querySelectorAll('.book-list');

  rankTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      const range = tab.getAttribute('data-range');

      
      rankTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      
      bookLists.forEach(function (list) {
        if (list.getAttribute('data-range') === range) {
          list.classList.add('active');
        } else {
          list.classList.remove('active');
        }
      });
    });
  });
});



const tabButtons = document.querySelectorAll('.tab-btn');

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

    document.querySelectorAll('.s-list1').forEach(list => list.classList.remove('active'));
    document.querySelectorAll('.arrow-icon1').forEach(arrow => arrow.textContent = '▼');

    
    btn.classList.add('active');

    
    const targetId = btn.getAttribute('data-tab');
    document.getElementById(targetId).classList.add('active');
  });
});

function toggleDropdown(btn) {
  const list = btn.nextElementSibling;
  list.classList.toggle('active');

  const arrow = btn.querySelector('.arrow-icon1');
  if (arrow) {
    arrow.textContent = list.classList.contains('active') ? '▲' : '▼';
  }
}


// 7번째 섹션 스와이프

var swiperLeft = new Swiper('.seven-left .mySwiperLeft', {
  loop: true,
  pagination: {
    el: '.seven-left .swiper-pagination',
    type: 'fraction', // 필요 없으면 이 줄 삭제 (기본은 점 형태)
  },
  navigation: {
    nextEl: '.seven-left .swiper-button-next',
    prevEl: '.seven-left .swiper-button-prev',
  },
});

var swiperTop = new Swiper('.seven-middle-top .mySwiperTop', {
  loop: true,
  pagination: {
    el: '.seven-middle-top .swiper-pagination',
    type: 'fraction',
  },
  navigation: {
    nextEl: '.seven-middle-top .swiper-button-next',
    prevEl: '.seven-middle-top .swiper-button-prev',
  },
});

var swiperBottom = new Swiper('.seven-middle-bottom .mySwiperBottom', {
  loop: true,
  pagination: {
    el: '.seven-middle-bottom .swiper-pagination',
    type: 'fraction',
  },
  navigation: {
    nextEl: '.seven-middle-bottom .swiper-button-next',
    prevEl: '.seven-middle-bottom .swiper-button-prev',
  },
});


const swiperRight = new Swiper('.mySwiperRight', {
  slidesPerView: 1,
  spaceBetween: 0,
  loop: true,
  pagination: {
    el: '.mySwiperRight .swiper-pagination',
    type: 'fraction',
    clickable: true,
  },
  navigation: {
    nextEl: '.mySwiperRight .swiper-button-next',
    prevEl: '.mySwiperRight .swiper-button-prev',
  },
});