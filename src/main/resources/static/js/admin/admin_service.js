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

document.addEventListener("DOMContentLoaded", () => {
    const inquiryAnswerContainer = document.getElementById("inquiry_answer");

    inquiryAnswerContainer.addEventListener("click", async (event) => {
        if (event.target.classList.contains("editBtn")) {
            event.preventDefault(); // 기본 이벤트 방지

            const inquiryId = event.target.closest(".data_row").getAttribute("data-id");
            try {
                const response = await fetch(`/admin/inquiry-answer?id=${inquiryId}`);

                if (response.ok) {
                    const data = await response.json();
                    renderAnswer(data.inquiry);
                }
            } catch (error) {
                // 오류 처리
            }
        }
    });
});

// 답변 제출 폼 처리
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
            window.location.href = '/admin'; // 문의 목록 페이지로 이동
            alert("답변이 제출되었습니다."); // 사용자에게 피드백
        } else {
            const errorText = await response.text(); // 서버 응답 본문 읽기
            // 오류 처리
        }
    } catch (error) {
        // 오류 처리
    }
};
