package kric.com.kric.contact.model.vo;

import lombok.*;

@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
@Data
public class DivisionCodeVo {
    @NonNull
    private String dorder;
    @NonNull
    private String dcode;
    @NonNull
    private String dname;
    @NonNull
    private String dheader;
    private int prj_code;
}
