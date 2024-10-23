const arrows = document.querySelectorAll(".slick-arrow"); // 좌우 화살표 버튼을 선택
const firstBanner = document.createElement("div"); // 첫 번째 배너를 위한 div 생성
const lastBanner = document.createElement("div"); // 마지막 배너를 위한 div 생성
const banner = document.querySelector(".slick-track"); // 배너 컨테이너 선택

let autoSlideInterval = null; // 자동 슬라이드 인터벌을 저장할 변수
let count = 0; // 현재 배너 위치를 나타내는 카운터를 0으로 초기화
let arrowCheck = true; // 화살표 버튼의 중복 클릭을 방지하기 위한 플래그

firstBanner.innerHTML = `
 <div
                                                        data-index="-9"
                                                        tabindex="-1"
                                                        class="slick-slide slick-cloned"
                                                        aria-hidden="true"
                                                        id="first"
                                                    >
                                                        <div>
                                                            <a
                                                                tabindex="-1"
                                                                href=""
                                                                target="_self"
                                                                class="lggyey ejtbh banner-link pc"
                                                                style="
                                                                    width: 100%;
                                                                    display: inline-block;
                                                                "
                                                            >
                                                                <div
                                                                    class="banner-content-wrapper inner1"
                                                                >
                                                                    <div
                                                                        class="banner-content-wrapper inner2"
                                                                    >
                                                                        <div
                                                                            class="banner-content-wrapper inner3"
                                                                        >
                                                                            <span
                                                                                class="cotmec banner-web-sub-title"
                                                                                >후원
                                                                                게시판</span
                                                                            >
                                                                            <span
                                                                                class="cotmec banner-web-title"
                                                                                >아픈
                                                                                딸에게
                                                                                아무
                                                                                것도
                                                                                해줄
                                                                                수가
                                                                                없습니다</span
                                                                            >
                                                                        </div>
                                                                        <button
                                                                            class="elrdiz banner-button-primary"
                                                                        >
                                                                            자세히
                                                                            알아보기
                                                                            <svg
                                                                                viewBox="0 0 12 12"
                                                                                class="ifpvod banner-button-arrow"
                                                                            >
                                                                                <path
                                                                                    fill-rule="evenodd"
                                                                                    clip-rule="evenodd"
                                                                                    d="M3.68888 11.0004C3.85188 11.0004 4.01388 10.9424 4.13688 10.8264L8.81688 6.43738C9.06088 6.20738 9.06088 5.83638 8.81588 5.60738L4.07988 1.17438C3.83288 0.942377 3.43288 0.942377 3.18588 1.17138C2.93888 1.40038 2.93788 1.77238 3.18388 2.00338L7.47788 6.02238L3.24088 9.99738C2.99588 10.2294 2.99688 10.6014 3.24488 10.8294C3.36788 10.9434 3.52888 11.0004 3.68888 11.0004Z"
                                                                                ></path>
                                                                            </svg>
                                                                        </button>
                                                                    </div>
                                                                    <img
                                                                        class="hkaqym banner-web-image"
                                                                        src="../../static/images/banner2.jpg"
                                                                    />
                                                                </div>
                                                            </a>
                                                        </div>
                                                    </div>`; // 첫 번째 배너의 HTML 설정
banner.appendChild(firstBanner); // 첫 번째 배너를 배너 컨테이너 끝에 추가

lastBanner.innerHTML = `
 <div
                                                        data-index="-1"
                                                        tabindex="-1"
                                                        class="slick-slide slick-cloned"
                                                        aria-hidden="true"
                                                    >
                                                        <div>
                                                            <a
                                                                tabindex="-1"
                                                                href=""
                                                                target="_blank"
                                                                class="bnqwuj ejtbh banner-link pc"
                                                                style="
                                                                    width: 100%;
                                                                    display: inline-block;
                                                                "
                                                                id="last"
                                                            >
                                                                <div
                                                                    class="banner-content-wrapper inner1"
                                                                >
                                                                    <div
                                                                        class="banner-content-wrapper inner2"
                                                                    >
                                                                        <div
                                                                            class="banner-content-wrapper inner3"
                                                                        >
                                                                            <span
                                                                                class="cotmec banner-web-sub-title"
                                                                                >후원게시판</span
                                                                            >
                                                                            <span
                                                                                class="cotmec banner-web-title"
                                                                                >학교에
                                                                                가고
                                                                                싶은
                                                                                키르기스스탄
                                                                                장애아동들을
                                                                                도와주세요!</span
                                                                            >
                                                                        </div>
                                                                        <button
                                                                            class="gkeyjr banner-button-primary"
                                                                        >
                                                                            자세히
                                                                            알아보기
                                                                            <svg
                                                                                viewBox="0 0 12 12"
                                                                                class="ifpvod banner-button-arrow"
                                                                            >
                                                                                <path
                                                                                    fill-rule="evenodd"
                                                                                    clip-rule="evenodd"
                                                                                    d="M3.68888 11.0004C3.85188 11.0004 4.01388 10.9424 4.13688 10.8264L8.81688 6.43738C9.06088 6.20738 9.06088 5.83638 8.81588 5.60738L4.07988 1.17438C3.83288 0.942377 3.43288 0.942377 3.18588 1.17138C2.93888 1.40038 2.93788 1.77238 3.18388 2.00338L7.47788 6.02238L3.24088 9.99738C2.99588 10.2294 2.99688 10.6014 3.24488 10.8294C3.36788 10.9434 3.52888 11.0004 3.68888 11.0004Z"
                                                                                ></path>
                                                                            </svg>
                                                                        </button>
                                                                    </div>
                                                                    <img
                                                                        class="hkaqym banner-web-image"
                                                                        src="../../static/images/banner9.jpg
                                                                        "
                                                                    />
                                                                </div>
                                                            </a>
                                                        </div>
                                                    </div>`; // 마지막 배너의 HTML 설정
