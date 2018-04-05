package domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.Date;
import java.util.List;

@Entity
@XmlRootElement
public class Owner {

    @Id
    @GeneratedValue
    private long id;
    private boolean usesBillriderWebsite;
    private String firstName;
    private String lastName;
    private String address;
    private String postalCode;
    private String city;
    private String phone;
    private String email;
    private Date dateOfBirth;

    @OneToMany
    @JsonIgnore
    private List<Ownership> ownerships;

    public Owner(boolean usesBillriderWebsite, String firstName, String lastName, String address, String postalCode, String city, String phone, String email, Date dateOfBirth) {
        this.usesBillriderWebsite = usesBillriderWebsite;
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.postalCode = postalCode;
        this.city = city;
        this.phone = phone;
        this.email = email;
        this.dateOfBirth = dateOfBirth;
    }

    public Owner() {}

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public boolean isUsesBillriderWebsite() {
        return usesBillriderWebsite;
    }

    public void setUsesBillriderWebsite(boolean usesBillriderWebsite) {
        this.usesBillriderWebsite = usesBillriderWebsite;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getpostalCode() {
        return postalCode;
    }

    public void setpostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getdateOfBirth() {
        return dateOfBirth;
    }

    public void setdateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public List<Ownership> getOwnerships() {
        return ownerships;
    }

    public void setOwnerships(List<Ownership> ownerships) {
        this.ownerships = ownerships;
    }
}
