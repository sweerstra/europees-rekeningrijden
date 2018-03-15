package domain.support;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class CoordinateGenerator {
    public List<Coordinate> generatedCoordinates = new ArrayList();

    public CoordinateGenerator() {
    }

    public Coordinate generateRandomCoordinate(Coordinate startPosition, int radiusInMeters) {
        double x0 = (double) startPosition.getLongitude();
        double y0 = (double) startPosition.getLatitude();
        Random random = new Random();
        double radiusInDegrees = (double) ((float) radiusInMeters / 111320.0F);
        double u = random.nextDouble();
        double v = random.nextDouble();
        double w = radiusInDegrees * Math.sqrt(u);
        double t = 6.283185307179586D * v;
        double x = w * Math.cos(t);
        double y = w * Math.sin(t);
        double new_x = x / Math.cos(Math.toRadians(y0));
        float foundLatitude = (float) (y0 + y);
        float foundLongitude = (float) (x0 + new_x);
        Coordinate randomCoordinate = new Coordinate(foundLongitude, foundLatitude);
        return randomCoordinate;
    }

    public List<Coordinate> generateRandomCoordinates(Coordinate startPosition, int radiusInMeters, int amountOfCoordinates) {
        int i = amountOfCoordinates;
        ArrayList _returnList = new ArrayList();
        do {
            Coordinate c = this.generateRandomCoordinate(startPosition, radiusInMeters);
            _returnList.add(c);
            --i;
        } while (i > 0);
        return _returnList;
    }
}