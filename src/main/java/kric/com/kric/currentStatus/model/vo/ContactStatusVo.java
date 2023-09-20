package kric.com.kric.currentStatus.model.vo;

import com.sun.istack.internal.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
@Data
public class ContactStatusVo {

    @NotNull
    private String list_id;
    private String list_info;
    private String contact_result;
    private String contact_name;
    private String contact_time;
    private String contact_content;
    private String contact_cnt;
}
