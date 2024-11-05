const sections = document.querySelectorAll("section.admin-page");
const submenus = document.querySelectorAll("a.MenuItems_submenu");
const inquiryButtons = document.querySelectorAll("button.inquiry-button");
const notificationListWrap = document.querySelector(".notification-list-wrap");

// NodeList에 filter 메서드를 추가
NodeList.prototype.filter = Array.prototype.filter;

// 서브메뉴 클릭 시 해당 섹션 표시
submenus.forEach((submenu) => {
    submenu.addEventListener("click", (e) => {
        sections.forEach((section) => {
            section.classList.remove("selected"); // 모든 섹션 선택 해제
        });
        const selectedSection = sections.filter(
            (section) => submenu.textContent === section.dataset.value // 클릭된 서브메뉴와 일치하는 섹션 찾기
        );
        selectedSection[0].classList.add("selected"); // 해당 섹션 선택
    });
});

// 문의 버튼 클릭 시 게시글 조회 섹션 표시
inquiryButtons.forEach((inquiryButton) => {
    inquiryButton.addEventListener("click", (e) => {
        sections.forEach((section) => {
            section.classList.remove("selected"); // 모든 섹션 선택 해제
        });
        const postInquirySection = sections.filter(
            (section) => section.dataset.value === "게시글 조회" // 게시글 조회 섹션 찾기
        );
        postInquirySection[0].classList.add("selected"); // 해당 섹션 선택
    });
});

// DOM이 로드된 후 실행되는 코드
document.addEventListener("DOMContentLoaded", function () {
    const options = document.querySelectorAll(".post-filter-option"); // 필터 옵션
    const inquiryOptions = document.querySelectorAll(
        ".sort-filter-option.inquiry-list" // 문의 정렬 옵션
    );
    const postListContainer = document.querySelector(
        ".ServiceTable_row_wrapper" // 게시글 리스트 컨테이너
    );
    const inquiryTableContainer = document.querySelector(
        ".inquiryTable_container" // 문의 리스트 컨테이너
    );
    const inquiryTableHeader = document.querySelector(
        ".inquiryTable_row.inquiryTable_header" // 문의 리스트 헤더
    );
    let sortOrder = {}; // 정렬 순서 저장

    // 문의 리스트 정렬 함수
    function sortHelps(order) {
        const helps = Array.from(
            inquiryTableContainer.querySelectorAll(".inquiryTable_row.data_row") // 문의 리스트 데이터
        );

        helps.forEach((help) => (help.style.display = "flex")); // 모든 항목 표시

        // 정렬 기준에 따른 정렬 수행
        if (order === "최신순") {
            helps.sort((a, b) => {
                const dateA = new Date(
                    a.querySelector(
                        ".inquiryTable_cell.inquiry_date"
                    ).textContent
                );
                const dateB = new Date(
                    b.querySelector(
                        ".inquiryTable_cell.inquiry_date"
                    ).textContent
                );
                return sortOrder[order] === "asc"
                    ? dateA - dateB
                    : dateB - dateA;
            });
        } else if (order === "일반 문의") {
            helps.forEach((help) => {
                const type = help.querySelector(
                    ".inquiryTable_cell.inquiry_type"
                ).textContent;
                if (!type.includes("일반 문의")) {
                    help.style.display = "none"; // 조건에 맞지 않는 항목 숨기기
                }
            });
        } else if (order === "봉사단체 가입 문의") {
            helps.forEach((help) => {
                const type = help.querySelector(
                    ".inquiryTable_cell.inquiry_type"
                ).textContent;
                if (!type.includes("봉사단체 가입 문의")) {
                    help.style.display = "none"; // 조건에 맞지 않는 항목 숨기기
                }
            });
        }

        inquiryTableContainer.innerHTML = ``;
        inquiryTableContainer.innerHTML += inquiryTableHeader; // 헤더 다시 추가
        helps.forEach((help) => {
            inquiryTableContainer.appendChild(help); // 정렬된 항목 추가
        });
    }

    sortHelps("최신순"); // 기본적으로 최신순으로 정렬

    // 문의 정렬 옵션 클릭 시 정렬 수행
    inquiryOptions.forEach(function (inquiryOption) {
        inquiryOption.addEventListener("click", function () {
            const order = inquiryOption.textContent.trim(); // 클릭된 옵션의 텍스트 가져오기

            sortOrder[order] = sortOrder[order] === "asc" ? "desc" : "asc"; // 정렬 순서 토글

            inquiryOptions.forEach((inquiryOpt) =>
                inquiryOpt.classList.remove("selected") // 모든 옵션 선택 해제
            );

            inquiryOption.classList.add("selected"); // 클릭된 옵션 선택
            sortHelps(order); // 선택된 옵션에 따라 정렬 수행
        });
    });

    // 게시글 정렬 함수
    function sortPosts(order) {
        const posts = Array.from(
            postListContainer.querySelectorAll(".ServiceTable_row") // 게시글 데이터
        );

        posts.forEach((post) => (post.style.display = "flex")); // 모든 게시글 표시

        // 정렬 기준에 따른 정렬 수행
        if (order === "작성일 순") {
            posts.sort((a, b) => {
                const dateA = new Date(
                    a.querySelector(".ServiceTable_cell.Join_date").textContent
                );
                const dateB = new Date(
                    b.querySelector(".ServiceTable_cell.Join_date").textContent
                );
                return sortOrder[order] === "asc"
                    ? dateA - dateB
                    : dateB - dateA;
            });
        } else if (order === "최신순") {
            posts.sort((a, b) => {
                const countA = a
                    .querySelector(".ServiceTable_cell.hit_ctn")
                    .textContent.trim();
                const countB = b
                    .querySelector(".ServiceTable_cell.hit_ctn")
                    .textContent.trim();
                return sortOrder[order] === "asc"
                    ? countA - countB
                    : countB - countA;
            });
        } else if (order === "조회수 순") {
            posts.sort((a, b) => {
                const countA = a
                    .querySelector(".ServiceTable_cell.hit_ctn")
                    .textContent.trim();
                const countB = b
                    .querySelector(".ServiceTable_cell.hit_ctn")
                    .textContent.trim();
                return sortOrder[order] === "asc"
                    ? countA - countB
                    : countB - countA;
            });
        } else if (order === "댓글수 순") {
            posts.sort((a, b) => {
                const replyA = a
                    .querySelector(".ServiceTable_cell.reply_ctn")
                    .textContent.trim();
                const replyB = b
                    .querySelector(".ServiceTable_cell.reply_ctn")
                    .textContent.trim();
                return sortOrder[order] === "asc"
                    ? replyA - replyB
                    : replyB - replyA;
            });
        } else if (order === "기부 게시글") {
            posts.forEach((post) => {
                const type = post.querySelector(
                    ".ServiceTable_cell.post_kind"
                ).textContent;
                if (!type.includes("기부 게시글")) {
                    post.style.display = "none"; // 조건에 맞지 않는 항목 숨기기
                }
            });
        } else if (order === "봉사활동 모집글") {
            posts.forEach((post) => {
                const type = post.querySelector(
                    ".ServiceTable_cell.post_kind"
                ).textContent;
                if (!type.includes("봉사활동 모집글")) {
                    post.style.display = "none"; // 조건에 맞지 않는 항목 숨기기
                }
            });
        } else if (order === "후원 게시글") {
            posts.forEach((post) => {
                const type = post.querySelector(
                    ".ServiceTable_cell.post_kind"
                ).textContent;
                if (!type.includes("후원 게시글")) {
                    post.style.display = "none"; // 조건에 맞지 않는 항목 숨기기
                }
            });
        } else if (order === "이용 후기") {
            posts.forEach((post) => {
                const type = post.querySelector(
                    ".ServiceTable_cell.post_kind"
                ).textContent;
                if (!type.includes("이용 후기")) {
                    post.style.display = "none"; // 조건에 맞지 않는 항목 숨기기
                }
            });
        }

        postListContainer.innerHTML = "";
        posts.forEach((post) => {
            postListContainer.appendChild(post); // 정렬된 순서대로 다시 DOM에 추가
        });
    }

    sortOrder["가입일 순"] = "desc";
    sortOrder["최신순"] = "desc";
    sortOrder["이름 순"] = "desc";
    sortOrder["작성일 순"] = "desc";

    sortPosts("가입일 순"); // 기본 정렬

    options.forEach(function (option) {
        option.addEventListener("click", function () {
            const order = option.textContent.trim(); // 클릭된 옵션의 텍스트 가져오기

            sortOrder[order] = sortOrder[order] === "asc" ? "desc" : "asc"; // 정렬 순서 토글

            options.forEach((opt) => opt.classList.remove("selected")); // 모든 옵션 선택 해제

            option.classList.add("selected"); // 클릭된 옵션 선택

            sortPosts(order); // 선택된 옵션에 따라 정렬 수행
        });
    });
});

