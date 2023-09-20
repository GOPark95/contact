package kric.com.kric.currentStatus.model.vo;

import lombok.*;

@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
@Data
public class MyunStatusVo {

    private String code;
    @NonNull
    private String name;
    private String statCount;
}
