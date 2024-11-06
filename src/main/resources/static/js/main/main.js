const arrows = document.querySelectorAll(".slick-arrow"); // 좌우 화살표 버튼을 선택
const firstBanner = document.createElement("div"); // 첫 번째 배너를 위한 div 생성
const lastBanner = document.createElement("div"); // 마지막 배너를 위한 div 생성
const banner = document.querySelector(".slick-track"); // 배너 컨테이너 선택

let autoSlideInterval = null; // 자동 슬라이드 인터벌을 저장할 변수
let count = 1; // 현재 배너 위치를 나타내는 카운터를 1로 초기화하여 첫 번째 동적 배너가 보이도록 설정
let arrowCheck = true; // 화살표 버튼의 중복 클릭을 방지하기 위한 플래그

async function loadBanners() {
    try {
        const response = await fetch('/support/lastest-support');
        const supports = await response.json();

        banner.innerHTML = ''; // 기존 배너 삭제 후 새 배너 추가
        banner.prepend(lastBanner);
        banner.appendChild(firstBanner);

        supports.slice(0, 9).forEach(support => {
            const bannerSlide = document.createElement("div");
            bannerSlide.classList.add("slick-slide");
            bannerSlide.innerHTML = `
                <div>
                    <a href="#" class="lggyey ejtbh banner-link pc" style="width: 1038px; display: inline-block;">
                        <div class="banner-content-wrapper inner1">
                            <div class="banner-content-wrapper inner2">
                                <div class="banner-content-wrapper inner3">
                                    <span class="cotmec banner-web-sub-title">후원 게시판</span>
                                    <span class="cotmec banner-web-title">${support.postTitle}</span>
                                </div>
                                <button class="elrdiz banner-button-primary">
                                    자세히 알아보기
                                    <svg viewBox="0 0 12 12" class="ifpvod banner-button-arrow">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.68888 11.0004C3.85188 11.0004 4.01388 10.9424 4.13688 10.8264L8.81688 6.43738C9.06088 6.20738 9.06088 5.83638 8.81588 5.60738L4.07988 1.17438C3.83288 0.942377 3.43288 0.942377 3.18588 1.17138C2.93888 1.40038 2.93788 1.77238 3.18388 2.00338L7.47788 6.02238L3.24088 9.99738C2.99588 10.2294 2.99688 10.6014 3.24488 10.8294C3.36788 10.9434 3.52888 11.0004 3.68888 11.0004Z"></path>
                                    </svg>
                                </button>
                            </div>
                            <img class="hkaqym banner-web-image" src="${support.attachmentFileName ? `/attachment/display?attachmentFileName=${support.attachmentFilePath + "/t_" + support.attachmentFileName + support.attachmentFileRealName}` : '/images/default-banner.jpg'}" alt="banner image">
                        </div>
                    </a>
                </div>
            `;
            banner.insertBefore(bannerSlide, firstBanner); // 새 배너 슬라이드를 첫 번째 클론 배너 전에 삽입
        });

        // 배너의 초기 위치 설정
        banner.style.transition = 'none';
        banner.style.transform = `translateX(4248px)`; // 첫 번째 배너가 보이도록 설정
        setTimeout(() => {
            banner.style.transition = ''; // 트랜지션 활성화
        }, 50);

        setupAutoSlide(); // Initialize or restart auto slide
    } catch (error) {
        console.error("Error loading support banners:", error);
    }
}
document.addEventListener("DOMContentLoaded", loadBanners); // 페이지 로드 시 배너 로드

// 자동 슬라이드를 실행하는 함수
const autoSlide = () => {
    count++;
    banner.style.transition = `transform 0.5s`;
    banner.style.transform = `translateX(${5310-(1062 * count)}px)`;

    if (count === banner.children.length - 1) {
        setTimeout(() => {
            banner.style.transition = `none`;
            banner.style.transform = `translateX(4248px)`;
            count = 1;
        }, 500);
    }
};

autoSlideInterval = setInterval(autoSlide, 5000); // 5초 간격으로 자동 슬라이드 실행

