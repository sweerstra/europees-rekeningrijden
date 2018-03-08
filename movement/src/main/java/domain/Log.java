package domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;

@Entity
public class Log {
    @Id
    @GeneratedValue
    private long id;
    private Date beginTime;
    private Date endTime;
    private int amountOfRequests;
    private String message;

    public Log(Date beginTime, Date endTime, int amountOfrequests, String message) {
        this.beginTime = beginTime;
        this.endTime = endTime;
        this.amountOfRequests = amountOfrequests;
        this.message = message;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
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
