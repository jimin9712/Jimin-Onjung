// 봉사 지원 모집 게시글 가져오기
const fetchVolunteers = async (order = "recent") => {
    try {
        const response = await fetch(`/volunteer/volunteer-info?order=${order}`);
        console.log("응답 상태:", response.status);
        if (!response.ok) throw new Error("서버로부터 데이터를 가져오는데 실패했습니다.");

        const data = await response.json();
        console.log("봉사 모집 데이터:", data); // 데이터를 확인하여 daysLeft가 포함되어 있는지 확인
        renderVolunteers(data); // 데이터를 화면에 렌더링하는 함수 호출
    } catch (error) {
        console.error("Error fetching filtered volunteer lists:", error);
        alert("봉사 모집 게시글을 불러오는데 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    }
};

// 정렬 기준을 설정하고 fetchVolunteers를 호출하는 함수
function setOrder(order) {
    fetchVolunteers(order); // 정렬 기준에 따라 봉사 모집 데이터를 가져옵니다.
}

// 페이지네이션을 렌더링하는 함수
const renderPagination = (pagination, keyword, filterType) => {
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
            fetchFilteredInquiries(page, keyword, filterType);
        });
    });
};

// 초기 데이터 로드
document.addEventListener("DOMContentLoaded", () => {
    fetchVolunteers(); // 첫 페이지의 데이터를 로드합니다.
});

