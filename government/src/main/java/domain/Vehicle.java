package domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.List;

@Entity
@XmlRootElement
public class Vehicle {
    @Id
    @GeneratedValue
    private long id;
    private String trackerId;

    @OneToMany
    @JsonIgnore
    @LazyCollection(LazyCollectionOption.FALSE)
    private List<Ownership> ownerships;

    private String licensePlate;
    private String typeTracker;
    private String emissionCategory;

    public Vehicle(String trackerId, String licensePlate, String typeTracker, String emissionCategory) {
        this.trackerId = trackerId;
        this.licensePlate = licensePlate;
        this.typeTracker = typeTracker;
        this.emissionCategory = emissionCategory;
    }

    public Vehicle() {}

    public String getTrackerId() {
        return trackerId;
    }

    public void setTrackerId(String trackerId) {
        this.trackerId = trackerId;
    }

    public List<Ownership> getOwnerships() {
        return ownerships;
    }

    public void addOwnership(Ownership ownership) {
        this.ownerships.add(ownership);
    }

    public void setOwnerships(List<Ownership> ownerships) {
        this.ownerships = ownerships;
    }

    public String getlicensePlate() {
        return licensePlate;
    }

    public void setlicensePlate(String licensePlate) {
        this.licensePlate = licensePlate;
    }

    public String getTypeTracker() {
        return typeTracker;
    }

    public void setTypeTracker(String typeTracker) {
        this.typeTracker = typeTracker;
    }

    public String getemissionCategory() {
        return emissionCategory;
    }

    public void setemissionCategory(String emissionCategory) {
        this.emissionCategory = emissionCategory;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
}
