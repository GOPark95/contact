package kric.com.kric.contact.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class SendEmailLogVo {

    private String name;
    private String sender;
    private String receiver;
    private String send_date;
}
