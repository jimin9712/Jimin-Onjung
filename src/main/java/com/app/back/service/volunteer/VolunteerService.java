package com.app.back.service.volunteer;

import com.app.back.domain.volunteer.Pagination;
import com.app.back.domain.volunteer.VolunteerDTO;
import com.app.back.domain.volunteer.VolunteerVO;

import java.util.List;

public interface VolunteerService {

//    봉사모집 작성
    void write(VolunteerDTO volunteerDTO);

//    봉사모집 목록
//    public List<VolunteerDTO> getList(Pagination pagination);
}
