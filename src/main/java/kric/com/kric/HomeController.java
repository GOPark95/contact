package kric.com.kric;


import kric.com.kric.contact.model.service.ContactService;
import kric.com.kric.contact.model.vo.ContactListVo;
import kric.com.kric.user.model.service.UserService;
import kric.com.kric.user.model.vo.UserVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.support.SessionStatus;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;

@Controller
@SessionAttributes({"loginUser"})
public class HomeController {

    @Autowired
    private UserService userService;
    @Autowired
    private ContactService contactService;

    /*로그아웃*/
    @RequestMapping("/logout")
    public String index(HttpSession sess, SessionStatus status){
        UserVo loginUser = (UserVo)sess.getAttribute("loginUser");

        contactService.ProgressContactReset(loginUser);
        sess.invalidate();
        status.setComplete();
        return "redirect:/";
    }

    /*로그인 확인*/
    @ResponseBody
    @RequestMapping("/login")
    public String login(@RequestParam("id") String id,
                        @RequestParam("pwd") String pwd,
                        HttpServletRequest req
                        ){
        HttpSession sess = req.getSession();
        UserVo user = new UserVo();
        user.setP_pass(pwd);

        if(id.indexOf("@")>0) user.setP_email(id);
        else user.setP_name(id);

        UserVo loginUser = userService.login(user);

        if(loginUser != null){
            contactService.ProgressContactReset(loginUser);
            sess.setAttribute("loginUser", loginUser);
            return "1";
        }else{
            return "2";
        }
    }

    /*home 이동*/
    @RequestMapping("/home")
    public String home(Model model, HttpSession sess){
        UserVo loginUser = (UserVo)sess.getAttribute("loginUser");

        System.out.println(loginUser.getP_type() + "<<<<<<<<<<<<<<<<<");
//        if(loginUser.getP_type().equals("관리자")) return "redirect:/contactProject/Main";
//        else if(loginUser.getP_type().equals("컨택원")) return "redirect:/contact/MatchingView";
        return "redirect:/contactProject/Main";
    }

}
