async function fetchBooks(query) {
    const params = new URLSearchParams({
        target: "title",
        query,
        size: 4
    });
    const url = `https://dapi.kakao.com/v3/search/book?${params}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: "KakaoAK e7d46386f29140ff8e68d2efe5d8b802"
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP 오류: ${response.status}`);
    }

    return response.json();
}

async function bookData() {
    try {
        // query와 section ID를 매핑
        const queries = [
            { query: "정원", sectionClass: "s-middle" }
        ];

        for (const { query, sectionClass } of queries) {
            const data = await fetchBooks(query);

            // 해당 섹션 내의 .box 요소 8개 선택
            const section = document.querySelector(`.${sectionClass}`);
            const boxElements = section.querySelectorAll(".swiper-slide");

            boxElements.forEach((box, i) => {
                const doc = data.documents[i];
                if (!doc) return;

                // 요소 생성 및 추가
                box.innerHTML = `<div class="m-t-img"><img src="${doc.thumbnail}"></div>
                <div class="m-t-text">
                  <div class="m-t-text2">${doc.title}</div>
                  <div class="m-t-text3">${doc.contents}</div>
                  
                  <div class="m-t-text5">${doc.author} 저 | ${doc.publisher}</div>
                  <div class="m-t-text6">
                  <span class="price-num">${Math.round(doc.price * 0.9).toLocaleString()}원</span>
                    (10% 할인) 🅿️ ${Math.round(doc.price * 0.1).toLocaleString()}</div>
                </div>
                        `;
                    box.addEventListener('click', function () {
                    window.location.href = './sub.html';
                });
            });

            // 첫번째 섹션 두번째 스와이프

            var swiper3 = new Swiper('.mySwiper3', {
                loop: true,
                spaceBetween: 30,
                effect: 'fade',
                navigation: {
                    nextEl: '.mySwiper3 .swiper-button-next',
                    prevEl: '.mySwiper3 .swiper-button-prev',
                },
                pagination: {
                    el: document.querySelector('.middle-t .swiper-pagination'),
                    clickable: true,
                    renderBullet: function (index, className) {
                        return `<img class="${className}" alt="bookimg" src="${data.documents[index].thumbnail}">`;
                    },
                },
                
            });
        }
    } catch (error) {
        console.error('에러 발생:', error);
    }
}

bookData();

// /////////////////////////////////////////////////////////////////////////////



async function fetchBooks(query) {
    const params = new URLSearchParams({
        target: "title",
        query,
        size: 15 // 원하는 개수만큼 넉넉히 받아옴
    });
    const url = `https://dapi.kakao.com/v3/search/book?${params}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: { Authorization: "KakaoAK e7d46386f29140ff8e68d2efe5d8b802" }
    });

    if (!response.ok) throw new Error(`HTTP 오류: ${response.status}`);
    return response.json();
}

async function pickBooksInit() {
    try {
        const data = await fetchBooks("화제의 책");
        renderBooksSwiper(data.documents, '.mySwiperBooks', '.books-pagination');
    } catch (error) {
        console.error('도서 에러 발생:', error);
    }
}

async function pickretroInit() {
    try {
        const data = await fetchBooks("중고");
        renderBooksSwiper(data.documents, '.mySwiperretro', '.retro-pagination');
    } catch (error) {
        console.error('중고샵 에러 발생:', error);
    }
}

async function pickebookInit() {
    try {
        const data = await fetchBooks("eBook 베스트");
        renderBooksSwiper(data.documents, '.mySwiperebook', '.ebook-pagination');
    } catch (error) {
        console.error('eBook 에러 발생:', error);
    }
}

async function pickcdlpInit() {
    try {
        const data = await fetchBooks("CD");
        renderBooksSwiper(data.documents, '.mySwipercdlp', '.cdlp-pagination');
    } catch (error) {
        console.error('CD/LP 에러 발생:', error);
    }
}

async function pickdvdbdInit() {
    try {
        const data = await fetchBooks("DVD");
        renderBooksSwiper(data.documents, '.mySwiperdvdbd', '.dvdbd-pagination');
    } catch (error) {
        console.error('DVD/BD 에러 발생:', error);
    }
}

async function pickticketInit() {
    try {
        const data = await fetchBooks("티켓");
        renderBooksSwiper(data.documents, '.mySwiperticket', '.ticket-pagination');
    } catch (error) {
        console.error('티켓 에러 발생:', error);
    }
}

function renderBooksSwiper(books, swiperSelector, paginationSelector) {
    const wrapper = document.querySelector(`${swiperSelector} .swiper-wrapper`);

    const perPage = 3;
    const pageCount = Math.ceil(books.length / perPage);
    let slidesHtml = '';

    for (let p = 0; p < pageCount; p++) {
        const pageBooks = books.slice(p * perPage, p * perPage + perPage);
        const booksHtml = pageBooks.map(doc => `
            <div class="pick-book">
                <img src="${doc.thumbnail}" alt="${doc.title}">
                <p class="pick-book-title">${doc.title}</p>
                <p class="pick-book-author">${doc.authors.join(', ')} | ${doc.publisher}</p>
                <p class="pick-book-price">${Math.round(doc.price).toLocaleString()}원</p>
            </div>
        `).join('');

        slidesHtml += `
            <div class="swiper-slide">
                <div class="pick-books">${booksHtml}</div>
            </div>
        `;
    }

    wrapper.innerHTML = slidesHtml;

    new Swiper(swiperSelector, {
        loop: true,
        pagination: {
            el: document.querySelector(paginationSelector),
            type: 'fraction',
        },
        navigation: {
            nextEl: `${swiperSelector} .swiper-button-next`,
            prevEl: `${swiperSelector} .swiper-button-prev`,
        },
    });
}

pickBooksInit();
pickretroInit();
pickebookInit();
pickcdlpInit();
pickdvdbdInit();
pickticketInit();