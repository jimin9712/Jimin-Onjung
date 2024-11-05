package com.app.back.mapper.support;

import com.app.back.domain.review.ReviewDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface SupportMapper {

    public List<ReviewDTO> selectTop10Supports();

}

