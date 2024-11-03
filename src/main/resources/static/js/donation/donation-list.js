const pagingDiv = document.querySelector("nav.page-container.paginator");

document.addEventListener("DOMContentLoaded", () => {
    const radioButtons = document.querySelectorAll(
        '.contest-list-state input[type="radio"]'
    );
    const labels = document.querySelectorAll(".contest-list-state label");
    const accordionDescription = document.querySelector(
        ".accordion-description"
    );
    const svgToggle = document.querySelector(".status-svg svg"); // SVG 요소 선택
    const openButton = document.querySelector(".open-button");
    const inputField = document.querySelector(".header-wrap input");
    const headerWrap = document.querySelector(".header-wrap");
    const bottomWrap = document.querySelector(".bottom-wrap");
    const listItems = document.querySelectorAll(".list-wrap .item");
    const arrowIcon = document.querySelector(".header-wrap .arrow");

    // 기본적으로 SVG 아이콘에 active 클래스 부여
    openButton.classList.add("active");
    svgToggle.style.transform = "rotate(0deg)"; // 기본 상태에서 위쪽 보기

    // 라디오 버튼 클릭 시 active 클래스 옮기기
    radioButtons.forEach((radio) => {
        radio.addEventListener("click", () => {
            labels.forEach((label) => label.classList.remove("active"));
            radio.closest("label").classList.add("active");
            console.log(`선택된 상태: ${radio.value}`);
        });
    });

    // 아코디언 열기/닫기 및 화살표 회전
    openButton.addEventListener("click", () => {
        const isVisible = accordionDescription.style.height !== "0px";

        if (isVisible) {
            accordionDescription.style.height = "0px";
            svgToggle.style.transform = "rotate(90deg)"; // 위쪽 보기
        } else {
            accordionDescription.style.height = "129px";
            svgToggle.style.transform = "rotate(0deg)"; // 아래쪽 보기
        }

        openButton.classList.toggle("active");
    });

    // header-wrap 클릭 시 드롭다운 열기/닫기
    headerWrap.addEventListener("click", (event) => {
        event.stopPropagation();
        const isVisible = bottomWrap.style.visibility === "visible";

        if (isVisible) {
            closeDropdown();
        } else {
            openDropdown();
        }
    });

    // 각 정렬 옵션 클릭 시 이벤트 처리
    listItems.forEach((item) => {
        item.addEventListener("click", () => {
            listItems.forEach((el) => el.classList.remove("active"));
            item.classList.add("active");
            inputField.value = item.textContent.trim();
            closeDropdown();
        });
    });

    // 드롭다운 외부 클릭 시 닫기
    document.addEventListener("click", (event) => {
        if (
            !headerWrap.contains(event.target) &&
            !bottomWrap.contains(event.target)
        ) {
            closeDropdown();
        }
    });

    // 드롭다운 열기 함수
    function openDropdown() {
        bottomWrap.style.visibility = "visible";
        arrowIcon.style.transform = "rotate(270deg)"; // 아래쪽 보기
    }

    // 드롭다운 닫기 함수
    function closeDropdown() {
        bottomWrap.style.visibility = "hidden";
        arrowIcon.style.transform = "rotate(90deg)"; // 위쪽 보기
    }
});
// 목록 반복
const ulElement = document.getElementById("contest-list");

