package services;

import dao.IMovementDao;
import dao.ITrackerDao;
import domain.Movement;
import domain.Tracker;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.sound.midi.Track;
import javax.xml.ws.WebServiceException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Stateless
public class MovementService {
    @Inject
    private IMovementDao movementDao;

    @Inject
    private ITrackerDao trackerDao;

    public MovementService() {
        super();
    }

    public Movement addMovement(Movement movement) {
        Tracker tracker = trackerDao.findById(movement.getTracker().getId());
        if (tracker == null) return null;

        tracker.addMovement(movement);
        trackerDao.update(tracker);
        return movement;
    }

    public List<Movement> getAllMovements() {
        // return movementDao.findAll();
        List<Movement> list = new ArrayList<Movement>();
        list.add(new Movement("12345", 50.123, 5.456, new Date()));
        return list;
    }


    public Movement search(String authorisationCode) {
        return movementDao.findbyAuthorisationcode(authorisationCode);
    }
}
