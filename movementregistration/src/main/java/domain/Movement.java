package domain;

import java.util.Date;

public class Movement {
    private String authorisationCode;
    private String serialNumber;
    private double longitude;
    private double latitude;
    private Date time;

    public Movement(String authorisationCode, String serialNumber, double longitude, double latitude, Date time) {
        this.authorisationCode = authorisationCode;
        this.serialNumber = serialNumber;
        this.longitude = longitude;
        this.latitude = latitude;
        this.time = time;
    }

    public String getAuthorisationCode() {
        return authorisationCode;
    }

    public void setAuthorisationCode(String authorisationCode) {
        this.authorisationCode = authorisationCode;
    }

    public String getSerialNumber() {
        return serialNumber;
    }

    public void setSerialNumber(String serialNumber) {
        this.serialNumber = serialNumber;
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

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }
}
