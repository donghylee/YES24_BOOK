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
                  <div class="m-t-text6"><span class="price-num">${Math.round(doc.price*0.9)}원</span> (10% 할인) 🅿️ ${Math.round(doc.price*0.1)}</div>
                </div>
                        `
            });

            // 첫번째 섹션 두번째 스와이프

            var swiper3 = new Swiper('.mySwiper3', {
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