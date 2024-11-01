const sections = document.querySelectorAll("section.admin-page");
const submenus = document.querySelectorAll("a.MenuItems_submenu");
const inquiryButtons = document.querySelectorAll("button.inquiry-button");
const notificationListWrap = document.querySelector(".notification-list-wrap");

NodeList.prototype.filter = Array.prototype.filter;

submenus.forEach((submenu) => {
    submenu.addEventListener("click", (e) => {
        console.log("hi");
        sections.forEach((section) => {
            section.classList.remove("selected");
        });
        const selectedSection = sections.filter(
            (section) => submenu.textContent === section.dataset.value
        );
        selectedSection[0].classList.add("selected");
    });
});

inquiryButtons.forEach((inquiryButton) => {
    inquiryButton.addEventListener("click", (e) => {
        sections.forEach((section) => {
            section.classList.remove("selected");
        });
        const postInquirySection = sections.filter(
            (section) => section.dataset.value === "게시글 조회"
        );
        console.log(postInquirySection);
        postInquirySection[0].classList.add("selected");
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const options = document.querySelectorAll(".post-filter-option");
    const inquiryOptions = document.querySelectorAll(
        ".sort-filter-option.inquiry-list"
    );
    const postListContainer = document.querySelector(
        ".ServiceTable_row_wrapper"
    );
    const inquiryTableContainer = document.querySelector(
        ".inquiryTable_container"
    );
    const inquiryTableHeader = document.querySelector(
        ".inquiryTable_row.inquiryTable_header"
    );
    let sortOrder = {};

    function sortHelps(order) {
        const helps = Array.from(
            inquiryTableContainer.querySelectorAll(".inquiryTable_row.data_row")
        );

        helps.forEach((help) => (help.style.display = "flex"));

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
                    help.style.display = "none";
                }
            });
        } else if (order === "봉사단체 가입 문의") {
            helps.forEach((help) => {
                const type = help.querySelector(
                    ".inquiryTable_cell.inquiry_type"
                ).textContent;
                if (!type.includes("봉사단체 가입 문의")) {
                    help.style.display = "none";
                }
            });
        }

        inquiryTableContainer.innerHTML = ``;
        inquiryTableContainer.innerHTML += inquiryTableHeader;
        helps.forEach((help) => {
            inquiryTableContainer.appendChild(help);
        });
    }

    // 최신순으로 정렬
    sortHelps("최신순");

    inquiryOptions.forEach(function (inquiryOption) {
        inquiryOption.addEventListener("click", function () {
            const order = inquiryOption.textContent.trim();

            // 클릭 시마다 정렬 순서 변경
            sortOrder[order] = sortOrder[order] === "asc" ? "desc" : "asc";

            // 모든 옵션의 선택된 클래스 초기화
            inquiryOptions.forEach((inquiryOpt) =>
                inquiryOpt.classList.remove("selected")
            );

            // 클릭된 옵션에 선택된 클래스 추가
            inquiryOption.classList.add("selected");

            // 선택된 옵션에 따라 정렬 또는 필터링 수행
            sortHelps(order);
        });
    });

    function sortPosts(order) {
        const posts = Array.from(
            postListContainer.querySelectorAll(".ServiceTable_row")
        );

        // 모든 게시글 다시 표시
        posts.forEach((post) => (post.style.display = "flex"));

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
                    post.style.display = "none";
                }
            });
        } else if (order === "봉사활동 모집글") {
            posts.forEach((post) => {
                const type = post.querySelector(
                    ".ServiceTable_cell.post_kind"
                ).textContent;
                if (!type.includes("봉사활동 모집글")) {
                    post.style.display = "none";
                }
            });
        } else if (order === "후원 게시글") {
            posts.forEach((post) => {
                const type = post.querySelector(
                    ".ServiceTable_cell.post_kind"
                ).textContent;
                if (!type.includes("후원 게시글")) {
                    post.style.display = "none";
                }
            });
        } else if (order === "이용 후기") {
            posts.forEach((post) => {
                const type = post.querySelector(
                    ".ServiceTable_cell.post_kind"
                ).textContent;
                if (!type.includes("이용 후기")) {
                    post.style.display = "none";
                }
            });
        }

        // 정렬된 순서대로 다시 DOM에 추가
        postListContainer.innerHTML = "";
        posts.forEach((post) => {
            postListContainer.appendChild(post);
        });
    }

    // 페이지 로드 시 기본적으로 '가입일 순'은 내림차순, '이름 순'은 오름차순으로 정렬
    sortOrder["가입일 순"] = "desc";
    sortOrder["최신순"] = "desc";
    sortOrder["이름 순"] = "desc";
    sortOrder["작성일 순"] = "desc";

    // 기본 정렬
    sortPosts("가입일 순");

    // 각 옵션 클릭 시 정렬 및 필터링 수행
    options.forEach(function (option) {
        option.addEventListener("click", function () {
            const order = option.textContent.trim();

            // 클릭 시마다 정렬 순서 변경
            sortOrder[order] = sortOrder[order] === "asc" ? "desc" : "asc";

            // 모든 옵션의 선택된 클래스 초기화
            options.forEach((opt) => opt.classList.remove("selected"));

            // 클릭된 옵션에 선택된 클래스 추가
            option.classList.add("selected");

            // 선택된 옵션에 따라 정렬 또는 필터링 수행
            sortPosts(order);
        });
    });
});

