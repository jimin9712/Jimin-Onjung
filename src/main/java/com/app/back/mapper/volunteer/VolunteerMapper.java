package com.app.back.mapper.volunteer;

import com.app.back.domain.review.ReviewDTO;
import com.app.back.domain.volunteer.Pagination;
import com.app.back.domain.volunteer.VolunteerDTO;
import com.app.back.domain.volunteer.VolunteerVO;
import com.app.back.domain.vt_application.VtApplicationDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Optional;

@Mapper
public interface VolunteerMapper {

    // 봉사활동 게시글 작성
    public void insert(VolunteerVO volunteerVO);

    // 봉사활동 게시글 전체 조회
    public List<VolunteerDTO> selectAll(@Param("pagination") Pagination pagination);

    // 전체 개수
    public int selectCount();

    //  봉사활동 게시글 조회
    public Optional<VolunteerDTO> selectById(@Param("id") Long id);

    //  봉사활동 게시글 수정
    public void update(ReviewDTO reviewDTO);

    //  봉사활동 게시글 삭제
    public void deleteById(Long id);

    // 봉사활동 지원자 증가
    public void updateNowRecruitment(@Param("id") int id);

    //    조회수 증가
    public void updatePostReadCount(Long id);







}
