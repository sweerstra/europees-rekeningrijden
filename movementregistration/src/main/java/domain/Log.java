package domain;

import java.util.Date;

public class Log {

    private Date beginTime;
    private Date endTime;
    private int amountOfRequests;
    private String message;
    
    public Log(Date beginTime, Date endTime, int amountOfrequests, String message)
    {
        this.beginTime = beginTime;
        this.endTime = endTime;
        this.amountOfRequests = amountOfrequests;

        this.message = message;
    }

    public Date getBeginTime() {
        return beginTime;
    }

    public void setBeginTime(Date beginTime) {
        this.beginTime = beginTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public int getAmountOfrequests() {
        return amountOfRequests;
    }

    public void setAmountOfrequests(int amountOfrequests) {
        this.amountOfRequests = amountOfrequests;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
