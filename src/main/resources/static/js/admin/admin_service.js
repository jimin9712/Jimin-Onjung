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
    // 기존 답변하기 버튼 클릭 이벤트 리스너 내의 inquiryAnswerContainer 호출 부분
    const inquiryAnswerContainer = document.getElementById("inquiry_answer");

    inquiryAnswerContainer.addEventListener("click", async (event) => {
        if (event.target.classList.contains("editBtn")) {
            event.preventDefault(); // 기본 이벤트 방지 (페이지 이동 방지)

            const inquiryId = event.target.closest(".data_row").getAttribute("data-id");
            try {
                const response = await fetch(`/admin/inquiry-answer?id=${inquiryId}`);

                if (response.ok) {
                    const data = await response.json();
                    console.log("서버 응답 데이터:", data);

                    // renderAnswer 함수를 DOM이 로드된 후 호출
                    renderAnswer(data.inquiry);
                } else {
                    console.error("문의 데이터를 불러오는 데 실패했습니다.");
                }
            } catch (error) {
                console.error("문의 목록을 가져오는데 에러:", error);
            }
        }
    });
});