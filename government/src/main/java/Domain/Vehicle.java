package Domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@XmlRootElement
public class Vehicle {

    @Id
    @GeneratedValue
    private long id;
    private String trackerId;
    private int ownerId;
    private String licencePlate;
    private String typeTracker;
    private String emissionCatagorie;

    public Vehicle(String trackerId, int ownerId, String licencePlate, String typeTracker, String emissionCatagorie)
    {
        this.trackerId = trackerId;
        this.ownerId = ownerId;
        this.licencePlate = licencePlate;
        this.typeTracker = typeTracker;
        this.emissionCatagorie = emissionCatagorie;
    }

    public Vehicle(){}

    public String getTrackerId() {
        return trackerId;
    }

    public void setTrackerId(String trackerId) {
        this.trackerId = trackerId;
    }

    public int getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(int ownerId) {
        this.ownerId = ownerId;
    }

    public String getLicencePlate() {
        return licencePlate;
    }

    public void setLicencePlate(String licencePlate) {
        this.licencePlate = licencePlate;
    }

    public String getTypeTracker() {
        return typeTracker;
    }

    public void setTypeTracker(String typeTracker) {
        this.typeTracker = typeTracker;
    }

    public String getEmissionCatagorie() {
        return emissionCatagorie;
    }

    public void setEmissionCatagorie(String emissionCatagorie) {
        this.emissionCatagorie = emissionCatagorie;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
}
