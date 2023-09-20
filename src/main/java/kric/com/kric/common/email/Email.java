package kric.com.kric.common.email;

public class Email {
    private String subject;
    private String content;
    private String sender;
    private String receiver;
    private String fileName;

    public String getSubject() {
        return subject;
    }
    public void setSubject(String subject) {
        this.subject = subject;
    }
    public String getContent() {
        return content;
    }
    public void setContent(String content) {
        this.content = content;
    }
    public String getReceiver() {
        return receiver;
    }
    public void setReceiver(String receiver) {
        this.receiver = receiver;
    }
    public String getSender(){
        return sender;
    }
    public void setSender(String sender){
        this.sender = sender;
    }
    public String getFileName(){
        return fileName;
    }
    public void setFileName(String fileName){
        this.fileName = fileName;
    }



    @Override
    public String toString() {
        return "Email [subject=" + subject + ", content=" + content + ", receiver=" + receiver + "]";
    }
}
