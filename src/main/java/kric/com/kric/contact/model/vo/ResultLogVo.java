package kric.com.kric.contact.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ResultLogVo {

    private String name;
    private String resultCode;
    private String content;
    private String result_date;
}
