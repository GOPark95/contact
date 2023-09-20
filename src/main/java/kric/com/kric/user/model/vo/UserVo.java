package kric.com.kric.user.model.vo;

import lombok.*;


@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
@Data
public class UserVo {
    /*공통*/
    private String p_no;
    @NonNull
    private String p_pass;
    @NonNull
    private String p_name;
    private String p_area;
    private String p_type;
    private String p_email;
    private String p_tel;

}
