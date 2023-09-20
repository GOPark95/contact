package kric.com.kric.contact.model.vo;


import lombok.*;

@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
@Data
public class IntranetProjectListVo {

    @NonNull
    private String p_child_sn;
    private String p_subject;
    private String p_method_nm;
}
