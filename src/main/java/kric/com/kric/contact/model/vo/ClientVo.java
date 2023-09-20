package kric.com.kric.contact.model.vo;

import lombok.*;

@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
@Data
public class ClientVo {
    @NonNull
    private String client_id;
    private String internal_no;
    private String external_no;
}
