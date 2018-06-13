package model;

import domain.Region;

import java.util.List;

public class RegionMovement {
    private Region region;
    private Movement movement;
    private double distance;

    public RegionMovement(Region region, Movement movements) {
        this.region = region;
        this.movement = movements;
    }

    public RegionMovement() {
    }

    public Region getRegion() {
        return region;
    }

    public void setRegion(Region region) {
        this.region = region;
    }

    public Movement getMovement() {
        return movement;
    }

    public void setMovement(Movement movement) {
        this.movement = movement;
    }

    public double getDistance() {
        return distance;
    }

    public void setDistance(double totalDistance) {
        this.distance = totalDistance;
    }
}
