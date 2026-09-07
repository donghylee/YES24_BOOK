async function fetchBooks(query) {
    const params = new URLSearchParams({
        target: "title",
        query,
        size: 20   // 4페이지 x 4권 = 16권
    });
    const url = `https://dapi.kakao.com/v3/search/book?${params}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: { Authorization: "KakaoAK e7d46386f29140ff8e68d2efe5d8b802" }
    });

    if (!response.ok) throw new Error(`HTTP 오류: ${response.status}`);
    return response.json();
}

async function bookData() {
    try {
        const queries = [{ query: "정원", sectionClass: "fo-left-m" }];

        for (const { query, sectionClass } of queries) {
            const data = await fetchBooks(query);
            const books = data.documents;
            const section = document.querySelector(`.${sectionClass}`);
            const wrapper = section.querySelector('.swiper-wrapper');

            const perPage = 4;
            const pageCount = Math.ceil(books.length / perPage);
            let slidesHtml = '';

            for (let p = 0; p < pageCount; p++) {
                const pageBooks = books.slice(p * perPage, p * perPage + perPage);

                const imgsHtml = pageBooks.map(doc => `
                    <div class="fo-left-m-img"><img src="${doc.thumbnail}"></div>
                `).join('');

                const textsHtml = pageBooks.map(doc => `
                    <div class="fo-left-m-text">
                        <div class="m-t-text1">${doc.title}</div>
                        <div class="m-t-text5">${doc.author} 저 | ${doc.publisher}</div>
                        <div class="m-t-text6">${Math.round(doc.price)}원</div>
                    </div>
                `).join('');

                slidesHtml += `
                    <div class="swiper-slide">
                        <div class="fo-img-row">${imgsHtml}</div>
                        <div class="fo-text-row">${textsHtml}</div>
                    </div>
                `;
            }

            wrapper.innerHTML = slidesHtml; // 슬라이드 4개 채우기

            var swiper3 = new Swiper('.mySwiper4', {
                loop: true, 
                spaceBetween: 30,
                effect: 'fade',
                navigation: {
                    nextEl: '.fo-left-m .swiper-button-next',
                    prevEl: '.fo-left-m .swiper-button-prev',
                },
                pagination: {
                    el: '.fo-left-t .swiper-pagination',
                    type: 'fraction',
                    clickable: true,
                    renderBullet: function (index, className) {
                        // 각 bullet은 "슬라이드(페이지)" 단위이므로, 그 페이지 첫 번째 책 썸네일로 표시
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