package kric.com.kric.contact.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ContactModifyVo {

    private String list_type;
    private String before_data;
    private String after_data;
    private int list_order;
    private String modify_date;
}
