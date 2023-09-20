package kric.com.kric.contact.model.vo;

import lombok.*;

@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
@Data
public class KonCodeVo {
    private String code;
    @NonNull
    private String prj_code;

}
