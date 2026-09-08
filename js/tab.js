// 화제의 책, 외국도서, 세트도서 부분

const pickLinks = document.querySelectorAll('.pick-subnav a');

pickLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
        e.preventDefault();

        // 기존 on 제거
        pickLinks.forEach(function(item) {
            item.classList.remove('on');
        });

        // 클릭한 메뉴에 on 추가
        this.classList.add('on');
    });
});


// 탭 부분 나누는 공간

const tabs = document.querySelectorAll('.tabs_r');
const panels = document.querySelectorAll('.tab-panel');

tabs.forEach(tab => {
  tab.addEventListener('click', function (e) {
    e.preventDefault();

    // 1. 모든 li에서 active 제거
    document.querySelectorAll('.pick-tabs li').forEach(li => li.classList.remove('active'));
    // 2. 클릭한 탭의 부모 li에 active 추가
    this.closest('li').classList.add('active');

    // 3. 모든 패널 숨기기
    panels.forEach(panel => panel.classList.remove('active'));

    // 4. data-tab과 일치하는 패널만 보이기
    const target = this.dataset.tab;
    document.querySelector(`.tab-panel[data-panel="${target}"]`).classList.add('active');
  });
});