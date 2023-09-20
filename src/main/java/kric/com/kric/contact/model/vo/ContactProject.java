package kric.com.kric.contact.model.vo;

import lombok.*;

@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
@Data
public class ContactProject {
    private String code;
    @NonNull
    private String name;
    @NonNull
    private String intranet_code;
    private String intranet_name;
    private String kon_code;
    private String kon_name;

}
