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
    private double totalAmount;

    @ManyToOne
    private Ownership ownership;

    private Date dateOfPayment;
    private PaymentStatus paid;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy/MM/dd")
    private Date billingDate;
    private double distanceTravelled;

    @JsonIgnore
    private ArrayList<String> conditions;

    public Invoice(Ownership ownership, PaymentStatus paid, double totalAmount, Date billingDate, double distanceTravelled) {
        this.ownership = ownership;
        this.paid = paid;
        this.totalAmount = totalAmount;
        this.billingDate = billingDate;
        this.distanceTravelled = distanceTravelled;
        conditions = new ArrayList<>();
    }

    public Invoice(Ownership ownership, PaymentStatus paid, double totalAmount, Date billingDate, double distanceTravelled, ArrayList<String> conditions) {
        this.ownership = ownership;
        this.paid = paid;
        this.totalAmount = totalAmount;
        this.billingDate = billingDate;
        this.distanceTravelled = distanceTravelled;
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

    public void createCurrentDateOfPayment() {
        this.dateOfPayment = new Timestamp(System.currentTimeMillis());
    }

    public Date getBillingDate() {
        return billingDate;
    }

    public void setBillingDate(Date billingDate) {
        this.billingDate = billingDate;
    }

    public ArrayList<String> getConditions() {
        return conditions;
    }

    public void setConditions(ArrayList<String> conditions) {
        this.conditions = conditions;
    }

    public Date getDateOfPayment() {
        return dateOfPayment;
    }

    public void setDateOfPayment(Date dateOfPayment) {
        this.dateOfPayment = dateOfPayment;
    }

    public Ownership getOwnership() {
        return ownership;
    }

    public void setOwnership(Ownership ownership) {
        this.ownership = ownership;
    }

    public enum PaymentStatus {
        PAID,
        OPEN,
        CANCELLED
    }
}
