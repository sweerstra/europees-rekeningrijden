package domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;

@Entity
@XmlRootElement
public class Invoice {
    @Id
    @GeneratedValue
    private long id;
    private String trackerId;
    private double totalAmount;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy/MM/dd")
    private Date dateOfPayment;
    private PaymentStatus paid;
    private int billingMonth;
    private double distanceTravelled;
    private String emissionCategory;

    @OneToOne
    @JoinColumn(name = "vehicle_id", referencedColumnName = "id")
    private Vehicle vehicle;

    @JsonIgnore
    private ArrayList<String> conditions;

    public Invoice(String trackerId, PaymentStatus paid, double totalAmount, int billingMonth, double distanceTravelled, String emissionCategory, Vehicle vehicle) {
        this.trackerId = trackerId;
        this.paid = paid;
        this.totalAmount = totalAmount;
        this.billingMonth = billingMonth;
        this.distanceTravelled = distanceTravelled;
        this.emissionCategory = emissionCategory;
        this.vehicle = vehicle;
    }

    public Invoice(String trackerId, PaymentStatus paid, double totalAmount, int billingMonth, double distanceTravelled, String emissionCategory, Vehicle vehicle, ArrayList<String> conditions) {
        this.trackerId = trackerId;
        this.paid = paid;
        this.totalAmount = totalAmount;
        this.billingMonth = billingMonth;
        this.distanceTravelled = distanceTravelled;
        this.emissionCategory = emissionCategory;
        this.vehicle = vehicle;
        this.conditions = conditions;
    }

    public Invoice() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTrackerId() {
        return trackerId;
    }

    public void setTrackerId(String trackerId) {
        this.trackerId = trackerId;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public double getDistanceTravelled() {
        return distanceTravelled;
    }

    public void setDistanceTravelled(double distanceTravelled) {
        this.distanceTravelled = distanceTravelled;
    }

    public PaymentStatus getPaid() {
        return paid;
    }

    public void setPaid(PaymentStatus paid) {
        this.paid = paid;
    }

    public Date getDateOfPayment() {
        return dateOfPayment;
    }

    public void setDateOfPayment(Date dateOfPayment) {
        this.dateOfPayment = dateOfPayment;
    }

    public void setCurrentDateOfPayment() {
        this.dateOfPayment = new Timestamp(System.currentTimeMillis());
    }

    public int getBillingMonth() {
        return billingMonth;
    }

    public void setBillingMonth(int billingMonth) {
        this.billingMonth = billingMonth;
    }

    public String getEmissionCategory() {
        return emissionCategory;
    }

    public void setEmissionCategory(String emissionCategory) {
        this.emissionCategory = emissionCategory;
    }

    public Vehicle getVehicle() {
        return vehicle;
    }

    public void setVehicle(Vehicle vehicle) {
        this.vehicle = vehicle;
    }

    public ArrayList<String> getConditions() {
        return conditions;
    }

    public void setConditions(ArrayList<String> conditions) {
        this.conditions = conditions;
    }

    public enum PaymentStatus {
        PAID,
        OPEN,
        CANCELLED
    }
}
