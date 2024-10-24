package com.app.back.repository.notice;

import com.app.back.domain.post.Pagination;
import com.app.back.domain.review.ReviewDTO;
import com.app.back.domain.review.ReviewVO;
import com.app.back.mapper.review.ReviewMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class NoticeDAO {
//    private final ReviewMapper reviewMapper;
//
//    public void save(ReviewVO reviewVO) {reviewMapper.insert(reviewVO);}
//
//    public Optional<ReviewVO> findById(long id) {return reviewMapper.selectById(id);}
//    //    전체 조회
//    public List<ReviewDTO> findAll(Pagination pagination) {
//        return reviewMapper.selectAll(pagination);
//    }
//    //    전체 개수
//    public int findCount(){
//        return reviewMapper.selectCount();
//    }
//
//    // ID로 프로젝트 포스트 수정
//    public void update(ReviewDTO qaPostDTO) {
//        reviewMapper.update(qaPostDTO);
//    }
//
//    // ID로 프로젝트 포스트 삭제
//    public void delete(Long id) {
//        reviewMapper.deleteById(id);
//    }
}
