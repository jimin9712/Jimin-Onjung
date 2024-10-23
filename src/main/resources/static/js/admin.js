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
    let sortOrder = {}; // 각 옵션의 정렬 순서를 기억하기 위한 객체

    function sortHelps(order) {
        const helps = Array.from(
            inquiryTableContainer.querySelectorAll(".inquiryTable_row.data_row")
        );

        helps.forEach((help) => (help.style.display = "flex"));

        if (order === "작성일 순") {
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

    sortHelps();

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
    sortOrder["이름 순"] = "asc";

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

let notificationContainer = `<li class="notification-container">
                                <a href="#" class="notification notification-table"
                                    ><p class="notification-num notification-table">8</p>
                                    <h4 class="notification-title">10.22 업데이트 내용 및 바뀐 회원정보 관리 방식 안내</h4>
                                    <p class="notification-date notification-table">2024.10.21</p></a>
                            </li>`;
let text = ``;
text += notificationContainer;
text += notificationContainer;
text += notificationContainer;
text += notificationContainer;
text += notificationContainer;
text += notificationContainer;
text += notificationContainer;
text += notificationContainer;

notificationListWrap.innerHTML = text;

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
