package kric.com.kric.contact.model.vo;

import lombok.*;

@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
@Data
public class ResultCodeVo {
    @NonNull
    private String rcode;
    @NonNull
    private String rname;
    private int prj_code;


}
