package model;

import domain.Region;

import java.util.List;

public class RegionMovement {
    private Region region;
    private List<Movement> movements;

    public RegionMovement(Region region, List<Movement> movements) {
        this.region = region;
        this.movements = movements;
    }

    public RegionMovement() {
    }

    public Region getRegion() {
        return region;
    }

    public void setRegion(Region region) {
        this.region = region;
    }

    public List<Movement> getMovements() {
        return movements;
    }

    public void setMovements(List<Movement> movements) {
        this.movements = movements;
    }
}
