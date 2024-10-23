package com.app.back.service.volunteer;

import com.app.back.domain.volunteer.VolunteerVO;
import com.app.back.repository.volunteer.VolunteerDAO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class VolunteerServiceImpl implements VolunteerService {
    private final VolunteerDAO volunteerDAO;

    @Override
    public void write (VolunteerVO volunteerVO) {
        volunteerDAO.save(volunteerVO);
    }
}
