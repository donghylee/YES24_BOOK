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


// -----------------------------------------------------------------
function toggleDropdown() {
  // 버튼 바로 다음 형제 요소(ul.s-list)를 찾아서 active 클래스 토글
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