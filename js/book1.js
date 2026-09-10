async function fetchBooks(query) {
    const params = new URLSearchParams({
        target: "title",
        query,
        size: 20
    });
    const url = `https://dapi.kakao.com/v3/search/book?${params}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: { Authorization: "KakaoAK e7d46386f29140ff8e68d2efe5d8b802" }
    });

    if (!response.ok) throw new Error(`HTTP 오류: ${response.status}`);
    return response.json();
}

// 섹션별 swiper 클래스, 페이지네이션 셀렉터를 매핑
const sectionConfig = {
    'fo-left-m':  { swiperClass: 'mySwiper4', paginationSelector: '.fo-left-t .swiper-pagination' },
    'top-left-m': { swiperClass: 'mySwiper5', paginationSelector: '.top-left-t .swiper-pagination' }
};

async function bookData() {
    try {
        const queries = [
            { query: "정원", sectionClass: "fo-left-m" },
            { query: "요리", sectionClass: "top-left-m" }   // 두 번째 섹션용 검색어는 원하는 대로 변경
        ];

        for (const { query, sectionClass } of queries) {
            const data = await fetchBooks(query);
            const books = data.documents;
            const section = document.querySelector(`.${sectionClass}`);
            const wrapper = section.querySelector('.swiper-wrapper');

            const perPage = 4;
            const pageCount = Math.ceil(books.length / perPage);
            let slidesHtml = '';

            const config = sectionConfig[sectionClass];
            const imgRowClass = sectionClass === 'top-left-m' ? 'top-img-row' : 'fo-img-row';
            const textRowClass = sectionClass === 'top-left-m' ? 'top-text-row' : 'fo-text-row';
            const imgItemClass = sectionClass === 'top-left-m' ? 'top-left-m-img' : 'fo-left-m-img';
            const textItemClass = sectionClass === 'top-left-m' ? 'top-left-m-text' : 'fo-left-m-text';

            for (let p = 0; p < pageCount; p++) {
                const pageBooks = books.slice(p * perPage, p * perPage + perPage);

                const imgsHtml = pageBooks.map(doc => `
                    <div class="${imgItemClass}"><img src="${doc.thumbnail}"></div>
                `).join('');

                const textsHtml = pageBooks.map(doc => `
                    <div class="${textItemClass}">
                        <div class="m-t-text1">${doc.title}</div>
                        <div class="m-t-text5">${doc.author} 저 | ${doc.publisher}</div>
                        <div class="m-t-text6">${Math.round(doc.price).toLocaleString()}원</div>
                    </div>
                `).join('');

                slidesHtml += `
                    <div class="swiper-slide">
                        <div class="${imgRowClass}">${imgsHtml}</div>
                        <div class="${textRowClass}">${textsHtml}</div>
                    </div>
                `;
            }

            wrapper.innerHTML = slidesHtml;

            new Swiper(`.${config.swiperClass}`, {
                loop: true,
                spaceBetween: 30,
                effect: 'fade',
                navigation: {
                    nextEl: `.${sectionClass} .swiper-button-next`,
                    prevEl: `.${sectionClass} .swiper-button-prev`,
                },
                pagination: {
                    el: config.paginationSelector,
                    type: 'fraction',
                    clickable: true,
                    renderBullet: function (index, className) {
                        const thumb = books[index * perPage]?.thumbnail || '';
                        return `<img class="${className}" alt="bookimg" src="${thumb}">`;
                    },
                },
            });
        }
    } catch (error) {
        console.error('에러 발생:', error);
    }
}

bookData();