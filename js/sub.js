function showMore() {

    const bookBox = document.getElementById("bookBox");
    const moreBtn = document.getElementById("moreBtn");

    if (!bookBox.classList.contains("open")) {

        // 펼치기
        bookBox.style.height = bookBox.scrollHeight + "px";

        bookBox.classList.add("open");
        moreBtn.classList.add("open");

        moreBtn.innerHTML = '상세정보 접기 <span>⌃</span>';

    } else {

        // 접기
        bookBox.style.height = "1500px";

        bookBox.classList.remove("open");
        moreBtn.classList.remove("open");

        moreBtn.innerHTML = '상세정보 펼쳐보기 <span>⌄</span>';

    }
}

// 수량 조절
const qtyNum = document.getElementById('qtyNum');
const qtyMinus = document.querySelector('.qty-minus');
const qtyPlus = document.querySelector('.qty-plus');

let qty = 1;
const MIN_QTY = 1;
const MAX_QTY = 10;

function updateQtyDisplay() {
  qtyNum.textContent = qty;
}

qtyPlus.addEventListener('click', () => {
  if (qty < MAX_QTY) {
    qty++;
    updateQtyDisplay();
  }
});

qtyMinus.addEventListener('click', () => {
  if (qty > MIN_QTY) {
    qty--;
    updateQtyDisplay();
  }
});

  const likeBtns = document.querySelectorAll('.likeBtn');

  likeBtns.forEach(function (btn) {
    let likeCount = parseInt(btn.textContent.replace(/[^0-9]/g, '')) || 0;

    btn.addEventListener('click', function () {
      likeCount++;
      btn.textContent = '♥ ' + likeCount;

      btn.classList.remove('flash');
      void btn.offsetWidth; // 강제로 리플로우 발생시켜서 애니메이션 리셋
      btn.classList.add('flash');
    });
  });

  const pagination = document.querySelector('.pagination');

  let currentPage = 1;   // 지금 보고 있는 페이지
  let totalPages = 1;    // 전체 페이지 수 (필요할 때 이 값만 바꿔주면 돼요)

  // 페이지네이션을 화면에 그려주는 함수
  function renderPagination() {
    pagination.innerHTML = ''; // 기존 버튼들 지우고 다시 그리기

    // « 맨 처음으로
    pagination.appendChild(createButton('«', () => goToPage(1)));
    // ‹ 이전 페이지
    pagination.appendChild(createButton('‹', () => goToPage(currentPage - 1)));

    // 1, 2, 3 ... 숫자 버튼들
    for (let i = 1; i <= totalPages; i++) {
      const btn = createButton(i, () => goToPage(i));
      if (i === currentPage) {
        btn.classList.add('current'); // 현재 페이지 표시
      }
      pagination.appendChild(btn);
    }

    // › 다음 페이지
    pagination.appendChild(createButton('›', () => goToPage(currentPage + 1)));
    // » 맨 마지막으로
    pagination.appendChild(createButton('»', () => goToPage(totalPages)));
  }

  // 버튼 하나를 만들어주는 함수
  function createButton(label, onClick) {
    const btn = document.createElement('button');
    btn.textContent = label;
    btn.addEventListener('click', onClick);
    return btn;
  }

  // 페이지 이동 함수
  function goToPage(page) {
    if (page < 1 || page > totalPages) return; // 범위 벗어나면 무시
    currentPage = page;
    renderPagination(); // 다시 그려서 current 위치 갱신

    // 여기에 실제 페이지 내용 바꾸는 코드를 추가하면 돼요
    console.log('현재 페이지:', currentPage);
  }

  renderPagination(); // 처음 실행