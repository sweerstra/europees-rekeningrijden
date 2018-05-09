package domain;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.Date;

@Entity
@XmlRootElement
public class StolenVehicle {

    @Id
    @GeneratedValue
    private long id;

    private String trackerid;

    private Date date;

    private String dateString;

    public StolenVehicle()
    {}

    public StolenVehicle(String trackerid, Date date)
    {
        this.trackerid = trackerid;
        this.date = date;
    }

    public String getTrackerid() {
        return trackerid;
    }

    public void setTrackerid(String trackerid) {
        this.trackerid = trackerid;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getDateString() {
        return dateString;
    }

    public void setDateString(String dateString) {
        this.dateString = dateString;
    }
}
