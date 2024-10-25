package com.app.back.mapper.volunteer;

import com.app.back.domain.member.MemberVO;
import com.app.back.domain.post.PostVO;
import com.app.back.domain.volunteer.Pagination;
import com.app.back.domain.volunteer.VolunteerDTO;
import com.app.back.domain.volunteer.VolunteerVO;
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

//    // 봉사활동 게시글 조회수 순 조회
//    public List<VolunteerDTO> selectByViewCount(@Param("pagination") Pagination pagination);
//
//    // 봉사활동 게시글  마감 임박 순 조회
//    public List<VolunteerDTO> selectByDeadline(@Param("pagination") Pagination pagination);

    // 전체 개수
    public int selectTotal();

    // 봉사활동 지원자 증가
    public void updateNowRecruitment(Long id);






}
