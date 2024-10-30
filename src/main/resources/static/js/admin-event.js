// 문의 목록을 렌더링하는 함수
const renderInquiries = (inquiries) => {
    const inquiryContainer = document.querySelector(".inquiryTable_container");
    let content = '';

    if (inquiries.length === 0) {
        content = `<p class="empty-component">문의 내역이 없습니다.</p>`;
    } else {
        inquiries.forEach((inquiry) => {
            content += `
                <div class="inquiryTable_row data_row">
                    <div class="inquiryTable_cell"><input type="checkbox" class="inquiryCheckbox" /></div>
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
    }
    inquiryContainer.innerHTML = content;
};

// 페이지네이션을 렌더링하는 함수
const renderPagination = (pagination) => {
    const paginationContainer = document.querySelector(".pagination-list.inquiry-page");
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
            fetchFilteredInquiries(page);
        });
    });
};

// 문의 목록 데이터를 가져오는 함수
const fetchFilteredInquiries = async (page = 1, keyword = '') => {
    try {
        const response = await fetch(`/admin/inquiry-page?page=${page}&query=${keyword}`);
        console.log("응답 상태 코드:", response.status);  // 응답 상태 코드 확인
        console.log("응답 상태 텍스트:", response.statusText);  // 응답 상태 텍스트 확인

        const data = await response.json();
        renderInquiries(data.inquiries);
        renderPagination(data.pagination);
    } catch (error) {
        console.error("Error fetching inquiries:", error);
    }
};

// 후기 내역 가져오기
const fetchInquiries = async () => {
    try {
        const response = await fetch(`/admin/inquiry-page/`);
        console.log("응답 상태:", response.status);
        if (!response.ok) throw new Error("서버로부터 데이터를 가져오는 데 실패했습니다.");

        const data = await response.json();
        console.log("후기 데이터:", data);
        renderInquiries(data);
    } catch (error) {
        console.error("Error fetching review records:", error);
        alert("문의 내역을 불러오는 데 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    }
};


// 초기 데이터 로드
document.addEventListener("DOMContentLoaded", () => {
    fetchFilteredInquiries(); // 첫 페이지의 데이터를 로드합니다.
});
