package com.app.back.service.review;

import com.app.back.domain.post.Pagination;
import com.app.back.domain.review.ReviewDTO;
import com.app.back.domain.review.ReviewVO;
import org.springframework.scheduling.annotation.Async;

import java.util.List;
import java.util.Optional;

public interface ReviewService {
    @Async
    public void write(ReviewDTO reviewDTO);
    public Optional<ReviewDTO> getById(Long id);
    public List<ReviewDTO> getList(Pagination pagination);
    public int getTotal();
    public void update(ReviewDTO reviewDTO);
    public void delete(Long id);
}
