package kric.com.kric.contact.model.vo;

import lombok.*;

@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
@Data
public class ContactListVo {
    @NonNull
    private String id;
    private String kikoan_name;
    private String chasu;
    private String contac_area;
    private String contac_tel_cnt;
    private String project_type;
    private String project_end_yn;
}
