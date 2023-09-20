package kric.com.kric.common.Interceptor;

import kric.com.kric.user.model.vo.UserVo;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.PrintWriter;

public class LogoutInterceptor extends HandlerInterceptorAdapter {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {

        HttpSession session = request.getSession();
        String ajaxCall = (String) request.getHeader("AJAX");
        UserVo loginUser = (UserVo)session.getAttribute("loginUser");

        System.out.println(ajaxCall);
        if(ajaxCall != null && loginUser == null){
            response.sendError(600);
        }else if(loginUser == null) {
            response.setContentType("text/html; charset=UTF-8");
            PrintWriter out = response.getWriter();
            out.println("<script>alert('로그인 세션이 만료되었습니다.\\n로그인 다시 부탁드립니다.');location.href='/logout'</script>");
            out.flush();
            out.close();
            return false;
        }

        return super.preHandle(request, response, handler);
    }

}
