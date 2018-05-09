package domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@XmlRootElement
public class ForeignVehicle {

    @Id
    @GeneratedValue
    private long id;

    private String trackerid;

    private String countryCode;

    private String licencePlate;

    private String emissionCatagory;

    public ForeignVehicle() {
    }

    public ForeignVehicle(String trackerid, String licencePlate, String emissionCatagory)
    {
        this.trackerid = trackerid;
        this.licencePlate = licencePlate;
        this.emissionCatagory = emissionCatagory;
    }


    public String getTrackerid() {
        return trackerid;
    }

    public void setTrackerid(String trackerid) {
        this.trackerid = trackerid;
    }



    public String getEmissionCatagory() {
        return emissionCatagory;
    }

    public void setEmissionCatagory(String emissionCatagory) {
        this.emissionCatagory = emissionCatagory;
    }

    public String getLicencePlate() {
        return licencePlate;
    }

    public void setLicencePlate(String licencePlate) {
        this.licencePlate = licencePlate;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getCountryCode() {
        return countryCode;
    }

    public void setCountryCode(String countryCode) {
        this.countryCode = countryCode;
    }
}
