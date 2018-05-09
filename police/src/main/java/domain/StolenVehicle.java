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

    private String trackerId;

    private Date dateoOfTheft;

    private String licencePlate;

    private String dateString;

    public StolenVehicle()
    {}

    public StolenVehicle(String trackerid, Date dateOfTheft)
    {
        this.trackerId = trackerid;
        this.dateoOfTheft = dateOfTheft;
    }

    public String getTrackerId() {
        return trackerId;
    }

    public void setTrackerId(String trackerid) {
        this.trackerId = trackerid;
    }

    public Date getDate() {
        return dateoOfTheft;
    }

    public void setDate(Date date) {
        this.dateoOfTheft = date;
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

    public String getLicencePlate() {
        return licencePlate;
    }

    public void setLicencePlate(String licencePlate) {
        this.licencePlate = licencePlate;
    }
}
