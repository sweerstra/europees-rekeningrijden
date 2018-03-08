package domain;

import org.junit.Before;
import org.junit.Test;

import java.util.Iterator;

public class CoordinateGeneratorTest {
    private CoordinateGenerator coordinateGenerator;

    public CoordinateGeneratorTest() {
    }

    @Before
    public void init() {
        this.coordinateGenerator = new CoordinateGenerator();
    }

    @Test
    public void generateRandomCoordinateTest() {
        int i = 0;
        for (Iterator var2 = this.coordinateGenerator.generateRandomCoordinates(new Coordinate(51.51541F, -0.1372448F), 100000, 10).iterator(); var2.hasNext(); ++i) {
            Coordinate c = (Coordinate) var2.next();
            System.out.println("==== " + i + " ====");
            System.out.println(c.getLongitude());
            System.out.println(c.getLatitude());
        }
    }
}