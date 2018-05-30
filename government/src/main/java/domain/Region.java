package domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@XmlRootElement
public class Region implements Serializable {
    @Id
    @GeneratedValue
    private long id;

    private String name;

    private double defaultRate;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "region")
    @LazyCollection(LazyCollectionOption.FALSE)
    @JsonManagedReference
    private List<RegionTime> regionTimes;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "region")
    @LazyCollection(LazyCollectionOption.FALSE)
    @JsonManagedReference
    private List<Coordinate> coordinates;

    public Region(String name, double defaultRate) {
        this.name = name;
        this.defaultRate = defaultRate;
        this.regionTimes = new ArrayList<>();
        this.coordinates = new ArrayList<>();
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

    public List<Coordinate> getCoordinates() {
        return coordinates;
    }

    public void setCoordinates(List<Coordinate> coordinates) {
        this.coordinates = coordinates;
    }

    public Region serialized() {
        for (RegionTime regionTime : this.regionTimes) regionTime.setRegion(null);
        for (Coordinate coordinate : this.coordinates) coordinate.setRegion(null);
        return this;
    }
}
