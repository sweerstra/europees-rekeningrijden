package domain.support;

public class Coordinate {
    private float longitude;
    private float latitude;

    public Coordinate(float longitude, float latitude) {
        this.longitude = longitude;
        this.latitude = latitude;
    }

    public float getLongitude() {
        return this.longitude;
    }

    public float getLatitude() {
        return this.latitude;
    }

    @Override
    public String toString(){
        return "Lon: " + this.longitude + ", Lat: " + this.latitude;
    }
}
