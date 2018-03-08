package domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class Tracker {
    @Id
    @GeneratedValue
    private long id;

    @OneToMany
    private String authorisationCode;

    public Tracker(String authorisationCode) {
        this.authorisationCode = authorisationCode;
    }

    public Tracker() {}

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getAuthorisationCode() {
        return authorisationCode;
    }

    public void setAuthorisationCode(String authorisationCode) {
        this.authorisationCode = authorisationCode;
    }
}
