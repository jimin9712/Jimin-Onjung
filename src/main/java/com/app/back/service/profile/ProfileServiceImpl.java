package com.app.back.service.profile;

import com.app.back.domain.profile.ProfileDTO;
import com.app.back.domain.profile.ProfileVO;
import com.app.back.repository.profile.ProfileDAO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService {

    private final ProfileDAO profileDAO;


    @Override
    public void save(ProfileVO profileVO) {
        profileDAO.insert(profileVO);
    }

    @Override
    public ProfileVO selectById(Long id) {
        return profileDAO.selectById(id);
    }

    @Override
    public List<ProfileVO> selectAll() {
        return profileDAO.selectAll();
    }

    @Override
    public void update(ProfileVO profileVO) {
        profileDAO.update(profileVO);
    }

    @Override
    public void deleteById(Long id) {
        profileDAO.deleteById(id);
    }
}
