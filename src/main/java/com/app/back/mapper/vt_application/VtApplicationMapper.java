package com.app.back.mapper.vt_application;

import com.app.back.domain.volunteer.VolunteerVO;
import com.app.back.domain.vt_application.VtApplicationDTO;
import com.app.back.domain.vt_application.VtApplicationVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface VtApplicationMapper {

    public void insert(VtApplicationDTO vtApplicationDTO);
    public VtApplicationDTO selectById(Long id);
    public List<VtApplicationDTO> selectAll();
    public void update(VtApplicationDTO vtApplicationDTO);
    public void deleteById(Long id);

    // 특정 게시글에 지원한 사용자 목록 조회
    public List<VtApplicationDTO> selectByVtId(@Param("vtId") Long vtId);
    // 특정 게시글에 지원한 사용자 수 조회
    public int countByVtId(@Param("vtId") Long vtId);
    // 지원자 상태 업데이트
    public void updateApplicationStatus(@Param("applicationId") Long applicationId, @Param("status") String status);
}

