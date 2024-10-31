package com.app.back.mapper.volunteer;

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
    public int selectTotal();

    //  봉사활동 게시글 조회
    public Optional<VolunteerDTO> selectById(@Param("id") Long id);

    //    봉사활동 게시글 수정
    @Mapper
//public interface PostMapper {
//    void updatePost(VtApplicationDTO vtApplicationDTO);
//    void updateVt(VtApplicationDTO vtApplicationDTO);
//    void updateAttachment(VtApplicationDTO vtApplicationDTO);
//
//    VtApplicationDTO selectPostById(Long id);
//    VtApplicationDTO selectVtById(Long id);
//    VtApplicationDTO selectAttachmentByPostId(Long postId);
//}

    // 봉사활동 지원자 증가
    public void updateNowRecruitment(@Param("id") int id);


    // 봉사활동 게시글 최신순 조회
    public List<VolunteerDTO> selectByRecent(@Param("pagination") Pagination pagination);

    // 봉사활동 게시글 조회수 순 조회
    public List<VolunteerDTO> selectByViewCount(@Param("pagination") Pagination pagination);

    // 봉사활동 게시글 마감 순 조회
    public List<VolunteerDTO> selectByEndingSoon(@Param("pagination") Pagination pagination);






}
