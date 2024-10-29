package com.app.back.repository.post;

import com.app.back.domain.post.PostVO;
import com.app.back.mapper.post.PostMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class PostDAO {
    private final PostMapper postMapper;

    public void save(PostVO postVO) {
        postMapper.insert(postVO);
    }

    public Long selectCurrentId() { return postMapper.selectCurrentId(); };

    public PostVO findById(Long id) {
        return postMapper.selectById(id);
    }

    public void update(PostVO postVO) {
        postMapper.updateById(postVO);
    }

    public void delete(Long id) {postMapper.deleteById(id);}

    public void increaseViewCount(Long id){postMapper.increaseViewCountById(id);}
}
