package com.app.back.service.post;

import com.app.back.domain.post.Pagination;
import com.app.back.domain.post.PostDTO;
import com.app.back.domain.post.Search;
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
        return postDAO.findAll(pagination, search);
    }

    @Override
    public List<PostDTO> getFilterList(Pagination pagination, Search search, String filterType) {
        pagination.setOrder(filterType); // 필터 타입 설정
        return postDAO.findFilterAll(pagination, search, filterType);
    }

    @Override
    public Optional<PostDTO> getPost(Long id) {
        return postDAO.findById(id);
    }

    @Override
    public void delete(Long id) {
        postDAO.delete(id);
    }
    @Override
    public int getTotalWithFilter(Search search, String filterType) {
        return postDAO.getTotalWithFilter(search, filterType);
    }
}
