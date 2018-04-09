package domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.List;

@Entity
@XmlRootElement
public class Region {

    @Id
    @GeneratedValue
    private long id;

    private String name;

    private double rate;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "region")
    @JsonIgnore
    @LazyCollection(LazyCollectionOption.FALSE)
    private List<RegionTime> regionTimes;

    public Region(String name, double rate) {
        this.name = name;
        this.rate = rate;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getRate() {
        return rate;
    }

    public void setRate(double rate) {
        this.rate = rate;
    }

    public List<RegionTime> getRegionTimes() {
        return regionTimes;
    }

    public void setRegionTimes(List<RegionTime> regionTimes) {
        this.regionTimes = regionTimes;
    }
}
