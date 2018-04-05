package domain;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.xml.bind.annotation.XmlRootElement;
import java.sql.Timestamp;
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

    public Invoice(String trackerId, PaymentStatus paid, double totalAmount, int billingMonth, double distanceTravelled, String emissionCategory) {
        this.trackerId = trackerId;
        this.paid = paid;
        this.totalAmount = totalAmount;
        this.billingMonth = billingMonth;
        this.distanceTravelled = distanceTravelled;
        this.emissionCategory = emissionCategory;
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

    public String getemissionCategory() {
        return emissionCategory;
    }

    public void setemissionCategory(String emissionCategory) {
        this.emissionCategory = emissionCategory;
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

    public enum PaymentStatus {
        PAID,
        OPEN,
        CANCELLED
    }
}
