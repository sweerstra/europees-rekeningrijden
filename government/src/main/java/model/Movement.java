package model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.Date;

public class Movement implements Comparable<Movement>{
    private long id;

    private String trackerId;
    private double longitude;
    private double latitude;
    private Date dateTime;
    private String time;

    public Movement(String trackerId, double longitude, double latitude, String time) {
        this.trackerId = trackerId;
        this.longitude = longitude;
        this.latitude = latitude;
        this.time = time;
    }

    public Movement() { }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTrackerId() {
        return trackerId;
    }

    public void setTrackerId(String trackerId) {
        this.trackerId = trackerId;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public Date getDateTime() {
        return dateTime;
    }

    public void setDateTime(Date dateTime) {
        this.dateTime = dateTime;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    @Override
    public int compareTo(Movement m) {
        return getDateTime().compareTo(m.getDateTime());
    }
}
