// ========================== 문의 내역 렌더링 함수 ==========================
const inquiryContainer = document.querySelector(".inquiryTable_container");

// 문의 내역 렌더링
const renderInquiries = (inquiries) => {
    let content = '';
    inquiries.forEach((inquiry) => {
        content +=
            `<div class="inquiryTable_row data_row" data-id="${inquiry.id}">
                <div class="inquiryTable_cell"><input type="checkbox" class="inquiryCheckbox"/></div>
                <div class="inquiryTable_cell inquiry_type">${inquiry.inquiryType}</div>
                <div class="inquiryTable_cell inquiry_date">${inquiry.createdDate}</div>
                <div class="inquiryTable_cell">${inquiry.postTitle}</div>
                <div class="inquiryTable_cell">${inquiry.postContent}</div>
                <div class="inquiryTable_cell">${inquiry.memberNickName}</div>
                <div class="inquiryTable_cell">${inquiry.inquiryEmail}</div>
                <div class="inquiryTable_cell">${inquiry.inquiryStatus}</div>
                <div class="inquiryTable_cell"><button class="editBtn">답변하기</button></div>
            </div>`;
    });

    if (inquiryContainer) {
        inquiryContainer.innerHTML = content;
    } else {
        console.error("inquiryContainer 요소를 찾을 수 없습니다.");
    }
};
// ========================== 답변 렌더링 함수 ==========================
// 답변 렌더링 함수
const answerContainer = document.getElementById("inquiry_answer");

const renderAnswer = (inquiryAnswer) => {
    if (answerContainer) {
        answerContainer.innerHTML =
            `<div style="max-width: 1080px; margin: 24px 16px 0;">
                <h1>고객센터 문의 답변</h1>
                <div class="form">
                    <form
                        id="new-request"
                        class="request-form"
                        data-form
                        data-form-type="request"
                        action=""
                        accept-charset="UTF-8"
                        method="post"
                    >
                        <div class="form-field required">
                            <label for="request-title">문의 제목</label>
                            <input
                                type="text"
                                name="request-title"
                                id="request-title"
                                maxlength="150"
                                size="150"
                                placeholder="간단한 제목을 입력해주세요."
                                value="${inquiryAnswer.postTitle}"
                                data-id="${inquiryAnswer.id}"
                            />
                        </div>
                        <div class="form-field-gap"></div>
                        <div class="form-field required">
                            <label for="request-description">문의 내용</label>
                            <textarea
                                name="request-description"
                                id="request-description"
                            >${inquiryAnswer.postContent}</textarea>
                        </div>
                        <div class="form-field">
                            <label for="request-attachments">첨부파일</label>
                            <div id="upload-zone" class="upload-zone">
                                <input
                                    type="file"
                                    multiple
                                    id="attach-input"
                                    data-fileupload="true"
                                    data-dropzone="upload-dropzone"
                                />
                                <span>
                                    <a>파일 추가</a>
                                    또는 파일을 여기로 드래그
                                </span>
                            </div>
                            <ul
                                id="attachments-upload-pool"
                                class="attachments-upload-pool"
                            ></ul>
                        </div>
                        <div class="form-field-agreements" style="clear: both">
                            <p id="request-agreements">
                                (주)온정은 정보통신망 이용촉진 및 정보보호
                                등 관한 법률을 준수하며 고객님의 개인정보를
                                수집하고 소중하게 다루고 있습니다. 1. 수집
                                및 이용 항목 : 이메일, 이름, 연락처 2. 수집
                                및 이용 목적 : 앱 이용 문의에 대한 답변 관련
                                업무 3, 보유 및 이용 기간 : 수집 목적이
                                달성되면 모든 개인정보를 파기합니다. 동의를
                                하지 않을 경우 문의한 내용에 대한 답변에
                                제한이 있을 수 있습니다.
                            </p>
                            <label for="request-agreements-check" class="checked">동의합니다.</label>
                            <input
                                name="request-agreements-check"
                                type="hidden"
                                value="off"
                                autocomplete="off"
                            />
                            <input
                                type="checkbox"
                                value="on"
                                id="request-agreements-check"
                                name="request-agreements-check"
                            />
                        </div>
                        <div class="form-field required">
                            <label for="answer-content">답변 작성</label>
                            <textarea
                                name="answer-content"
                                id="answer-content"
                                placeholder="답변 내용을 입력해 주세요."
                            ></textarea>
                        </div>
                        <footer>
                            <input
                                type="submit"
                                name="submit"
                                id="submit-button"
                                value="답변 제출"
                                style="margin-bottom: 30px;"
                            />
                        </footer>
                    </form>
                </div>
            </div>`;
        const answerForm = document.getElementById("new-request");
        answerForm.addEventListener("submit", handleAnswerSubmit);

    } else {
        console.error("answerContainer 요소를 찾을 수 없습니다.");
    }
};
// ========================== 페이지네이션 렌더링 함수 (문의 목록) =========================================
const paginationContainer = document.querySelector(".pagination-list.inquiry-page");

