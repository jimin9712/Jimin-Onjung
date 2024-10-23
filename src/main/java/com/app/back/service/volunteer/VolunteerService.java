package com.app.back.service.volunteer;

import com.app.back.domain.volunteer.Pagination;
import com.app.back.domain.volunteer.VolunteerDTO;
import com.app.back.domain.volunteer.VolunteerVO;

import java.util.List;

public interface VolunteerService {
    public void write(VolunteerVO volunteerVO);
//    public List<VolunteerDTO> getList(Pagination pagination);
}
