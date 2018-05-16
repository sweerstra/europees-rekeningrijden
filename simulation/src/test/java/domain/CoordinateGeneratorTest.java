package domain;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import domain.classes.Movement;
import domain.classes.Tracker;
import domain.support.Coordinate;
import domain.support.CoordinateGenerator;
import domain.support.HttpHelper;
import org.junit.Before;
import org.junit.Test;

import java.util.Iterator;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.CountDownLatch;

public class CoordinateGeneratorTest {
    private CoordinateGenerator coordinateGenerator;

    // Generates a random coordinate every 2 seconds
    private static long DELAY = 5000;
    private static long INITIAL_DELAY = 1000;
    private static int RADIUS_IN_METERS = 1000;
    private static long PERIOD = 10000;
    private static int PERIOD_COUNTER = 1;
//    private String TIME_FORMAT = "yyyy-MM-dd HH:mm";

    private String API_URL = "http://localhost:8080/movement/api/movement";

    private static Coordinate startPosition = new Coordinate(51.5313105f, -0.1405928f);

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

    //    @Test
    public void timedCoordinateGeneratorTest() throws InterruptedException {
//        tcc = new TimedCoordinateGenerator();
        Timer timer = new Timer();
        final CountDownLatch latch = new CountDownLatch(10);
        TimerTask task = new TimerTask() {
            long t0 = System.currentTimeMillis();

            @Override
            public void run() {
                if (System.currentTimeMillis() - t0 > PERIOD) {
                    cancel();
                } else {
                    System.out.println(coordinateGenerator.generateRandomCoordinate(startPosition, RADIUS_IN_METERS).toString());
                }

            }
        };
        timer.schedule(task, INITIAL_DELAY, DELAY);
        latch.await();
    }

    @Test
    public void countdownCoordinateGeneratorTest() {
        final CountDownLatch latch = new CountDownLatch(PERIOD_COUNTER);

        Timer timer = new Timer();
        timer.scheduleAtFixedRate(new TimerTask() {
            public void run() {
                System.out.println(coordinateGenerator.generateRandomCoordinate(startPosition, RADIUS_IN_METERS).toString());
                latch.countDown();
            }
        }, INITIAL_DELAY, DELAY);

        try {
            latch.await();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        timer.cancel();
    }

    @Test
    public void postMovementTest() {
        Gson gson = new Gson();
        Tracker tracker = new Tracker(1);
        // Random coordinate generator
        final CountDownLatch latch = new CountDownLatch(PERIOD_COUNTER);

        Timer timer = new Timer();
        timer.scheduleAtFixedRate(new TimerTask() {
            public void run() {
                // Random Coordinate
                Coordinate newCoordinate = coordinateGenerator.generateRandomCoordinate(startPosition, RADIUS_IN_METERS);

                // Creates a new movement
                Movement newMovement = new Movement(tracker, newCoordinate.getLongitude(), newCoordinate.getLatitude());

                // Convert to readable Json and post
                String json = gson.toJson(newMovement);
                // System.out.println(json);
                System.out.println(newMovement.getLongitude() + ", " + newMovement.getLatitude());

                // String response = HttpHelper.post(API_URL, gson.toJson(newCoordinate));
                // System.out.println(response);
                startPosition = newCoordinate;
                latch.countDown();
            }
        }, INITIAL_DELAY, DELAY);

        try {
            latch.await();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        timer.cancel();

        // End of generator
    }
}