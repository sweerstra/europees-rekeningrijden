package domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.io.Serializable;

@Entity
public class RegionTime implements Serializable {
    @Id
    @GeneratedValue
    private long id;

    @ManyToOne
    @JsonIgnore
    private Region region;

    private String startTime;

    private String endTime;

    private double rate;

    public RegionTime(String startTime, String endTime, double rate) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.rate = rate;
    }

    public RegionTime() {}

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public double getRate() {
        return rate;
    }

    public void setRate(double rate) {
        this.rate = rate;
    }

    public Region getRegion() {
        return region;
    }

    public void setRegion(Region region) {
        this.region = region;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }
}
