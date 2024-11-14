@GetMapping("/admin/post-list")
@ResponseBody
public AdminDTO getPostList(Pagination pagination, Search search, @RequestParam(required = false) String query, @RequestParam(required = false) String filterType) {
    search.setKeyword(query);
    int total;
    log.info("받은 필터 타입: {}", filterType); // 필터 타입 확인 로그
    // 필터 타입이 null이거나 기본 "작성일 순"일 경우
    if (filterType == null || filterType.equals("작성일 순")) {
        pagination.setOrder("작성일 순"); // 기본 정렬 순서를 설정
        total = postService.getTotalWithSearch(search); // 검색된 게시글의 총 개수 조회
    }
    // 조회수 순 또는 댓글수 순일 경우
    else if (filterType.equals("조회수 순") || filterType.equals("댓글수 순")) {
        pagination.setOrder(filterType); // 조회수 또는 댓글수를 기준으로 정렬 설정
        total = postService.getTotalWithSearch(search); // 검색된 게시글의 총 개수 조회
    }
    // 게시글 유형으로 필터링할 경우
    else {
        AdminPostType postTypeEnum = AdminPostType.fromDisplayName(filterType);
        total = postService.getTotalWithFilter(search, postTypeEnum); // 필터된 게시글의 총 개수 조회
    }

    // 총 개수를 페이지네이션에 설정하고 페이지 계산을 진행
    pagination.setTotal(total);
    pagination.progress();

    List<PostDTO> posts;

    // 설정된 정렬 조건에 따라 게시글 목록 조회
    if (pagination.getOrder() != null && (pagination.getOrder().equals("작성일 순") || pagination.getOrder().equals("조회수 순") || pagination.getOrder().equals("댓글수 순"))) {
        posts = postService.getList(pagination, search); // 기본 또는 조회수, 댓글수 순으로 게시글 목록 조회
    } else {
        AdminPostType postTypeEnum = AdminPostType.fromDisplayName(filterType);
        posts = postService.getFilterList(pagination, search, postTypeEnum);
    }

    // 결과 데이터를 AdminDTO에 설정하여 반환
    AdminDTO result = new AdminDTO();
    result.setPosts(posts);
    result.setPagination(pagination);

    return result;
}