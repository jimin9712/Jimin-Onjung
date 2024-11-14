<select id="selectFilterAll" resultType="inquiryDTO">
    select
    i.id,
    p.post_title,
    p.post_content,
    p.created_date,
    p.updated_date,
    m.member_nickname,
    i.inquiry_email,
    i.inquiry_type,
    i.inquiry_status
    from tbl_inquiry i
    join tbl_post p on i.id = p.id
    join tbl_member m on p.member_id = m.id
    <include refid="search"/>
    where p.post_status = 'VISIBLE'
    and i.inquiry_type = #{filterType}  <!-- filterType을 항상 적용 -->
    order by
    <choose>
        <when test="pagination.order == '최신순'">p.created_date</when>
        <otherwise>i.inquiry_type</otherwise>
    </choose>
    desc
    limit #{pagination.startRow}, #{pagination.rowCount};
</select>
