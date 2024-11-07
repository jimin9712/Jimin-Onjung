package com.app.back.repository.post;

import com.app.back.domain.post.Pagination;
import com.app.back.domain.post.PostDTO;
import com.app.back.domain.post.PostVO;
import com.app.back.domain.post.Search;
import com.app.back.mapper.post.PostMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class PostDAO {
    private final PostMapper postMapper;

    public void save(PostVO postVO) {
        postMapper.insert(postVO);
    };

    public int getTotal(String postType) {
        return postMapper.getTotal(postType);
    };

    public int getPostTotal() {
        return postMapper.selectTotal();
    }

    //    검색 결과 개수 조회
    public int getTotalWithSearch(Search search){
        return postMapper.selectTotalWithSearch(search);
    }

    public Long selectCurrentId() { return postMapper.selectCurrentId(); };

//    public PostVO findById(Long id) {
//        return postMapper.selectById(id);
//    }

    public void update(PostVO postVO) {
        postMapper.updateById(postVO);
    }

    public void delete(Long id) {postMapper.deleteById(id);}

    public void increaseViewCount(Long id){postMapper.increaseViewCountById(id);}

    //    게시글 전체 조회
    public List<PostDTO> findAll(Pagination pagination, Search search){
        return postMapper.selectAll(pagination, search);
    }
    //    필터된 게시글 전체 조회
    public List<PostDTO> findFilterAll(Pagination pagination, Search search, String filterType){
        return postMapper.selectFilterAll(pagination, search,filterType);
    }
    //    게시글 조회
    public Optional<PostDTO> findById(Long id){
        return postMapper.selectById(id);
    }

    public int getTotalWithFilter(Search search, String filterType) {
        return postMapper.selectTotalWithFilter(search, filterType);
    }
}
