package kric.com.kric.cms.model.vo;

import lombok.*;

@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
@Data
public class CMSFileVo {
    @NonNull
    private String code;
    private String name;
}
