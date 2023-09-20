package kric.com.kric.currentStatus.model.vo;

import lombok.*;

@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
@Data
public class ResultStatusVo {

    @NonNull
    private String code;
    private String name;
    private String statCount;
}
