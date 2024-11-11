package com.app.back.service.post;

import com.app.back.domain.post.Pagination;
import com.app.back.domain.post.PostDTO;
import com.app.back.domain.post.Search;
import com.app.back.enums.AdminPostStatus;
import com.app.back.enums.AdminPostType;
import com.app.back.repository.post.PostDAO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@Primary
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
public class PostServiceImpl implements PostService {
    private final PostDAO postDAO;

    @Override
    public int getTotal(String postType) {
        return postDAO.getTotal(postType);
    }
    public int getPostTotal(){
        return postDAO.getPostTotal();
    }
    @Override
    public int getTotalWithSearch(Search search) {
        return postDAO.getTotalWithSearch(search);
    }


    @Override
    public List<PostDTO> getList(Pagination pagination, Search search) {
        // 작성일 순, 조회수 순, 댓글수 순은 일반 정렬로 처리
        if (pagination.getOrder().equals("작성일 순") || pagination.getOrder().equals("조회수 순") || pagination.getOrder().equals("댓글수 순")) {
            return postDAO.findAll(pagination, search);
        } else {
            // displayName으로 AdminPostType을 찾고, Enum 객체 자체를 필터링에 전달
            AdminPostType postTypeEnum = AdminPostType.fromDisplayName(pagination.getOrder());
            return postDAO.findFilterAll(pagination, search, postTypeEnum); // Enum 객체를 직접 전달
        }
    }

    @Override
    public List<PostDTO> getFilterList(Pagination pagination, Search search, AdminPostType filterType) {
        pagination.setOrder(filterType.name());  // Enum의 이름을 그대로 사용
        return postDAO.findFilterAll(pagination, search, filterType); // Enum 객체를 직접 전달
    }

    @Override
    public Optional<PostDTO> getPost(Long id) {
        return postDAO.findById(id);
    }

    @Override
    public void delete(Long id) {
        updateStatus(id, AdminPostStatus.DELETED);
    }
    @Override
    public int getTotalWithFilter(Search search, AdminPostType filterType) {
        return postDAO.getTotalWithFilter(search, filterType.name()); // Enum 이름을 직접 사용
    }
    @Override
    public void updateStatus(Long id, AdminPostStatus postStatus) {
        postDAO.updateStatus(id, postStatus);
    }

}
