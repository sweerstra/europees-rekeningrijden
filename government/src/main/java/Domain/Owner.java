package Domain;

import java.util.Date;

public class Owner {

    private int id;
    private boolean usesBillriderWebsite;
    private String firstName;
    private String lastName;
    private String adresse;
    private String postCode;
    private String city;
    private String phone;
    private String email;
    private Date dateofBirth;

    public Owner(String firstName, String lastName, String adresse, String postCode, String city, String phone, String email, Date dateofBirth)
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.adresse = adresse;
        this.postCode = postCode;
        this.city = city;
        this.phone = phone;
        this.email = email;
        this.dateofBirth = dateofBirth;
    }

    public Owner(){}

    public int getId() {
        return id;
    }

    public void setId(int id) {
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

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getPostCode() {
        return postCode;
    }

    public void setPostCode(String postCode) {
        this.postCode = postCode;
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

    public Date getDateofBirth() {
        return dateofBirth;
    }

    public void setDateofBirth(Date dateofBirth) {
        this.dateofBirth = dateofBirth;
    }
}
