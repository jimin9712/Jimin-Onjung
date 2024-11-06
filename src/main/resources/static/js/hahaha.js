// 필터링된 문의 데이터를 가져오는 함수
const fetchFilteredInquiries = async (page = 1, keyword = inquiryKeyword, filterType = inquiryFilterType) => {
    try {
        const response = await fetch(`/admin/inquiry-page?page=${page}&query=${keyword}&filterType=${filterType}`);
        const data = await response.json();

        renderInquiries(data.inquiries);
        renderPagination(data.pagination,keyword,filterType);
    } catch (error) {
        // 오류 처리
    }
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
        console.error("데이터 가져오는 중 오류 발생:", error);
    }
};

// 초기 데이터 로드
fetchInquiries(); // 첫 페이지의 데이터를 로드합니다.
// =================================================================================
const inquirySearchInput = document.querySelector(".Filter_searchInput");
const inquiryFilters = document.querySelectorAll(".sort-filter-option.inquiry-list");

// 전역 변수로 현재 검색어와 필터를 저장
let inquiryKeyword = '';
let inquiryFilterType = '최신순';

// 고객센터 검색어 입력
inquirySearchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();  // 폼 제출 방지
        inquiryKeyword = inquirySearchInput.value.trim();  // 검색어를 전역 변수에 저장
        fetchFilteredInquiries(1, inquiryKeyword, inquiryFilterType);  // 검색어로 데이터 불러오기
    }
});

// 고객센터 필터 버튼 클릭 시 필터에 맞는 데이터 불러오기
inquiryFilters.forEach((option) => {
    option.addEventListener("click", () => {
        // classList : 동적으로 클래스를 추가하고 제거하여 필터가 선택되었음을 시각적 표시. 다른 필터는 비활성화 상태로 보이게하기위함
        inquiryFilters.forEach((opt) => opt.classList.remove("selected")); // 모든 필터 초기화
        option.classList.add("selected"); // 선택된 필터만 활성화

        inquiryFilterType = option.textContent.trim();
        fetchFilteredInquiries(1, inquiryKeyword, inquiryFilterType); // 필터 조건으로 데이터 불러오기
    });
});

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