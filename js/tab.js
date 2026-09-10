document.addEventListener('DOMContentLoaded', function () {

  // 화제의 책, 외국도서, 세트도서 부분
  const pickLinks = document.querySelectorAll('.pick-subnav a');
  pickLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      pickLinks.forEach(item => item.classList.remove('on'));
      this.classList.add('on');
    });
  });

  // 탭 부분 나누는 공간
  const tabs = document.querySelectorAll('.tabs_r');
  const panels = document.querySelectorAll('.tab-panel');
  tabs.forEach(tab => {
    tab.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelectorAll('.pick-tabs li').forEach(li => li.classList.remove('active'));
      this.closest('li').classList.add('active');
      panels.forEach(panel => panel.classList.remove('active'));
      const target = this.dataset.tab;
      document.querySelector(`.tab-panel[data-panel="${target}"]`).classList.add('active');
    });
  });

  // 중간 탭 구간 (ebook 부터)
  const mixtabs = document.querySelectorAll('.mix-tab');
  const mixpanels = document.querySelectorAll('.mix-books');
  const wrap = document.querySelector('.mix-books-wrap');
  mixtabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      mixtabs.forEach(t => t.classList.remove('mix-tab--active'));
      tab.classList.add('mix-tab--active');
      if (wrap) wrap.style.backgroundColor = tab.dataset.color;
      const targetName = tab.dataset.tab;
      mixpanels.forEach(panel => {
        panel.classList.toggle('is-active', panel.dataset.panel === targetName);
      });
    });
  });

  // 상품 상세 정보 페이지
  const detailTabs = document.querySelectorAll(".sub_nav a");
  const contents = document.querySelectorAll(".tab-content");
  detailTabs.forEach(tab => {
    tab.addEventListener("click", function(e) {
      e.preventDefault();
      detailTabs.forEach(item => item.classList.remove("active"));
      this.classList.add("active");
      contents.forEach(content => content.style.display = "none");
      const target = document.querySelector(this.getAttribute("href"));
      if (target) target.style.display = "block";
    });
  });

});
const reviewTabs = document.querySelectorAll(".review-sub_nav a");
const reviewContents = document.querySelectorAll(".review-tab-content");

reviewTabs.forEach(tab => {
  tab.addEventListener("click", function (e) {
    e.preventDefault();
    reviewTabs.forEach(item => item.classList.remove("active"));
    this.classList.add("active");
    reviewContents.forEach(content => content.classList.remove("active"));
    const target = document.querySelector(this.getAttribute("href"));
    if (target) target.classList.add("active");
  });
});