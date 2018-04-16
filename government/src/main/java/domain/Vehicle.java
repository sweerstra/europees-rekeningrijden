package domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@XmlRootElement
public class Vehicle {

    @Id
    @GeneratedValue
    private long id;
    private String trackerId;
    @OneToOne
    private Owner owner;
    private String licensePlate;
    private String typeTracker;
    private String emissionCategory;

    public Vehicle(String trackerId, Owner owner, String licensePlate, String typeTracker, String emissionCategory)
    {
        this.trackerId = trackerId;
        this.owner = owner;
        this.licensePlate = licensePlate;
        this.typeTracker = typeTracker;
        this.emissionCategory = emissionCategory;
    }

    public Vehicle(){}

    public String getTrackerId() {
        return trackerId;
    }

    public void setTrackerId(String trackerId) {
        this.trackerId = trackerId;
    }

    public Owner getOwner() {
        return owner;
    }

    public void setOwner(Owner owner) {
        this.owner = owner;
    }

    public String getLicensePlate() {
        return licensePlate;
    }

    public void setLicensePlate(String licensePlate) {
        this.licensePlate = licensePlate;
    }

    public String getTypeTracker() {
        return typeTracker;
    }

    public void setTypeTracker(String typeTracker) {
        this.typeTracker = typeTracker;
    }

    public String getEmissionCategory() {
        return emissionCategory;
    }

    public void setEmissionCategory(String emissionCategory) {
        this.emissionCategory = emissionCategory;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
}
