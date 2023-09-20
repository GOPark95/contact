package kric.com.kric.contact.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class CallLogVo {

    private String name;
    private String callNumber;
    private String callTime;
    private String call_date;
}
