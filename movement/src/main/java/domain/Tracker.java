package domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.ArrayList;
import java.util.List;

@Entity
@XmlRootElement
public class Tracker {
    @Id
    @GeneratedValue
    private long id;

    private String authorisationCode;

    @OneToMany(cascade = CascadeType.PERSIST, mappedBy = "tracker")
    @JsonIgnore
    private List<Movement> movements = new ArrayList<>();

    public Tracker(String authorisationCode) {
        this.authorisationCode = authorisationCode;
    }

    public Tracker() {}

    public void addMovement(Movement movement) {
        this.movements.add(movement);
    }

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

    public List<Movement> getMovements() {
        return movements;
    }

    public void setMovements(List<Movement> movements) {
        this.movements = movements;
    }
}