// 페이지네이션을 렌더링하는 함수
const renderPagination = (pagination, keyword = '', filterType = '') => {
    let paginationHTML = ''; // 페이지네이션 HTML 내용을 저장할 변수

    // 첫 페이지 링크 추가
    paginationHTML += `<li class="pagination-first">
        <a href="#" data-page="1" class="pagination-first-link">«</a></li>`;

    // 이전 페이지 링크가 있을 경우 추가
    if (pagination.prev) {
        paginationHTML += `<li class="pagination-prev">
            <a href="#" data-page="${pagination.startPage - 1}" class="pagination-prev-link">‹</a></li>`;
    }

    // 현재 페이지 범위 내의 페이지 번호를 추가
    for (let i = pagination.startPage; i <= pagination.endPage; i++) {
        paginationHTML += `<li class="pagination-page ${pagination.page === i ? 'active' : ''}">
            <a href="#" data-page="${i}" class="pagination-page-link">${i}</a></li>`;
    }

    // 다음 페이지 링크가 있을 경우 추가
    if (pagination.next) {
        paginationHTML += `<li class="pagination-next">
            <a href="#" data-page="${pagination.endPage + 1}" class="pagination-next-link">›</a></li>`;
    }

    // 마지막 페이지 링크 추가
    paginationHTML += `<li class="pagination-last">
        <a href="#" data-page="${pagination.realEnd}" class="pagination-last-link">»</a></li>`;

    // 생성된 HTML을 페이지네이션 컨테이너에 삽입
    paginationContainer.innerHTML = paginationHTML;

    // 모든 페이지 링크에 클릭 이벤트 리스너 추가
    document.querySelectorAll(".pagination-page-link, .pagination-prev-link, .pagination-next-link, .pagination-first-link, .pagination-last-link").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault(); // 기본 링크 클릭 동작 방지
            const page = e.target.getAttribute("data-page"); // 클릭한 링크의 페이지 번호 가져오기
            fetchFilteredInquiries(page, inquiryKeyword, inquiryFilterType); // 해당 페이지의 데이터를 가져오는 함수 호출
        });
    });
};

// ========================== 공지사항 목록 렌더링 함수 ==========================
const noticeContainer = document.querySelector(".notification-list-wrap");
const pagingNotice = document.querySelector(".pagination-wrap.notification-table");

