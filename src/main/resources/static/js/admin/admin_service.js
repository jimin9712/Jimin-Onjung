const searchInput = document.querySelector(".Filter_searchInput");
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
                    }
                } catch (error) {
                }
            } else {
            }
        }
    });
});
// ======================================================================================================== 답변제출
const handleAnswerSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;
    const inquiryId = form.querySelector('input[name="request-title"]').getAttribute("data-id");
    const answerContent = form.querySelector('textarea[name="answer-content"]').value;
    const payload = {
        inquiryId: inquiryId,
        inquiryAnswer: answerContent,
    };
    try {
        const response = await fetch('/admin/inquiry-answer', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log("서버 응답 상태:", response.ok); // 응답 상태 확인
        if (response.ok) {
            alert("답변이 제출되었습니다.");
            fetchInquiries();

            sections.forEach((section) => {
                section.classList.remove("selected");
            });
            const inquiryListSection = Array.from(sections).find(
                (section) => section.dataset.value === "고객센터 문의 목록"
            );
            if (inquiryListSection) {
                inquiryListSection.classList.add("selected");
            } else {
            }
        } else {
            const errorText = await response.text();
        }
    } catch (error) {
    }
};

// ========================================================================== 여기서부터 공지사항
// 공지사항 데이터를 가져오는 함수
const fetchNotices = async (page = 1, keyword = '') => {
    try {
        const response = await fetch(`/admin/notice-list?page=${page}&query=${keyword}`);
        const data = await response.json();
        renderNotice(data.notis); // 공지사항 목록 렌더링
        renderNoticePagination(data.pagination, keyword); // 페이지네이션 렌더링
    } catch (error) {
        console.error("공지사항 데이터를 불러오는 중 오류 발생:", error);
    }
};
// 공지사항 목록 초기 로드
fetchNotices(); // 초기 공지사항 데이터 로드

// 공지사항 링크 클릭 시 공지사항 조회 섹션으로 이동하고 세부 내용 로드
document.querySelector(".notification-wrap").addEventListener("click", async (event) => {
    if (event.target.closest(".notification")) { // 공지사항 아이템 클릭 시
        sections.forEach((section) => section.classList.remove("selected")); // 모든 섹션 선택 해제

        const notificationInquirySection = Array.from(sections).find(
            (section) => section.dataset.value === "공지사항 조회"
        );

        if (notificationInquirySection) {
            notificationInquirySection.classList.add("selected"); // 공지사항 조회 섹션에 selected 추가
            const noticeId = event.target.closest(".notification").getAttribute("data-id"); // 공지사항 ID 가져오기

            try {
                const response = await fetch(`/admin/notice-detail?id=${noticeId}`);
                if (response.ok) {
                    const data = await response.json();
                    renderNoticeDetail(data.notice); // 공지사항 세부내용 렌더링
                } else {
                    console.error("공지사항 데이터를 불러오는 데 실패했습니다.");
                }
            } catch (error) {
                console.error("공지사항 데이터 로드 중 오류 발생:", error);
            }
        } else {
            console.error("공지사항 조회 섹션을 찾을 수 없습니다.");
        }
    }
});
