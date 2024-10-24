package com.app.back.service;

import com.app.back.domain.review.ReviewDTO;
import com.app.back.mapper.post.PostMapper;
import com.app.back.service.review.ReviewService;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@Slf4j
public class ReviewServiceTests {
    @Autowired
    private ReviewService reviewService;
    @Autowired
    private PostMapper postMapper;

    @Test
    public void testWrite() {
        ReviewDTO reviewDTO = new ReviewDTO();
        reviewDTO.setId(1L);
    }
}
