package com.app.back.service.donation;

import com.app.back.domain.donation.DonationDTO;
import com.app.back.domain.post.Pagination;
import com.app.back.domain.post.PostVO;
import com.app.back.mapper.donation.DonationMapper;
import com.app.back.mapper.post.PostMapper;
import com.app.back.repository.donation.DonationDAO;
import com.app.back.repository.post.PostDAO;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service // 이 클래스가 서비스임을 나타냄
@Primary // 우선 순위가 높은 서비스
@RequiredArgsConstructor // 생성자 자동 생성
@Transactional(rollbackFor = Exception.class) // 예외 발생 시 롤백 처리
public class DonationServiceImpl implements DonationService {
    private final PostMapper postMapper;
    private final DonationMapper donationMapper;
    private final DonationDAO donationDAO;
    private final PostDAO postDAO; // 게시글 DAO

    @Override
    public void write(DonationDTO donationDTO) {
        Long id = postMapper.selectCurrentId();
        donationDTO.setId(id);
        PostVO postVO = donationDTO.toPostVO();
        postMapper.insert(postVO);
        donationMapper.insert(donationDTO.toVO());
    }

    @Override
    public Optional<DonationDTO> getById(Long id) {
        return donationDAO.findById(id);
    }

    @Override
    public List<DonationDTO> getList(Pagination pagination) {
        return donationDAO.findAll(pagination);
    }

    @Override
    public int getTotal() {
        return donationDAO.findCount();
    }

    @Override
    public void update(DonationDTO donationDTO) {
        donationDAO.update(donationDTO);
    }

    @Override
    public void delete(Long id) {
        donationDAO.delete(id);
    }
}
