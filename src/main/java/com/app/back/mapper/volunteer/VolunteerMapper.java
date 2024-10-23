package com.app.back.mapper.volunteer;

import com.app.back.domain.volunteer.Pagination;
import com.app.back.domain.volunteer.VolunteerDTO;
import com.app.back.domain.volunteer.VolunteerVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface VolunteerMapper {

    // 봉사활동 게시글 작성
    public void insert(VolunteerVO volunteerVO);

    // 봉사활동 게시글 전체 조회
//    public List<VolunteerDTO> selectAll(@Param("pagination") Pagination pagination);

}