const showDonationPosts = () => {
    ulElement.innerHTML = '';
    const liElement = document.createElement("li");
    let text = '';
    donations.forEach((donation) => {
        text += `
            <a
                href="/donation/donation-inquiry?id=${donation.id}"
                class="donation-list-a"
                >
                <div class="contest-info">
                    <div class="contest-info-top">
                        <div class="outline-info">
                            <div
                                class="outline-info-category"
                            >
                                <label
                                    class="deadline state active"
                                    >${donation.donationEDate - donation.donationSDate}일 남음</label
                                >
                            </div>
                            <div
                                class="outline-info-title"
                            >
                                <h2>
                                    ${donation.postTitle}
                                </h2>
                            </div>
                            <div
                                class="outline-info-companyDesc"
                            >
                                ${donation.postContent}
                            </div>
                        </div>
                      
                    </div>
                    <div class="contest-info-bottom">
                        <div
                            class="profile-image-wrap"
                            style="
                                width: 20px;
                                height: 20px;
                                cursor: default;
                            "
                        >
                            <img
                                class="profile-image"
                                alt="profile-image"
                                src="https://cdn-dantats.stunning.kr/prod/users/8aca0f63-1d3b-4e6d-a3ec-4404690b63e4/avatar/fvBZSrehSed7XvGb.%E1%84%92%E1%85%A1%E1%84%82%E1%85%A1%E1%84%8F%E1%85%A1%E1%84%83%E1%85%B3%20CI.png.small?q=100&amp;t=crop&amp;s=40x40&amp;f=webp"
                                style="
                                    width: 20px;
                                    height: 20px;
                                    border-radius: 50%;
                                    object-fit: cover;
                                "
                            />
                        </div>
                        <div
                            class="contest-info-bottom-user-nick"
                        >
                            ${donation.memberNickName}
                        </div>
                        <div
                            class="contest-info-bottom-view-icon"
                        >
                            <svg
                                type="eye16"
                                color="#8E94A0"
                                viewBox="0 0 16 16"
                                class="trophy-svg"
                            >
                                <path
                                    d="M9.99999 8.00001C9.99999 9.10458 9.10456 10 7.99999 10C6.89542 10 5.99999 9.10458 5.99999 8.00001C5.99999 6.89544 6.89542 6.00001 7.99999 6.00001C9.10456 6.00001 9.99999 6.89544 9.99999 8.00001Z"
                                    stroke-width="1.2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                ></path>
                                <path
                                    d="M8.00028 3.33334C5.0152 3.33334 2.48834 5.29526 1.63882 7.99999C2.48833 10.7047 5.01519 12.6667 8.0003 12.6667C10.9854 12.6667 13.5122 10.7048 14.3618 8.00003C13.5123 5.29529 10.9854 3.33334 8.00028 3.33334Z"
                                    stroke-width="1.2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                ></path>
                                <defs></defs>
                            </svg>
                        </div>
                        <div
                            class="contest-info-bottom-view-count"
                        >
                            ${donation.viewCount}
                        </div>
                    </div>
                </div>
                <ul class="prize-info">
                    <li class="prize-info-row">
                        <div class="prize-info-row-key">
                            <svg
                                type="contest16"
                                color="#8E94A0"
                                viewBox="0 0 16 16"
                                class="trophy-svg"
                            >
                                <path
                                    d="M8.10192 14.5629H4.95866C4.95866 11.6908 8.10192 11.7272 8.10192 11.7272V9.8596C4.71508 9.8596 4.59534 7.1023 4.59534 7.1023L4.23682 2H8.10192"
                                    stroke-width="1.2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                ></path>
                                <path
                                    d="M8.10193 14.5629H11.2452C11.2452 11.6908 8.10193 11.7272 8.10193 11.7272V9.8596C11.4881 9.8596 11.6078 7.1023 11.6078 7.1023L11.9663 2H8.10193"
                                    stroke-width="1.2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                ></path>
                                <path
                                    d="M4.68623 7.73717C2.83544 7.65737 2.20118 6.73757 2.05681 5.96687C1.80707 4.63127 2.40918 4.05797 3.30549 4.21617"
                                    stroke-width="1.2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                ></path>
                                <path
                                    d="M11.5037 7.73717C13.3538 7.65737 13.9887 6.73757 14.1331 5.96687C14.3828 4.63127 13.7807 4.05797 12.8837 4.21617"
                                    stroke-width="1.2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                ></path>
                                <defs></defs>
                            </svg>
                            <span>목표 기부액</span>
                        </div>
                        <div
                            class="prize-info-row-label"
                        >
                            ${donation.goalPoint} 포인트
                        </div>
                    </li>
                    <li class="prize-info-row">
                        <div class="prize-info-row-key">
                            <svg
                                type="calendar12"
                                color="#8E94A0"
                                viewBox="0 0 12 12"
                                class="calendar-svg"
                            >
                                <rect
                                    x="0.6"
                                    y="2.6"
                                    width="10.8"
                                    height="8.8"
                                    rx="1.4"
                                    stroke-width="1.2"
                                ></rect>
                                <path
                                    d="M3 2V1"
                                    stroke-width="1.2"
                                    stroke-linecap="round"
                                ></path>
                                <path
                                    d="M9 2V1"
                                    stroke-width="1.2"
                                    stroke-linecap="round"
                                ></path>
                                <path
                                    d="M1 5H12"
                                    stroke-width="1.2"
                                ></path>
                                <rect
                                    x="3"
                                    y="7"
                                    width="2"
                                    height="2"
                                    rx="0.5"
                                ></rect>
                                <defs></defs>
                            </svg>
                            <span>남은 기간</span>
                        </div>
                        <div
                            class="prize-info-row-label"
                        >
                            ${donation.donationEDate - donation.donationSDate}일
                        </div>
                    </li>
                    <li class="prize-info-row">
                        <div
                            class="prize-info-row-key"
                        ></div>
                        <div
                            class="prize-info-row-label"
                        >
                            <div
                                class="prize-info-row-label-date"
                            >
                                ${donation.donationSDate} ~ ${donation.donationEDate}
                                (24시까지)
                            </div>
                        </div>
                    </li>
                </ul></a
            >
        `;
    })
    liElement.innerHTML = text;
    ulElement.appendChild(liElement);
};

