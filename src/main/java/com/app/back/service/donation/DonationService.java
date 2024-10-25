package com.app.back.service.donation;

import com.app.back.domain.donation.DonationDTO;
import com.app.back.domain.donation.DonationVO;
import com.app.back.domain.post.Pagination;
import com.app.back.domain.review.ReviewDTO;

import java.util.List;
import java.util.Optional;

public interface DonationService {
    public void write(DonationDTO donationDTO);
    public Optional<DonationDTO> getById(Long id);
    public List<ReviewDTO> getList(Pagination pagination);
    public int getTotal();
    public void update(ReviewDTO reviewDTO);
    public void delete(Long id);
}
