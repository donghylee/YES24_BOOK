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