// 페이지 네비게이션을 표시하는 함수
const showPaging = () => {
    let text = ``; // HTML 내용을 저장할 변수 초기화

    // 이전 페이지 버튼 추가
    if (pagination.page > 1) {
        text += `<a 
                    href="/review/review-list?page=${pagination.page - 1}" 
                    class="page-btn prev"
                    ><svg
                        viewBox="0 0 12 12"
                        class="icon-default"
                    >
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M3.68888 11.0004C3.85188 11.0004 4.01388 10.9424 4.13688 10.8264L8.81688 6.43738C9.06088 6.20738 9.06088 5.83638 8.81588 5.60738L4.07988 1.17438C3.83288 0.942377 3.43288 0.942377 3.18588 1.17138C2.93888 1.40038 2.93788 1.77238 3.18388 2.00338L7.47788 6.02238L3.24088 9.99738C2.99588 10.2294 2.99688 10.6014 3.24488 10.8294C3.36788 10.9434 3.52888 11.0004 3.68888 11.0004Z"
                        ></path>
                        <defs></defs>
                    </svg>
                </a>`;
    }

    // 페이지 번호 생성
    for (let i = pagination.startPage; i <= pagination.endPage; i++) {
        if (pagination.page === i) {
            // 현재 페이지인 경우
            text += `<a class="page-btn active">${i}</a>`;
        } else {
            // 다른 페이지인 경우
            text += `<a href="/review/review-list?page=${i}" class="page-btn">${i}</a>`;
        }
    }

    // 다음 페이지 버튼 추가: endPage가 realEnd보다 작거나, 더 로드할 데이터가 있을 경우
    const shouldShowNext = pagination.endPage < pagination.realEnd || (pagination.endRow < pagination.total);

    // 다음 페이지 버튼 추가: endPage가 realEnd보다 작거나, 더 로드할 데이터가 있을 경우
    if (shouldShowNext) {
        text += `<a 
                    href="/review/review-list?page=${pagination.page + 1}" 
                    class="page-btn next"
                    ><svg
                        viewBox="0 0 12 12"
                        class="icon-default"
                    >
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M3.68888 11.0004C3.85188 11.0004 4.01388 10.9424 4.13688 10.8264L8.81688 6.43738C9.06088 6.20738 9.06088 5.83638 8.81588 5.60738L4.07988 1.17438C3.83288 0.942377 3.43288 0.942377 3.18588 1.17138C2.93888 1.40038 2.93788 1.77238 3.18388 2.00338L7.47788 6.02238L3.24088 9.99738C2.99588 10.2294 2.99688 10.6014 3.24488 10.8294C3.36788 10.9434 3.52888 11.0004 3.68888 11.0004Z"
                        ></path>
                        <defs></defs>
                    </svg>
                </a>`;
    }

    // 페이지 네비게이션을 HTML 요소에 삽입
    pagingDiv.innerHTML = text;
}

showDonationPosts();
showPaging();
