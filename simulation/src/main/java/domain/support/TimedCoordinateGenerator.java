package domain.support;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class TimedCoordinateGenerator {

    private static CoordinateGenerator coordinateGenerator;

    // Generates a random coordinate every 2 seconds
    private static long DELAY = 2000;
    private static long INITIAL_DELAY = 0;
    private static int RADIUS_IN_METERS = 5000;

    private static Coordinate startPosition = new Coordinate(51.5313105f, -0.1405928f);

    public static void main(String[] args) {
        coordinateGenerator = new CoordinateGenerator();

        final ScheduledExecutorService ses = Executors.newSingleThreadScheduledExecutor();
        ses.scheduleWithFixedDelay(
                new Runnable() {
                    public void run() {
                        System.out.println(coordinateGenerator.generateRandomCoordinate(startPosition, RADIUS_IN_METERS).toString());
                    }
                }, INITIAL_DELAY, DELAY, TimeUnit.MILLISECONDS
        );
    }
}
