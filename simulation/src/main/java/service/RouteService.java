package service;

import domain.classes.Route;
import domain.support.Coordinate;
import domain.support.CoordinateGenerator;

import javax.ejb.Stateless;

@Stateless
public class RouteService {
    private static Coordinate startPosition = new Coordinate(51.5313105f, -0.1405928f);
    private CoordinateGenerator coordinateGenerator;

    public RouteService() {
        super();
        this.coordinateGenerator = new CoordinateGenerator();
    }

    public Route generateCoordinates(int speed) {
        if (speed == 0) return null;

        int meters = (speed * 1000) / 2;

        Coordinate startCoordinate = startPosition;
        Coordinate endCoordinate = coordinateGenerator.generateRandomCoordinate(startPosition, meters);

        return new Route(startCoordinate, endCoordinate);
    }
}
