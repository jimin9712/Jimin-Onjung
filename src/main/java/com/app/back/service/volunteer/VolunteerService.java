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
    
    // 마감순 정렬
    public List<VolunteerDTO> getListByEndingSoon(Pagination pagination);
    
    // 기본 정렬
    public List<VolunteerDTO> getListByRecent(Pagination pagination);

    // 조회수 순 정렬 조회
    List<VolunteerDTO> getListByViewCount(Pagination pagination);
}


