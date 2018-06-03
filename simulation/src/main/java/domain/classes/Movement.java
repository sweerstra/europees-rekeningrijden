package domain.classes;

import java.io.Serializable;

public class Movement implements Serializable {
    private String trackerId;
    private double longitude;
    private double latitude;
    private String time;

    public Movement(String trackerId, double longitude, double latitude, String time) {
        this.trackerId = trackerId;
        this.longitude = longitude;
        this.latitude = latitude;
        this.time = time;
    }

    public Movement() { }

    public String getTrackerId() {
        return trackerId;
    }

    public void setTrackerId(String trackerId) {
        this.trackerId = trackerId;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }
}
