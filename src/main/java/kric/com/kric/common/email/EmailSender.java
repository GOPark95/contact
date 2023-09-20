package kric.com.kric.common.email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.context.request.ServletWebRequest;

import javax.activation.FileDataSource;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeUtility;
import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;

public class EmailSender {
    @Autowired
    protected JavaMailSender mailSender;

    public void SendEmail(Email email, String prjCode) throws Exception {
        ServletRequestAttributes servletContainer = (ServletRequestAttributes)RequestContextHolder.currentRequestAttributes();
        HttpServletRequest request = servletContainer.getRequest();

        MimeMessage msg = mailSender.createMimeMessage();
        MimeMessageHelper messageHelper = new MimeMessageHelper(msg, true, "UTF-8");

        try {
            messageHelper.setFrom(email.getSender());	// 네이버는 지정해줘야함
            messageHelper.setSubject(email.getSubject());
            messageHelper.setText(email.getContent(), true);
            messageHelper.setTo(email.getReceiver());

            String[] fileArr = email.getFileName().split("[||]");

            String root = request.getSession().getServletContext().getRealPath("resources");
            String savePath = root + "\\CMS-Files\\"+prjCode+"\\";

//            System.out.println(email.getFileName() + "<<<파일명");
//            System.out.println(fileArr.length + "-------" + Arrays.deepToString(fileArr));
            for (String s : fileArr) {
                if(!s.trim().equals("")){
                    FileDataSource fds = new FileDataSource(savePath + s);
                    messageHelper.addAttachment(MimeUtility.encodeText(s, "UTF-8", "B"), fds);
                }
            }

        }catch(MessagingException e) {
            System.out.println("MessagingException");
            e.printStackTrace();
        }

        try {
//            System.out.println("메일 보냅니다~");
            mailSender.send(msg);
        }catch(MailException e) {
            System.out.println("MailException발생");
            e.printStackTrace();
        }
    }
}
