package com.app.back.service.volunteer;

import com.app.back.domain.volunteer.Pagination;
import com.app.back.domain.volunteer.VolunteerDTO;


import java.util.List;
public interface VolunteerService {


    //    봉사모집 작성
    void write(VolunteerDTO volunteerDTO);

    //    봉사모집 목록
    public List<VolunteerDTO> getList(Pagination pagination);

    public int getTotal();


    // 최신순 정렬 조회
    @Override
    public List<VolunteerDTO> getListByRecent(Pagination pagination) {
        pagination.setOrder("recent");
        return volunteerMapper.selectAll(pagination);
    }

    // 마감 임박순 정렬 조회
    @Override
    public List<VolunteerDTO> getListByEndingSoon(Pagination pagination) {
        pagination.setOrder("endingSoon");
        return volunteerMapper.selectAll(pagination);
    }

    // 조회수 순 정렬 조회
    @Override
    public List<VolunteerDTO> getListByViewCount(Pagination pagination) {
        pagination.setOrder("viewCount");
        return volunteerMapper.selectAll(pagination);
    }
}


