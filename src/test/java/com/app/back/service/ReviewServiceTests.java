package com.app.back.service;

import com.app.back.domain.review.ReviewDTO;
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

    @Test
    public void testWrite() {
        ReviewDTO reviewDTO = new ReviewDTO();
        reviewDTO.setPostTitle("dsfsdf3");
        reviewDTO.setPostContent("s3dsfsd");
        reviewDTO.setMemberId(1L);
        reviewDTO.setPostType("REVIEW");
        reviewDTO.setVtGroupName("group");
        reviewDTO.setReviewStarRate(5.00);
//        reviewService.write(reviewDTO);
    }

    @Test
    public void testDelete() {
        reviewService.delete(3L);
    }
}