banner.prepend(lastBanner); // 마지막 배너를 배너 컨테이너 맨 앞에 추가

banner.style.transform = `translate3d(4248px,0px,0px)`; // 초기 배너 위치를 조정하여 첫 번째 배너가 보이도록 설정

// 자동 슬라이드를 실행하는 함수
const autoSlide = () => {
    count++; // 배너 위치를 한 칸 앞으로 이동
    banner.style.transition = `transform 0.5s`; // 배너 이동 애니메이션 설정
    banner.style.transform = `translate3d(${4248 - 1062 * count}px, 0, 0)`; // 배너 이동

    // console.log(`현재 배너 인덱스: ${count}`); // 현재 인덱스 출력

    if (count === 9) {
        // 마지막 배너 위치를 넘었을 경우
        setTimeout(() => {
            banner.style.transition = `transform 0s`; // 애니메이션 없이 배너 위치 초기화
            banner.style.transform = `translate3d(4248px, 0, 0)`; // 처음 위치로 초기화
            count = 0; // 카운터를 첫 번째 배너로 초기화
            // console.log(`현재 배너 인덱스: ${count}`); // 첫 번째 배너로 초기화 후 인덱스 출력
        }, 500);
    }
};
// 3초 간격으로 자동 슬라이드 실행
autoSlideInterval = setInterval(autoSlide, 5000);

// 좌우 화살표 클릭 이벤트 처리
arrows.forEach((arrow) => {
    arrow.addEventListener("click", (e) => {
        if (!arrowCheck) {
            return; // 중복 클릭 방지
        }
        arrowCheck = false; // 중복 클릭 방지를 위해 플래그 설정
        clearInterval(autoSlideInterval); // 자동 슬라이드 멈춤

        let arrowType = arrow.classList.contains("slick-prev")
            ? "left"
            : "right"; // 클릭된 화살표의 방향 확인

        if (arrowType === "left") {
            // 왼쪽 화살표 클릭 시
            count--; // 배너 위치를 한 칸 뒤로 이동
            banner.style.transition = `transform 0.5s`;
            banner.style.transform = `translate(${4248 - 1062 * count}px)`;

            if (count == 0) {
                // 첫 번째 배너 위치를 넘었을 경우
                setTimeout(() => {
                    banner.style.transition = `transform 0s`;
                    banner.style.transform = `translate(-5310px)`; // 마지막 배너로 이동
                }, 500);

                count = 9; // 카운터를 마지막 배너로 초기화
            }
        } else {
            // 오른쪽 화살표 클릭 시
            count++; // 배너 위치를 한 칸 앞으로 이동
            banner.style.transition = `transform 0.5s`;
            banner.style.transform = `translate(${4248 - 1062 * count}px)`;

            if (count == 9) {
                // 마지막 배너 위치를 넘었을 경우
                setTimeout(() => {
                    banner.style.transition = `transform 0s`;
                    banner.style.transform = `translate(4248px)`; // 첫 번째 배너로 이동
                }, 500);

                count = 0; // 카운터를 첫 번째 배너로 초기화
            }
        }

        autoSlideInterval = setInterval(autoSlide, 5000); // 자동 슬라이드 재개

        setTimeout(() => {
            arrowCheck = true; // 클릭 가능 상태로 플래그 재설정
        }, 500);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // 롤링 배너 복제본 생성
    let roller = document.querySelector(".rfm-initial-child-container");
    roller.id = "roller1"; // 첫 번째 롤러 아이디 설정

    let clone = roller.cloneNode(true); // 자식까지 복제하도록 true 설정
    clone.id = "roller2"; // 복제본에 아이디 부여
    document.querySelector(".rfm-marquee").appendChild(clone); // wrap 대신 rfm-marquee에 복제본 추가

    // 첫 번째 배너 위치 설정
    document.querySelector("#roller1").style.left = "0px";

    // 두 번째 배너를 첫 번째 배너 크기만큼 옆에 위치시킴
    document.querySelector("#roller2").style.left = roller.offsetWidth + "px";

    // 스타일 클래스 추가
    roller.classList.add("original");
    clone.classList.add("clone");
});
