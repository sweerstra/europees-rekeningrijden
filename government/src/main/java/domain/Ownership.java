package domain;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Ownership {
    @Id
    @GeneratedValue
    private long id;

    @ManyToOne
    private Owner owner;

    @ManyToOne
    private Vehicle vehicle;

    @Column(nullable = false)
    private Date startDate;

    private Date endDate;

    public Ownership(Owner owner, Vehicle vehicle, Date startDate, Date endDate) {
        this.owner = owner;
        this.vehicle = vehicle;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public Ownership() {}

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Owner getOwner() {
        return owner;
    }

    public void setOwner(Owner owner) {
        this.owner = owner;
    }

    public Vehicle getVehicle() {
        return vehicle;
    }

    public void setVehicle(Vehicle vehicle) {
        this.vehicle = vehicle;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }
}
