package com.app.back.repository.volunteer;


import com.app.back.domain.volunteer.VolunteerVO;
import com.app.back.mapper.volunteer.VolunteerMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class VolunteerDAO {
    private final VolunteerMapper volunteerMapper;

//    봉사활동구인 저장
    public void save(VolunteerVO volunteerVO) {volunteerMapper.insert(volunteerVO);}
}
