package domain;

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

    private double defaultRate;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "region")
    @LazyCollection(LazyCollectionOption.FALSE)
    private List<RegionTime> regionTimes;

    public Region(String name, double defaultRate) {
        this.name = name;
        this.defaultRate = defaultRate;
    }

    public Region() {}

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getDefaultRate() {
        return defaultRate;
    }

    public void setDefaultRate(double defaultRate) {
        this.defaultRate = defaultRate;
    }

    public List<RegionTime> getRegionTimes() {
        return regionTimes;
    }

    public void setRegionTimes(List<RegionTime> regionTimes) {
        this.regionTimes = regionTimes;
    }
}