arrows.forEach((arrow) => {
    arrow.addEventListener("click", () => {
        if (!arrowCheck) return;
        arrowCheck = false;
        clearInterval(autoSlideInterval);

        const direction = arrow.classList.contains("slick-prev") ? -1 : 1;
        count += direction;
        banner.style.transition = `transform 0.5s`;
        banner.style.transform = `translateX(${-1062 * count}px)`;

        if (count === 0) {
            setTimeout(() => {
                banner.style.transition = `none`;
                banner.style.transform = `translateX(-1062px * (banner.children.length - 2))`;
                count = banner.children.length - 2;
            }, 500);
        } else if (count === banner.children.length - 1) {
            setTimeout(() => {
                banner.style.transition = `none`;
                banner.style.transform = `translateX(-1062px)`;
                count = 1;
            }, 500);
        }

        // 화살표 클릭 후 자동 슬라이드 재시작
        autoSlideInterval = setInterval(autoSlide, 5000);
        setTimeout(() => (arrowCheck = true), 500);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // 리뷰 로드 후 롤러 복제 및 애니메이션 초기화
    loadReviews().then(() => {
        initializeMarquee();
    }).catch(error => {
        console.error('리뷰 로딩 또는 롤러 초기화 중 오류 발생:', error);
    });
});

async function loadReviews() {
    try {
        const response = await fetch('/review/lastest-review');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const reviews = await response.json();

        const reviewContainer = document.querySelector('.rfm-initial-child-container');
        reviewContainer.innerHTML = '';

        reviews.forEach((review) => {
            const reviewCard = `
                <div class="rfm-child">
                    <div class="main-home-review-card">
                        <a href="#" class="hlisls iookvl">
                            <div class="top-part">
                                <div class="image-outer">
                                    <div class="hnuwji cover">
                                        <div class="jslvlk aspect-ratio-card-wrapper card-image">
                                            <div>
                                                <div class="observer"></div>
                                                <img class="hkaqym" src="${review.attachmentFileName ? `/attachment/display?attachmentFileName=${review.attachmentFilePath}/t_${review.attachmentFileName}${review.attachmentFileRealName}` : 'default-image.jpg'}" alt="review image">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div class="bqlqxa user-review">
                                        ${generateStars(review.reviewStarRate)}
                                        <span class="review-count">${review.reviewStarRate}점</span>
                                    </div>
                                    <div class="user-info">
                                        <span class="cwvgid avatar">
                                            <img src="${review.profileFileName ? `/profile/display?memberId=${review.memberId}` : 'default-avatar.jpg'}" alt="프로필">
                                        </span>
                                        <div class="ktmctf user-nick-wrapper">
                                            <p class="jqtfdi">
                                                <span class="hdbjzp nick">${review.memberNickName || '익명'}</span>
                                            </p>
                                        </div>
                                        <div color="#E9EBED" class="diltce"></div>
                                        <p class="date">${review.createdDate}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="content-wrapper">
                                <div>
                                    <div class="info-wrapper">
                                        <p class="ffbtyh" title="${review.postTitle}">
                                            ${review.postContent}
                                        </p>
                                    </div>
                                </div>
                                <div class="bottom-info">
                                    <label class="gqdbhp contest">${review.vtGroupName}</label>
                                    <p>${review.postType || '기타'}</p>
                                    <div color="#E9EBED" class="czkero"></div>
                                    <span class="product-type">구매등급 : ${review.grade || '일반'}</span>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            `;
            reviewContainer.insertAdjacentHTML('beforeend', reviewCard);
        });
    } catch (error) {
        console.error('후기를 불러오는 중 오류 발생:', error);
        throw error; // 오류를 상위로 전달하여 후속 처리를 가능하게 함
    }
}

function generateStars(rating) {
    return Array(rating).fill().map(() => `
        <svg type="star24" color="#2656F6" viewBox="0 0 24 24" class="cafwxx">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M21.952 9.56083C21.8461 9.24417 21.5795 9.01667 21.2545 8.9675L15.4071 8.07583L12.788 2.505C12.6405 2.19417 12.3397 2 12.0006 2C11.6606 2 11.3597 2.19417 11.2123 2.50583L8.59315 8.07583L2.74498 8.9675C2.42165 9.01667 2.15416 9.24417 2.0475 9.56083C1.93917 9.885 2.01916 10.2375 2.25666 10.4808L6.50821 14.7808L5.49907 20.9592C5.44157 21.3042 5.58157 21.6425 5.86323 21.8408C6.01239 21.9467 6.18655 22 6.35988 22C6.50154 22 6.64487 21.9642 6.7757 21.8917L12.0006 19.0092L17.2246 21.8917C17.5154 22.0517 17.8662 22.0325 18.1371 21.8408C18.4179 21.6425 18.5587 21.3042 18.5004 20.96L17.4654 14.8558L21.7436 10.4808C21.9811 10.2375 22.0611 9.88583 21.952 9.56083Z"></path>
        </svg>
    `).join('');
}

function initializeMarquee() {
    // 롤러 복제본 생성
    const roller = document.querySelector(".rfm-initial-child-container");
    roller.id = "roller1"; // 첫 번째 롤러 아이디 설정
    roller.classList.add("original"); // original 클래스 추가

    const clone = roller.cloneNode(true); // 자식까지 복제하도록 true 설정
    clone.id = "roller2"; // 복제본에 아이디 부여
    clone.classList.remove("original"); // original 클래스 제거
    clone.classList.add("clone"); // clone 클래스 추가
    document.querySelector(".rfm-marquee").appendChild(clone); // rfm-marquee에 복제본 추가
}
