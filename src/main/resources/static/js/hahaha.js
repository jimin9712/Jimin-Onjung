
// 다음 페이지 링크가 있을 경우 추가
if (pagination.next) {
    paginationHTML += `<li class="pagination-next">
            <a href="#" data-page="${pagination.endPage + 1}" class="pagination-next-link">›</a></li>`;
}