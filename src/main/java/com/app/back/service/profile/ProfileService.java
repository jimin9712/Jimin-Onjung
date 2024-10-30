package com.app.back.service.profile;

import com.app.back.domain.profile.ProfileDTO;
import com.app.back.domain.profile.ProfileVO;

import java.util.List;

public interface ProfileService {

    public void save(ProfileVO profileVO);
    public ProfileVO selectById(Long id);
    public List<ProfileVO> selectAll();
    public void update(ProfileVO profileVO);
    public void deleteById(Long id);

}
