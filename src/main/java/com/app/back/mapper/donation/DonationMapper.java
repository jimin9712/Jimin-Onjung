package com.app.back.mapper.donation;

import com.app.back.domain.donation.DonationDTO;
import com.app.back.domain.donation.DonationVO;
import com.app.back.domain.post.Pagination;
import com.app.back.domain.review.ReviewDTO;
import com.app.back.domain.review.ReviewVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Optional;

@Mapper
public interface DonationMapper {
    // 추가
    public void insert(DonationVO donationVO);
    // 조회
    public Optional<DonationDTO> selectById(Long id);
    // 전체 조회
    public List<DonationDTO> selectAll(Pagination pagination);
    // 전체 개수
    public int selectCount();
    // 수정
    public void update(DonationDTO donationDTO);
    // 삭제
    void deleteById(Long id);
}
