package com.app.back.mapper.profile;

import com.app.back.domain.donation_record.DonationRecordDTO;
import com.app.back.domain.profile.ProfileDTO;
import com.app.back.domain.profile.ProfileVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ProfileMapper {
    public void insert(ProfileVO profileVO);
    public ProfileVO selectById(Long id);
    public List<ProfileVO> selectAll();
    public void update(ProfileVO profileVO);
    public void deleteById(Long id);

}
