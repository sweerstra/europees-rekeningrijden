package Domain;

import java.util.Date;

public class Invoice {

    private long id;
    private String trackerId;
    private double totalAmount;
    private Date paid;
    private int month;
    private double distanceTravelled;
    private String emissionCatagorie;

    public Invoice(String trackerId, double totalAmount, Date paid, int month, double distanceTravelled, String emissionCatagorie)
    {
        this.trackerId = trackerId;
        this.totalAmount = totalAmount;
        this.month = month;
        this.distanceTravelled = distanceTravelled;
        this.emissionCatagorie = emissionCatagorie;
    }

    public Invoice(){}

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

    public Date getPaid() {
        return paid;
    }

    public void setPaid(Date paid) {
        this.paid = paid;
    }

    public int getMonth() {
        return month;
    }

    public void setMonth(int month) {
        this.month = month;
    }

    public double getDistanceTravelled() {
        return distanceTravelled;
    }

    public void setDistanceTravelled(double distanceTravelled) {
        this.distanceTravelled = distanceTravelled;
    }

    public String getEmissionCatagorie() {
        return emissionCatagorie;
    }

    public void setEmissionCatagorie(String emissionCatagorie) {
        this.emissionCatagorie = emissionCatagorie;
    }
}