// let notificationContainer = `<li class="notification-container">
//                                 <a href="#" class="notification notification-table"
//                                     ><p class="notification-num notification-table">8</p>
//                                     <h4 class="notification-title">10.22 업데이트 내용 및 바뀐 회원정보 관리 방식 안내</h4>
//                                     <p class="notification-date notification-table">2024.10.21</p></a>
//                             </li>`;
// let text = ``;
// text += notificationContainer;
// text += notificationContainer;
// text += notificationContainer;
// text += notificationContainer;
// text += notificationContainer;
// text += notificationContainer;
// text += notificationContainer;
// text += notificationContainer;
//
// notificationListWrap.innerHTML = text;

let notificationLinks = document.querySelectorAll(
    "a.notification.notification-table"
);

notificationLinks.forEach((notificationLink) => {
    notificationLink.addEventListener("click", (e) => {
        sections.forEach((section) => {
            section.classList.remove("selected");
        });
        const notificationInquirySection = sections.filter(
            (section) => section.dataset.value === "공지사항 조회"
        );
        console.log(notificationInquirySection);
        notificationInquirySection[0].classList.add("selected");
    });
});




// //여기서부터 서버 ==============================================================================
// const Inquriy = document.querySelector(".inquiryTable_container");
// const pagingdiv = document.querySelector(".pagination-list.inquiry-page");
// const keyword = document.querySelector("input[name='keyword']");
// const inquiryPage = document.getElementById(".pagination-list.inquiry-page");
//
//
//
// let content = ``;
//
//
// // 게시글 목록을 표시하는 함수
// const showInquiry = () => {
//     let text = ``; // HTML 내용을 저장할 변수 초기화
//     text += `<div
//                                             class="inquiryTable_row inquiryTable_header"
//                                         >
//                                             <div
//                                                 class="inquiryTable_cell inquiry-headerCell selectAllCell"
//                                             >
//                                                 <input
//                                                     type="checkbox"
//                                                     id="selectAll"
//                                                 />
//                                             </div>
//                                             <div
//                                                 class="inquiryTable_cell inquiry-headerCell"
//                                             >
//                                                 문의 분류
//                                             </div>
//                                             <div
//                                                 class="inquiryTable_cell inquiry-headerCell"
//                                             >
//                                                 작성일
//                                             </div>
//                                             <div
//                                                 class="inquiryTable_cell inquiry-headerCell"
//                                             >
//                                                 문의 제목
//                                             </div>
//
//                                             <div
//                                                 class="inquiryTable_cell inquiry-headerCell"
//                                             >
//                                                 문의 내용
//                                             </div>
//                                             <div
//                                                 class="inquiryTable_cell inquiry-headerCell"
//                                             >
//                                                 작성자
//                                             </div>
//                                             <div
//                                                 class="inquiryTable_cell inquiry-headerCell"
//                                             >
//                                                 이메일
//                                             </div>
//                                             <div
//                                                 class="inquiryTable_cell inquiry-headerCell"
//                                             >
//                                                 상태
//                                             </div>
//                                             <div
//                                                 class="inquiryTable_cell inquiry-headerCell"
//                                             >
//                                                 Action
//                                             </div>
//                                         </div>`
//     inquiries.forEach((inquiry) => {
//         text += `<div class="inquiryTable_row data_row">
//                                             <div class="inquiryTable_cell">
//                                                 <input
//                                                     type="checkbox"
//                                                     class="inquiryCheckbox"
//                                                 />
//                                             </div>
//                                             <div class="inquiryTable_cell inquiry_type">
//                                                 ${inquiry.inquiryType}
//                                             </div>
//                                             <div class="inquiryTable_cell inquiry_date">
//                                                 ${inquiry.createdDate}
//                                             </div>
//                                             <div class="inquiryTable_cell">
//                                                 ${inquiry.postTitle}
//                                             </div>
//
//                                             <div class="inquiryTable_cell">
//                                                 ${inquiry.postContent}
//                                             </div>
//                                             <div class="inquiryTable_cell">
//                                                 ${inquiry.memberNickName}
//                                             </div>
//                                             <div class="inquiryTable_cell">
//                                                 ${inquiry.inquiryEmail}
//                                             </div>
//                                             <div class="inquiryTable_cell">
//                                                 ${inquiry.inquiryStatus}
//                                             </div>
//
//                                             <div class="inquiryTable_cell">
//                                                 <button class="editBtn">
//                                                     답변하기
//                                                 </button>
//                                             </div>
//                                         </div>`;
//     });
//
//     // 게시글 목록을 HTML 요소에 삽입
//     Inquriy.innerHTML = text;
// }
//
// showInquiry();
//
const inquiryAnswerButtons = document.querySelectorAll(
    ".inquiryTable_cell button.editBtn"
);

