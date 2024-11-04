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

//========================================================================================
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
// ==================================================================================================문의 목록 페이지네이션
const paginationContainer = document.querySelector(".pagination-list.inquiry-page");
// 페이지네이션을 렌더링하는 함수
const renderPagination = (pagination, keyword = '', filterType = '') => {
    let paginationHTML = '';

    paginationHTML += `<li class="pagination-first">
        <a href="#" data-page="1" class="pagination-first-link">«</a></li>`;

    if (pagination.prev) {
        paginationHTML += `<li class="pagination-prev">
            <a href="#" data-page="${pagination.startPage - 1}" class="pagination-prev-link">‹</a></li>`;
    }

    for (let i = pagination.startPage; i <= pagination.endPage; i++) {
        paginationHTML += `<li class="pagination-page ${pagination.page === i ? 'active' : ''}">
            <a href="#" data-page="${i}" class="pagination-page-link">${i}</a></li>`;
    }

    if (pagination.next) {
        paginationHTML += `<li class="pagination-next">
            <a href="#" data-page="${pagination.endPage + 1}" class="pagination-next-link">›</a></li>`;
    }

    paginationHTML += `<li class="pagination-last">
        <a href="#" data-page="${pagination.realEnd}" class="pagination-last-link">»</a></li>`;

    paginationContainer.innerHTML = paginationHTML;

    document.querySelectorAll(".pagination-page-link, .pagination-prev-link, .pagination-next-link, .pagination-first-link, .pagination-last-link").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const page = e.target.getAttribute("data-page");
            fetchFilteredInquiries(page, inquiryKeyword, inquiryFilterType);
        });
    });
};

// =============================================================여기서부터 공지사항 목록
const noticeContainer = document.querySelector(".notification-list-wrap");
const pagingNotice = document.querySelector(".pagination-wrap.notification-table");

// 공지사항 목록 렌더링 함수
const renderNotice = (notis) => {
    let content = '';
    notis.forEach((notice) => {
        content +=
            `<li class="notification-container" >
                <a href="/admin/notice-list?id=${notice.id}" class="notification noit-admin">
                    <p class="notification-num">${notice.id}</p>
                    <h4 class="notification-title">${notice.postTitle}</h4>
                    <p class="notification-date noit-date-admin">${notice.createdDate}</p>
                </a>
            </li>`;
    });
    noticeContainer.innerHTML = content;
};

// 페이징을 렌더링하는 함수
const renderNoticePagination = (pagination, keyword = '') => {
    let paginationHTML = '';

    if (pagination.prev) {
        paginationHTML += `<a href="#" data-page="${pagination.startPage - 1}" class="pagination-prev">‹</a>`;
    }

    for (let i = pagination.startPage; i <= pagination.endPage; i++) {
        paginationHTML += `<a href="#" data-page="${i}" class="${pagination.page === i ? 'active' : ''}">${i}</a>`;
    }

    if (pagination.next) {
        paginationHTML += `<a href="#" data-page="${pagination.endPage + 1}" class="pagination-next">›</a>`;
    }

    pagingNotice.innerHTML = paginationHTML;
};

// 페이지네이션 이벤트 연결
pagingNotice.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const page = e.target.getAttribute("data-page");
        fetchNotices(page, keyword);
    });
});

// 공지사항 세부 내용을 렌더링하는 함수
const renderNoticeDetail = (notice) => {
    const notificationContainer = document.querySelector(".notification-content"); // 세부내용 표시할 요소
    if (notificationContainer) {
        notificationContainer.innerHTML = `
            <h1>${notice.postTitle}</h1>
            <p>${notice.createdDate}</p>
            <div>${notice.postContent}</div>
        `;
    } else {
        console.error("notificationContainer 요소를 찾을 수 없습니다.");
    }
};
fetchNotices();