package com.app.back.mapper;

import com.app.back.mapper.donation.DonationMapper;
import com.app.back.mapper.review.ReviewMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@Slf4j
public class DonationMapperTests {
    @Autowired
    private DonationMapper donationMapper;
}
