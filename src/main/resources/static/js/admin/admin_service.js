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
        // classList : 동적으로 클래스를 추가하고 제거하여 필터가 선택되었음을 시각적 표시. 다른 필터는 비활성화 상태로 보이게하기위함
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
// ==================================================================================================답변하기
// 답변하기 버튼을 눌렀을 때
document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section.admin-page");

    document.querySelector(".inquiryTable_container").addEventListener("click", async (event) => {
        if (event.target.classList.contains("editBtn")) {
            sections.forEach((section) => section.classList.remove("selected")); // 모든 섹션 선택 해제
            // sections은 모든 .admin-page 섹션을 담고있는 nodeList이고, Array.from을 통해서 NodeList를 배열로 변환하여 배열 메서드를 사용할 수 있게 한다.
            const inquiryAnswerSection = Array.from(sections).find(
                // dataset : JavaScript에서 HTML 요소의 데이터 속성에 접근하고 조작할 수 있도록 해주는 특수한 속성
                // 특정 정보를 HTML 요소에 저장하고 싶을 때 유용하게 사용할 수 있다.
                (section) => section.dataset.value === "고객센터 문의 답변"
            );
            if (inquiryAnswerSection) {
                inquiryAnswerSection.classList.add("selected"); // 고객센터 문의 답변 섹션에 selected 추가
                //event.target.closest : 이벤트가 발생한 요소의 가장 가까운 ex).notification 클래스를 찾으며 즉 .notification 클래스를 가진
                // 요소가 클릭된 요소와 같은 레벨이거나 상위에 있을 때 그요소를 가져오는 역할을 한다.
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
// 답변 제출을 눌렀을 때
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

// ======================================================================================= 여기서부터 공지사항
// 공지사항 데이터를 가져오는 함수
const fetchNotices = async (page = 1, keyword = '') => {
    try {
        const response = await fetch(`/admin/notice-list?page=${page}&query=${keyword}`);
        // JSON 데이터를 HTML로 렌더링
        const data = await response.json();
        renderNotice(data.notis);
        renderNoticePagination(data.pagination, keyword); // 페이지네이션 렌더링
    } catch (error) {
        console.error("공지사항 데이터를 불러오는 중 오류 발생:", error);
    }
};
// 공지사항 목록 초기 로드
fetchNotices(); // 초기 공지사항 데이터 로드
//  공지사항 검색
const fetchFilteredNotices = async (page, keyword) => {
    try {
        const response = await fetch(`/admin/notice-list?page=${page}&query=${keyword}`);
        const data = await response.json();
        renderNotice(data.notis); // 공지사항 목록 렌더링
        renderNoticePagination(data.pagination, keyword); // 페이지네이션 렌더링
    } catch (error) {
        console.error("공지사항 데이터를 불러오는 중 오류 발생:", error);
    }
};

// 공지사항 조회
document.querySelector(".notification-list-wrap").addEventListener("click", async (event) => {
    const target = event.target.closest(".notification");
    if (target) {  // 공지사항 아이템이 클릭되었을 때만 실행
        event.preventDefault(); // 페이지 이동 방지
        const noticeId = target.getAttribute("data-id"); // 공지사항 ID 가져오기

        sections.forEach((section) => section.classList.remove("selected")); // 모든 섹션 선택 해제
        // sections은 모든 .admin-page 섹션을 담고있는 nodeList이고, Array.from을 통해서 NodeList를 배열로 변환하여 배열 메서드를 사용할 수 있게 한다.
        const notificationInquirySection = Array.from(sections).find(
            (section) => section.dataset.value === "공지사항 조회"
        );

        if (notificationInquirySection) {
            notificationInquirySection.classList.add("selected"); // 공지사항 조회 섹션에 selected 추가

            try {
                const response = await fetch(`/admin/notice-detail?id=${noticeId}`);
                const data = await response.json();

                if (data.success) {
                    renderNoticeDetail(data.inquiry);  // 공지사항 세부 내용 렌더링
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error("공지사항 데이터 로드 중 오류 발생:", error);
            }
        } else {
            console.error("공지사항 조회 섹션을 찾을 수 없습니다.");
        }
    }
});
// 공지사항 상세 정보 가져오기
const fetchNoticeDetail = async (noticeId) => {
    try {
        const response = await fetch(`/admin/notice-detail?id=${noticeId}`);
        const data = await response.json();
        if (data.success) {
            renderNoticeDetail(data.inquiry); // 상세 정보 렌더링
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error("공지사항 상세 정보 불러오기 오류:", error);
    }
};

// 사이드바에 최신 공지사항 10개 가져오기
const fetchRecentNotices = async () => {
    try {
        const response = await fetch('/admin/notice-list?limit=10'); // 최신 10개 공지사항 가져오기
        const data = await response.json();
        renderSidebarNotices(data.notis); // 가져온 공지사항을 사이드바에 렌더링
    } catch (error) {
        console.error("사이드바 공지사항 불러오기 오류:", error);
    }
};

// 페이지 로드 시 최신 공지사항 10개를 사이드바에 표시
fetchRecentNotices();
//===============================게시글 목록======================================================================