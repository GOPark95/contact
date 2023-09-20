package kric.com.kric.listManage.model.vo;

import lombok.*;

@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
@Data
public class CurrentListDataVo {
    @NonNull
    private String list_id;
    @NonNull
    private String list_data;
    @NonNull
    private String list_type;

    private String list_header;
    private int list_order;
    private int prj_code;
    private String contact_stat;

}