let notificationLinks = document.querySelectorAll(
    "a.notification.notification-table"
);

notificationLinks.forEach((notificationLink) => {
    notificationLink.addEventListener("click", (e) => {
        sections.forEach((section) => {
            section.classList.remove("selected"); // 모든 섹션 선택 해제
        });
        const notificationInquirySection = sections.filter(
            (section) => section.dataset.value === "공지사항 조회" // 공지사항 조회 섹션 찾기
        );
        notificationInquirySection[0].classList.add("selected"); // 해당 섹션 선택
    });
});
//============================================================================고객센터
const inquiryAnswerButtons = document.querySelectorAll(
    ".inquiryTable_cell button.editBtn"
);
const inquirySubButton = document.getElementById("submit-button");

// 답변하기 버튼 클릭 시 고객센터 문의 답변 섹션으로 이동
inquiryAnswerButtons.forEach((inquiryAnswerButton) => {
    inquiryAnswerButton.addEventListener("click", (e) => {
        sections.forEach((section) => {
            section.classList.remove("selected"); // 모든 섹션 선택 해제
        });
        const inquiryAnswerSection = Array.from(sections).find(
            (section) => section.dataset.value === "고객센터 문의 답변" // 고객센터 문의 답변 섹션 찾기
        );
        inquiryAnswerSection.classList.add("selected"); // 해당 섹션 선택
    });
});

// 제출 버튼 클릭 시 고객센터 문의 목록 섹션으로 이동
document.addEventListener("DOMContentLoaded", () => {
    // inquirySubButton 클릭 시 고객센터 문의 목록 섹션만 보이도록 설정
    const inquirySubButton = document.getElementById("submit-button");

    if (inquirySubButton) {
        inquirySubButton.addEventListener("click", () => {
            sections.forEach((section) => section.classList.remove("selected"));
            const inquiryListSection = Array.from(sections).find(
                (section) => section.dataset.value === "고객센터 문의 목록"
            );
            if (inquiryListSection) {
                inquiryListSection.classList.add("selected");
            } else {
                console.error("고객센터 문의 목록 섹션을 찾을 수 없습니다.");
            }
        });
    }
});
// =====================================================================공지사항
const noticeKeyword = document.querySelector("input[name='keyword']");

// 검색 이벤트
noticeKeyword.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        const keyword = noticeKeyword.value.trim();
        fetchNotices(1, keyword);
    }
});
