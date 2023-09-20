package kric.com.kric.listManage.model.vo;

import lombok.*;

@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
@Data
public class CurrentListTypeVo {
    @NonNull
    private String header;
    @NonNull
    private String type;

    private String division_status;
    private int order;
    private int prj_code;
}
