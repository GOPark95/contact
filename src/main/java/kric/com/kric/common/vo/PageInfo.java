package kric.com.kric.common.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PageInfo {
    private int currentPage;	// 현재 페이지
    private int listCount;		// 행(게시글, 사원목록 등) 총 개수
    private int pageLimit;		// 한 페이지에서 보여줄 제한된 개수
    private int maxPage;		// 끝 페이지 번호
    private int startPage;		// 1~10, 1~5, 11~20, 6~ 페이징의 첫 번째 페이지
    private int endPage;		// 페이징의 마지막 페이지
    private int boardLimit;		// 페이징 갯수
}
