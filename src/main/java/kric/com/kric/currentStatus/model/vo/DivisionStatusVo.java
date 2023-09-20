package kric.com.kric.currentStatus.model.vo;

import lombok.*;

@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
@Data
public class DivisionStatusVo {

    @NonNull
    private String name;
    private String header;
    private String contactStat;
    private String statCount;
}