// 공지사항 목록 렌더링 함수
const renderNotice = (notis) => {
    let content = '';
    notis.forEach((notice) => {
        content +=
            `<li class="notification-container" >
                <a data-id="${notice.id}" class="notification noit-admin">
                    <p class="notification-num">${notice.id}</p>
                    <h4 class="notification-title">${notice.postTitle}</h4>
                    <p class="notification-date noit-date-admin">${notice.createdDate}</p>
                </a>
            </li>`;
    });
    noticeContainer.innerHTML = content;
};
// =====================================공지사항 페이지네이션 ======================================================
// 페이징을 렌더링하는 함수
const renderNoticePagination = (pagination, keyword = '') => {
    let notiPagination = ''; // HTML 내용을 저장할 변수 초기화

    // 이전 페이지 버튼 추가
    if (pagination.prev) {
        notiPagination += `
        <div class="pagination-num-container" id="page-prev-button">
            <a data-page="${pagination.startPage - 1}" class="pagination-num" style="padding: 12px;">
                <svg type="arrow12" viewBox="0 0 12 12" class="iFpvod" style="transform: rotate(-180deg);">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.68888 11.0004C3.85188 11.0004 4.01388 10.9424 4.13688 10.8264L8.81688 6.43738C9.06088 6.20738 9.06088 5.83638 8.81588 5.60738L4.07988 1.17438C3.83288 0.942377 3.43288 0.942377 3.18588 1.17138C2.93888 1.40038 2.93788 1.77238 3.18388 2.00338L7.47788 6.02238L3.24088 9.99738C2.99588 10.2294 2.99688 10.6014 3.24488 10.8294C3.36788 10.9434 3.52888 11.0004 3.68888 11.0004Z"></path>
                </svg>
            </a>
        </div>`;
    }

    // 페이지 번호 생성
    for (let i = pagination.startPage; i <= pagination.endPage; i++) {
        if (pagination.page === i) {
            // 현재 페이지인 경우
            notiPagination += `
                <div class="pagination-num-container">
                    <a class="pagination-num active">${i}</a>
                </div>`;
        } else {
            // 다른 페이지인 경우
            notiPagination += `
                <div class="pagination-num-container">
                    <a data-page="${i}" class="pagination-num">${i}</a>
                </div>`;
        }
    }

    // 다음 페이지 버튼 추가
    const notiNextShow = pagination.endPage < pagination.realEnd || (pagination.endRow < pagination.total);
    if (notiNextShow) {
        notiPagination += `
        <div class="pagination-num-container" id="page-next-button">
            <a data-page="${pagination.endPage + 1}" class="pagination-num" id="next" style="padding: 12px">
                <svg viewBox="0 0 12 12" class="iFpvod">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.68888 11.0004C3.85188 11.0004 4.01388 10.9424 4.13688 10.8264L8.81688 6.43738C9.06088 6.20738 9.06088 5.83638 8.81588 5.60738L4.07988 1.17438C3.83288 0.942377 3.43288 0.942377 3.18588 1.17138C2.93888 1.40038 2.93788 1.77238 3.18388 2.00338L7.47788 6.02238L3.24088 9.99738C2.99588 10.2294 2.99688 10.6014 3.24488 10.8294C3.36788 10.9434 3.52888 11.0004 3.68888 11.0004Z"></path>
                </svg>
            </a>
        </div>`;
    }

    // 생성된 HTML을 페이지네이션 컨테이너에 삽입
    pagingNotice.innerHTML = notiPagination;
    // 클릭 이벤트 리스너 추가
    document.querySelectorAll(".pagination-num").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const page = e.target.getAttribute("data-page"); // 클릭한 링크의 페이지 번호 가져오기
            fetchNotices(page, keyword); // 해당 페이지의 데이터를 가져오는 함수 호출
        });
    });
};
// ========================== 공지사항 조회 =======================================
const notificationContainer = document.querySelector(".notification-container"); // 공지사항 세부 내용 컨테이너
const sidebarContainer = document.querySelector(".sidebar-container .sidebar-content"); // 사이드바 컨테이너

// 공지사항 세부 내용을 렌더링하는 함수
const renderNoticeDetail = (notice) => {
    if (notificationContainer) {
        // 공지사항 세부 내용 렌더링
        notificationContainer.innerHTML = `
            <header class="notification-header">
                <h1 style="font-size: 20px">
                    ${notice.postTitle}
                </h1>
            </header>
            <section class="notification-info">
                <div class="notification-content">
                    <div class="notification-body">
                        ${notice.postContent}
                    </div>
                    <div class="notification-attachments">
                        <ul class="attachments"></ul>
                    </div>
                </div>
            </section>
        `;
    } else {
        console.error("notificationContainer 요소를 찾을 수 없습니다.");
    }
};

const renderSidebarNotices = (notices) => {
    let content = '';

    notices.forEach((notice) => {
        content += `
            <li>
                <a href="#" data-id="${notice.id}" class="sidebar-item">${notice.postTitle}</a>
            </li>`;
    });
    content += `<li><a href="#" class="more-button">+ 더보기</a></li>`;

    sidebarContainer.innerHTML = content;

    // "더보기" 버튼 클릭 이벤트
    sidebarContainer.querySelector(".more-button").addEventListener("click", (e) => {
        e.preventDefault();

        // 더보기 클릭 시 전체 목록을 불러오기
        fetchNotices(1, ''); // 페이지 1로 초기화하여 전체 공지사항 목록 불러오기

        // `조회`에서 `목록`으로 `selected` 클래스 전환
        sections.forEach((section) => section.classList.remove("selected")); // 모든 섹션의 `selected` 클래스 제거
        const listSection = Array.from(sections).find(
            (section) => section.dataset.value === "공지사항 목록"
        );
        if (listSection) {
            listSection.classList.add("selected"); // `목록` 섹션에 `selected` 클래스 추가
        } else {
            console.error("목록 섹션을 찾을 수 없습니다.");
        }
    });


    // 각 공지사항 제목 클릭 시 상세 조회 이벤트 추가
    sidebarContainer.querySelectorAll(".sidebar-item").forEach((item) => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            const noticeId = item.getAttribute("data-id");
            fetchNoticeDetail(noticeId); // 공지사항 상세 조회
        });
    });
};
// ==================================회원 목록==========================================================================