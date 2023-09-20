package kric.com.kric.cms.model.vo;

import lombok.*;

@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
@Data
public class CMSInfoVo {
    @NonNull
    private String code;
    private String name;
    private String sender;
    private String content;
}
