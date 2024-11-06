package com.app.back.domain.support;

import lombok.*;
import org.springframework.stereotype.Component;

@Component
@Getter
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@AllArgsConstructor
public class SupportVO {
    private Long id;
    private int goal_point;
    private String support_s_date;
    private String support_e_date;

}
