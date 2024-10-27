package com.app.back.repository.donation;

import com.app.back.domain.donation.DonationDTO;
import com.app.back.domain.donation.DonationVO;
import com.app.back.domain.post.Pagination;
import com.app.back.mapper.donation.DonationMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class DonationDAO {
    private final DonationMapper donationMapper;
    private final DonationDTO donationDTO;

    public void save(DonationVO donationVO) {donationMapper.insert(donationVO);}

    public Optional<DonationDTO> findById(Long id) {return donationMapper.selectById(id);}
    //    전체 조회
    public List<DonationDTO> findAll(Pagination pagination) {
        return donationMapper.selectAll(pagination);
    }
    //    전체 개수
    public int findCount(){
        return donationMapper.selectCount();
    }

    // ID로 프로젝트 포스트 수정
    public void update(DonationDTO donationDTO) {
        donationMapper.update(donationDTO);
    }

    // ID로 프로젝트 포스트 삭제
    public void delete(Long id) {
        donationMapper.deleteById(id);
    }
}
