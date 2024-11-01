document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector(".Filter_searchInput");
    const paginationContainer = document.querySelector(".pagination-list.inquiry-page");
    const inquiryFilters = document.querySelectorAll(".sort-filter-option.inquiry-list");

    // 전역 변수로 현재 검색어와 필터를 저장
    let inquiryKeyword = '';
    let inquiryFilterType = '최신순';

    // 검색어 입력 시 엔터키로 검색
    searchInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();  // 폼 제출 방지
            inquiryKeyword = searchInput.value.trim();  // 검색어를 전역 변수에 저장
            console.log("js에 있는 엔터 입력된 검색어:", inquiryKeyword); // 검색어가 제대로 입력되는지 확인
            fetchFilteredInquiries(1, inquiryKeyword, inquiryFilterType);  // 검색어로 데이터 불러오기
        }
    });

    // 필터 버튼 클릭 시 필터에 맞는 데이터 불러오기
    inquiryFilters.forEach((option) => {
        option.addEventListener("click", () => {
            inquiryFilters.forEach((opt) => opt.classList.remove("selected")); // 모든 필터 초기화
            option.classList.add("selected"); // 선택된 필터만 활성화

            inquiryFilterType = option.textContent.trim();
            console.log("선택된 필터 타입:", inquiryFilterType);
            fetchFilteredInquiries(1, inquiryKeyword, inquiryFilterType); // 필터 조건으로 데이터 불러오기
        });
    });

    // 필터링된 문의 데이터를 가져오는 함수
    const fetchFilteredInquiries = async (page = 1, keyword = inquiryKeyword, filterType = inquiryFilterType) => {
        console.log("js에 있는 요청하는 페이지:", page); // 페이지 번호가 전달되는지 확인
        console.log("js에 있는 검색어:", keyword); // 검색어가 제대로 전달되는지 확인
        try {
            const response = await fetch(`/admin/inquiry-page?page=${page}&query=${keyword}&filterType=${filterType}`);
            const data = await response.json();
            console.log("js 서버 응답 데이터:", data);

            renderInquiries(data.inquiries);

            // renderPagination 호출 시 keyword와 filterType을 함께 전달하여 유지
            renderPagination(data.pagination, keyword, filterType);
        } catch (error) {
            console.error("js 문의 내역 불러오기 오류:", error);
        }
    };

    // 페이지네이션을 렌더링하는 함수
    const renderPagination = (pagination, keyword = '', filterType = '') => {
        let paginationHTML = '';

        // 처음 페이지로 이동
        paginationHTML += `<li class="pagination-first">
            <a href="#" data-page="1" class="pagination-first-link">«</a></li>`;

        // 이전 페이지로 이동
        if (pagination.prev) {
            paginationHTML += `<li class="pagination-prev">
                <a href="#" data-page="${pagination.startPage - 1}" class="pagination-prev-link">‹</a></li>`;
        }

        // 페이지 번호
        for (let i = pagination.startPage; i <= pagination.endPage; i++) {
            paginationHTML += `<li class="pagination-page ${pagination.page === i ? 'active' : ''}">
                <a href="#" data-page="${i}" class="pagination-page-link">${i}</a></li>`;
        }

        // 다음 페이지로 이동
        if (pagination.next) {
            paginationHTML += `<li class="pagination-next">
                <a href="#" data-page="${pagination.endPage + 1}" class="pagination-next-link">›</a></li>`;
        }

        // 마지막 페이지로 이동
        paginationHTML += `<li class="pagination-last">
            <a href="#" data-page="${pagination.realEnd}" class="pagination-last-link">»</a></li>`;

        paginationContainer.innerHTML = paginationHTML;

        // 페이지 버튼 클릭 이벤트 설정
        document.querySelectorAll(".pagination-page-link, .pagination-prev-link, .pagination-next-link, .pagination-first-link, .pagination-last-link").forEach(link => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                const page = e.target.getAttribute("data-page");
                console.log("클릭된 페이지 번호:", page); // 페이지 번호가 잘 전달되는지 확인
                fetchFilteredInquiries(page, inquiryKeyword, inquiryFilterType); // 전역 변수 사용
            });
        });
    };

    // 전체 문의 데이터를 가져오는 함수
    const fetchInquiries = async (page = 1) => {
        try {
            const response = await fetch(`/admin/inquiry-page?page=${page}`);
            const data = await response.json();
            renderInquiries(data.inquiries);
            renderPagination(data.pagination);
        } catch (error) {
            console.error("전체 문의 데이터 불러오기 오류:", error);
        }
    };

    // 초기 데이터 로드
    fetchInquiries(); // 첫 페이지의 데이터를 로드합니다.
});
// ========================================================================여기까지 문의 목록

document.addEventListener("DOMContentLoaded", () => {
    const inquiryAnswerContainer = document.querySelector(".inquiryTable_container");

    inquiryAnswerContainer.addEventListener("click", async (event) => {
        console.log("문의 답변 null 여부 :" + inquiryAnswerContainer); // null 여부 확인
        if (event.target.classList.contains("editBtn")) {
            event.preventDefault();
            const inquiryId = event.target.closest(".data_row").getAttribute("data-id");

            try {
                console.log(`문의 아이디: ${inquiryId}`);
                const response = await fetch(`/admin/inquiry-answer?id=${inquiryId}`);

                if (response.ok) {
                    const data = await response.json();
                    console.log("서버 응답 데이터:", data);
                    renderAnswer(data.inquiry);
                } else {
                    console.error("문의 데이터를 불러오는 데 실패했습니다.");
                }
            } catch (error) {
                console.error("문의 목록을 가져오는데 에러:", error);
            }
        }
    });
    // 답변 렌더링 함수
    const renderAnswer = (inquiryAnswer) => {
        console.log("폼을 렌더링합니다:", inquiryAnswer); // 데이터가 전달되는지 확인
        const answerContainer = document.getElementById("inquiry_answer");
        console.log("answerContainer :" + answerContainer);
        console.log("answerContainer.innerHTML :" + answerContainer.innerHTML);

        answerContainer.innerHTML = `
        <section class="admin-page" data-value="고객센터 문의 답변">
            <div style="max-width: 1080px; margin: 24px 16px 0;">
                <h1>고객센터 문의 답변</h1>
                <div class="form">
                    <form
                        id="new-request"
                        class="request-form"
                        data-form
                        data-form-type="request"
                        action="/help/write"
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
                                value="${inquiryAnswer.postTitle || ''}"
                            />
                        </div>
                        <div class="form-field-gap"></div>
                        <div class="form-field required">
                            <label for="request-description">문의 내용</label>
                            <textarea
                                name="request-description"
                                id="request-description"
                            >${inquiryAnswer.postContent || ''}</textarea>
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
                                value="답변 제출"
                                style="margin-bottom: 30px;"
                            />
                        </footer>
                    </form>
                </div>
            </div>
        </section>
    `;
        answerContainer.style.display = "block";

    };

});
