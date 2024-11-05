package com.app.back.service.support;

import com.app.back.domain.review.ReviewDTO;

import java.util.List;

public interface SupportService {

    public List<ReviewDTO> getLatest10Reviews();

}
