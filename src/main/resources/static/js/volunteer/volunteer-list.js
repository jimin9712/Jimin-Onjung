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
const listLayout = document.getElementById("contest-list");

const showList = () => {
    // lists가 정의되지 않았거나 비어 있는 경우 처리
    if (!lists || lists.length === 0) {
        listLayout.innerHTML = `<div class="no-lists">게시글이 없습니다.</div>`;
        return;
    }

    // 기존 목록 비우기
    listLayout.innerHTML = '';

    // 리스트가 있을 때 각 리스트 항목을 li 요소로 생성하여 추가
    if (!lists || lists.length === 0) {
        text = `<div class="no-posts">게시글이 없습니다.</div>`;
    } else {
        lists.forEach((list) => {
            const liElement = document.createElement("li");
            liElement.innerHTML = `
            <a href="/volunteer/volunteer?Id=${list.id}" class="donation-list-a">
                <div class="contest-info">
                    <div class="contest-info-top">
                        <div class="outline-info">
                            <div class="outline-info-category">
                                <label class="deadline state active">${list.daysLeft > 0 ? '모집중' : '모집 종료 됨'}</label>
                                <span></span>${list.postType || '타입없음'}
                            </div>
                            <div class="outline-info-title">
                                <h2>${list.postTitle || '제목없음'}</h2>
                            </div>
                            <div class="outline-info-companyDesc">
                                ${list.postSummary || '요약본없음'}
                            </div>
                        </div>
                    </div>
                    <div class="contest-info-bottom">
                        <div class="profile-image-wrap" style="width: 20px; height: 20px; cursor: default;">
                            <img
                                class="profile-image"
                                alt="profile-image"
                                src="${list.profileImage || 'https://via.placeholder.com/20'}"
                                style="width: 20px; height: 20px; border-radius: 50%; object-fit: cover;"
                            />
                        </div>
                        <div class="contest-info-bottom-user-nick">
                            ${list.memberNickName || '닉네임없음'}
                        </div>
                        <div class="contest-info-bottom-view-icon">
                            <svg type="eye16" color="#8E94A0" viewBox="0 0 16 16" class="trophy-svg">
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
                            </svg>
                        </div>
                        <div class="contest-info-bottom-view-count">
                            ${list.postViewCount || '뷰카운트없음'}
                        </div>
                    </div>
                </div>
                <ul class="prize-info">
                    <li class="prize-info-row">
                        <div class="prize-info-row-key">
                            <svg type="contest16" color="#8E94A0" viewBox="0 0 16 16" class="trophy-svg">
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
                            </svg>
                            <span>모집된 인원</span>
                        </div>
                        <div class="prize-info-row-label">
                            ${list.nowRecruitmentCount || '지원자 없음'}
                        </div>
                    </li>
                    <li class="prize-info-row">
                        <div class="prize-info-row-key">
                            <svg type="contest16" color="#8E94A0" viewBox="0 0 16 16" class="trophy-svg">
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
                            </svg>
                            <span>모집 인원</span>
                        </div>
                        <div class="prize-info-row-label">
                            ${list.recruitmentCount+'명' || '모집인원없음'}
                        </div>
                    </li>
                    <li class="prize-info-row">
                        <div class="prize-info-row-key">
                            <svg type="calendar12" color="#8E94A0" viewBox="0 0 12 12" class="calendar-svg">
                                <rect x="0.6" y="2.6" width="10.8" height="8.8" rx="1.4" stroke-width="1.2"></rect>
                                <path d="M3 2V1" stroke-width="1.2" stroke-linecap="round"></path>
                                <path d="M9 2V1" stroke-width="1.2" stroke-linecap="round"></path>
                                <path d="M1 5H12" stroke-width="1.2"></path>
                                <rect x="3" y="7" width="2" height="2" rx="0.5"></rect>
                            </svg>
                            <span>남은 기간</span>
                        </div>
                        <div class="prize-info-row-label">
                            ${list.daysLeft || '종료 됨'}
                        </div>
                    </li>
                    <li>
                        <div class="prize-info-row-key"></div>
                        <div class="prize-info-row-label" id="width200padding-left28">
                            <div class="prize-info-row-label-date">
                                ${list.vtSDate || '시작시간없음'} ~ ${list.vtEDate || '끝나는시간없음'} 
                                <div>(24시까지)</div>
                            </div>
                        </div>
                    </li>
                </ul>
            </a>
        `;
            listLayout.appendChild(liElement);  // 생성된 li 요소를 리스트에 추가
        });
    }
};

// 함수 호출
showList();


//
//     if(pagination.prev){
//         pagingText += `
//             <div><a href="${pagination.startPage - 1}">이전</a></div>
//         `
//     }
//     for(let i=pagination.startPage; i<=pagination.endPage; i++){
//         if(pagination.page === i){
//             pagingText += `<div style="color: red">${i}</div>`
//         }else{
//             pagingText += `<div><a href="${i}">${i}</a></div>`
//         }
//     }
//
//     if(pagination.next) {
//         pagingText += `
//             <div><a href="${pagination.endPage + 1}">다음</a></div>
//         `
//     }
//
//     replyPaging.innerHTML = pagingText;
// }