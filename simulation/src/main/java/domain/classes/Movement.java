package domain.classes;

import com.sun.org.apache.bcel.internal.generic.LAND;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.TimeZone;

public class Movement {
    private Tracker tracker;
    private String serialNumber;
    private float longitude;
    private float latitude;
    private String time;

    private transient String LAND_CODE = "ENG";
    private transient String TIME_FORMAT = "yyyy-MM-dd HH:mm";
    private transient String TIMEZONE = "UTC";

    public Movement(Tracker tracker, float longitude, float latitude) {
        this.tracker = tracker;
        this.longitude = longitude;
        this.latitude = latitude;

        Date date_now = new Date();

        DateFormat formatterUTC = new SimpleDateFormat(TIME_FORMAT);
        formatterUTC.setTimeZone(TimeZone.getTimeZone(TIMEZONE));
        time = formatterUTC.format(date_now);

        serialNumber = generateRandomSerialNumber();
    }

    private String generateRandomSerialNumber(){
        int randomDigits = (int)(Math.random()*9000)+1000;
        return LAND_CODE + randomDigits;
    }


    //region getters and setters
    public Tracker getTracker() {
        return tracker;
    }

    public void setTracker(Tracker tracker) {
        this.tracker = tracker;
    }

    public String getSerialNumber() {
        return serialNumber;
    }

    public void setSerialNumber(String serialNumber) {
        this.serialNumber = serialNumber;
    }

    public float getLongitude() {
        return longitude;
    }

    public void setLongitude(float longitude) {
        this.longitude = longitude;
    }

    public float getLatitude() {
        return latitude;
    }

    public void setLatitude(float latitude) {
        this.latitude = latitude;
    }
    //endregion
}
