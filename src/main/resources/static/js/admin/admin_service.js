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
        fetchFilteredInquiries(1, inquiryKeyword, inquiryFilterType);  // 검색어로 데이터 불러오기
    }
});

// 필터 버튼 클릭 시 필터에 맞는 데이터 불러오기
inquiryFilters.forEach((option) => {
    option.addEventListener("click", () => {
        inquiryFilters.forEach((opt) => opt.classList.remove("selected")); // 모든 필터 초기화
        option.classList.add("selected"); // 선택된 필터만 활성화

        inquiryFilterType = option.textContent.trim();
        fetchFilteredInquiries(1, inquiryKeyword, inquiryFilterType); // 필터 조건으로 데이터 불러오기
    });
});

// 필터링된 문의 데이터를 가져오는 함수
const fetchFilteredInquiries = async (page = 1, keyword = inquiryKeyword, filterType = inquiryFilterType) => {
    try {
        const response = await fetch(`/admin/inquiry-page?page=${page}&query=${keyword}&filterType=${filterType}`);
        const data = await response.json();

        renderInquiries(data.inquiries);
        renderPagination(data.pagination, keyword, filterType);
    } catch (error) {
        // 오류 처리
    }
};

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

// 전체 문의 데이터를 가져오는 함수
const fetchInquiries = async (page = 1) => {
    try {
        const response = await fetch(`/admin/inquiry-page?page=${page}`);
        const data = await response.json();
        renderInquiries(data.inquiries);
        renderPagination(data.pagination);
    } catch (error) {
        // 오류 처리
    }
};

// 초기 데이터 로드
fetchInquiries(); // 첫 페이지의 데이터를 로드합니다.
// ===============================================================================답변하기
document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section.admin-page");
    const inquiryAnswerContainer = document.getElementById("inquiry_answer");

    document.querySelector(".inquiryTable_container").addEventListener("click", async (event) => {
        if (event.target.classList.contains("editBtn")) {
            sections.forEach((section) => section.classList.remove("selected")); // 모든 섹션 선택 해제

            const inquiryAnswerSection = Array.from(sections).find(
                (section) => section.dataset.value === "고객센터 문의 답변"
            );

            if (inquiryAnswerSection) {
                inquiryAnswerSection.classList.add("selected"); // 고객센터 문의 답변 섹션에 selected 추가

                const inquiryId = event.target.closest(".data_row").getAttribute("data-id"); // 게시글 ID 가져오기

                try {
                    const response = await fetch(`/admin/inquiry-answer?id=${inquiryId}`);
                    if (response.ok) {
                        const data = await response.json();
                        renderAnswer(data.inquiry); // 받아온 데이터 렌더링
                    } else {
                        console.error("문의 내역을 가져오는 중 오류 발생:", await response.text());
                    }
                } catch (error) {
                    console.error("서버 요청 중 오류 발생:", error);
                }
            } else {
                console.error("고객센터 문의 답변 섹션을 찾을 수 없습니다.");
            }
        }
    });
});
// ======================================================================================================== 답변제출
const handleAnswerSubmit = async (event) => {
    event.preventDefault(); // 기본 폼 제출 방지

    const form = event.target; // 제출된 폼
    const inquiryId = form.querySelector('input[name="request-title"]').getAttribute("data-id"); // 문의 ID 가져오기
    const answerContent = form.querySelector('textarea[name="answer-content"]').value; // 답변 내용 가져오기

    const payload = {
        inquiryId: inquiryId,
        inquiryAnswer: answerContent,
    };

    try {
        const response = await fetch('/admin/inquiry-answer', {
            method: 'POST',
            body: JSON.stringify(payload), // JSON 형식으로 변환
            headers: {
                'Content-Type': 'application/json', // JSON 형식으로 설정
            },
        });

        if (response.ok) {
            alert("답변이 제출되었습니다."); // 사용자에게 피드백
            fetchInquiries();

            // 모든 섹션의 `selected` 클래스 제거
            sections.forEach((section) => section.classList.remove("selected"));
            console.log("이건가" + sections);
            const inquiryListSection = sections.filter(
                (section) => section.dataset.value === "고객센터 문의 목록"
            );
            if (inquiryListSection) {
                inquiryListSection.classList.add("selected");
            } else {
                console.error("고객센터 문의 목록 섹션을 찾을 수 없습니다.");
            }
        } else {
            const errorText = await response.text();
            console.error("답변 제출 실패:", errorText);
        }
    } catch (error) {
        console.error("서버 요청 중 오류 발생:", error);
    }
};
// ========================================================================== 여기서부터 공지사항
const fetchNotices = async (page = 1, keyword = '', filterType = '최신순') => {
    try {
        const response = await fetch(`/admin/notice-list?page=${page}&query=${keyword}&filterType=${filterType}`);
        const data = await response.json();

        console.log("공지사항 데이터:", data.notices); // 공지사항 목록 확인
        console.log("페이지네이션 데이터:", data.pagination); // 페이지네이션 데이터 확인

        renderNotices(data.notices);
        renderPagination(data.pagination, keyword, filterType);
    } catch (error) {
        console.error("공지사항 데이터를 가져오는 중 오류 발생:", error);
    }
};
