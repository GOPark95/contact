package kric.com.kric.common;

import kric.com.kric.common.vo.PageInfo;

public class Pagenation {


    public static PageInfo getPageInfo(int currentPage, int listCount) {
        PageInfo pi = null;

        int pageLimit = 10;		// 페이징 갯수
        int maxPage;			// 끝 페이지 번호
        int startPage;			// 페이징의 첫 번째 페이지
        int endPage;			// 페이징의 마지막 페이지
        int boardLimit = 15;     // 한 페이지에 10개씩 보여주겠다.

        maxPage = (int)((double)listCount / boardLimit + 1); // 120개/10+0.9 : 12 페이지
        startPage = ((int)((double)currentPage / pageLimit + 1) - 1) * pageLimit + 1;
        endPage = startPage + pageLimit - 1;

        if(maxPage < endPage) {
            endPage = maxPage;
        }

        pi = new PageInfo(currentPage, listCount, pageLimit, maxPage, startPage, endPage, boardLimit);

        return pi;

    }

}