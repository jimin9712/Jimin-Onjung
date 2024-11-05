package com.app.back.repository.support;

import com.app.back.domain.review.ReviewDTO;
import com.app.back.mapper.support.SupportMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class SupportDAO {
    private final SupportMapper supportMapper;

    public List<ReviewDTO> findTop10() {
        return supportMapper.selectTop10Supports();
    }
}
