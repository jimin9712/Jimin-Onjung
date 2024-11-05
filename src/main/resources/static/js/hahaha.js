@GetMapping("/admin/post-list")
@ResponseBody
public Map<String, Object> getPostList(Pagination pagination, Search search, @RequestParam(required = false) String postType) {
    pagination.setOrder("created_date desc"); // 기본 정렬 기준 설정
    // 총 게시글 수 설정
    if (search.getKeyword() != null) {
        pagination.setTotal(postService.getTotalWithSearch(search)); // 검색어가 있는 경우
    } else {
        pagination.setTotal(postService.getTotal()); // 검색어가 없는 경우 특정 postType으로 총 개수 조회
    }
    pagination.progress(); // 페이지네이션 계산

    // 게시글 목록 조회
    List<PostDTO> posts = postService.getList(pagination, search);

    // 결과를 Map에 담아 반환
    Map<String, Object> result = new HashMap<>();
    result.put("posts", posts);
    result.put("pagination", pagination);
    return result;
}