inquiryAnswerButtons.forEach((inquiryAnswerButton) => {
    inquiryAnswerButton.addEventListener("click", (e) => {
        sections.forEach((section) => {
            section.classList.remove("selected");
        });
        const inquiryAnswerSection = sections.filter(
            (section) => section.dataset.value === "고객센터 문의 답변"
        );
        console.log(inquiryAnswerSection[0].classList.add("selected"));
    });
});
//
// const showPaging = () => {
//     let text = ``;
//
//     // 처음 페이지로 이동하는 버튼
//     text += `
//         <li class="pagination-first">
//             <a href="/admin?page=1&query=${pagination.keyword || ''}" class="pagination-first-link" rel="nofollow">
//                 <span class="pagination-first-icon" aria-hidden="true">«</span>
//             </a>
//         </li>
//     `;
//
//     // 이전 페이지 버튼 추가
//     if (pagination.prev) {
//         text += `
//             <li class="pagination-prev">
//                 <a href="/admin?page=${pagination.startPage - 1}&query=${pagination.keyword || ''}" class="pagination-prev-link" rel="prev nofollow">
//                     <span class="pagination-prev-icon" aria-hidden="true">‹</span>
//                 </a>
//             </li>
//         `;
//     }
//
//     // 페이지 번호 생성
//     for (let i = pagination.startPage; i <= pagination.endPage; i++) {
//         if (pagination.page === i) {
//             console.log(pagination.startPage);
//             console.log(pagination.endPage);
//             console.log(pagination.realEnd);
//             console.log(pagination.rowCount);
//             console.log(pagination.total);
//
//             // 현재 페이지인 경우
//             text += `
//                 <li class="pagination-page active">
//                     <a class="pagination-page-link">${i}</a>
//                 </li>
//             `;
//
//         } else {
//             console.log(":들어옴");
//             console.log(pagination.keyword);
//             // 다른 페이지인 경우
//             text += `
//                 <li class="pagination-page">
//                     <a href="/admin?page=${i}&query=${pagination.keyword || ''}" class="pagination-page-link">${i}</a>
//                 </li>
//             `;
//         }
//     }
//
//     // 다음 페이지 버튼 추가
//     if (pagination.next) {
//         text += `
//             <li class="pagination-next">
//                 <a href="/admin?page=${pagination.endPage + 1}&query=${pagination.keyword || ''}" class="pagination-next-link" rel="next nofollow">
//                     <span class="pagination-next-icon" aria-hidden="true">›</span>
//                 </a>
//             </li>
//         `;
//     }
//
//     // 마지막 페이지로 이동하는 버튼
//     text += `
//         <li class="pagination-last">
//             <a href="/admin?page=${pagination.realEnd}&query=${pagination.keyword || ''}" class="pagination-last-link" rel="nofollow">
//                 <span class="pagination-last-icon" aria-hidden="true">»</span>
//             </a>
//         </li>
//     `;
//
//     text += `</ul>`; // 종료 태그 추가
//     // 페이지 네비게이션을 HTML 요소에 삽입
//     console.log("페이지 네비게이션 생성됨:", text);
//     pagingdiv.innerHTML = text;
// };
// showPaging();
//
// document.addEventListener("DOMContentLoaded", function () {
//     // pagination 객체가 제대로 할당됐는지 확인
//     console.log("pagination 데이터 확인:", pagination);
//
//     if (pagination) {
//         showPaging(); // pagination 데이터가 존재할 경우에만 showPaging() 호출
//     } else {
//         console.error("pagination 데이터가 존재하지 않습니다.");
//     }
// });
// // 키워드 검색 입력 처리
// if (search.keyword === null) {
//     search.keyword = '';
// }
// keyword.value = search.keyword;
//
// notices.forEach((inquiry) => {
//     content += `<div class="inquiryTable_row data_row">
//                                             <div class="inquiryTable_cell">
//                                                 <input
//                                                     type="checkbox"
//                                                     class="inquiryCheckbox"
//                                                 />
//                                             </div>
//                                             <div class="inquiryTable_cell inquiry_type">
//                                                 ${inquiry.inquiryType}
//                                             </div>
//                                             <div class="inquiryTable_cell inquiry_date">
//                                                 ${inquiry.createdDate}
//                                             </div>
//                                             <div class="inquiryTable_cell">
//                                                 ${inquiry.postTitle}
//                                             </div>
//
//                                             <div class="inquiryTable_cell">
//                                                 ${inquiry.postContent}
//                                             </div>
//                                             <div class="inquiryTable_cell">
//                                                 ${inquiry.memberNickName}
//                                             </div>
//                                             <div class="inquiryTable_cell">
//                                                 ${inquiry.inquiryEmail}
//                                             </div>
//                                             <div class="inquiryTable_cell">
//                                                 ${inquiry.inquiryStatus}
//                                             </div>
//
//                                             <div class="inquiryTable_cell">
//                                                 <button class="editBtn">
//                                                     답변하기
//                                                 </button>
//                                             </div>
//                                         </div>`;
// });
// inquiryPage.innerHTML = content;
//
// // 페이지 네비게이션 링크 생성 및 삽입
// content = ``;
// for (let i = pagination.startPage; i <= pagination.endPage; i++) {
//     content += `<a href="/admin?keyword=${search.keyword}&page=${i}">${i}</a>`;
// }
//
// // 게시글 목록을 표시하는 함수
// const showNotice = () => {
//     let text = ``; // HTML 내용을 저장할 변수 초기화
//     notices.forEach((notice) => {
//         text += `<li class="notification-container">
//         <a href="/help/help-notification-inquiry?id=${notice.id}" class="notification notification-table"
//             ><p class="notification-num notification-table">${notice.id}</p>
//             <h4 class="notification-title">${notice.postTitle}</h4>
//             <p class="notification-date notification-table">${notice.createdDate}</p></a>
//         </li>`;
//     });
//
//     // 게시글 목록을 HTML 요소에 삽입
//     Notice.innerHTML = text;
// }
// showNotice();
