package services;

import dao.IMovementDao;
import domain.Movement;
import utils.DateUtils;

import javax.ejb.Stateless;
import javax.inject.Inject;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.List;

@Stateless
public class MovementService {
    @Inject
    private IMovementDao movementDao;

    public MovementService() {
        super();
    }

    public Movement addMovement(Movement movement) {
        Date newDateTime = DateUtils.createDateFromString(movement.getTime(), "dd-MM-yyyy hh:mm:ss");
        if (newDateTime == null) return null;

        movement.setDateTime(newDateTime);

        return movementDao.create(movement);
    }

    public List<Movement> getMovementsByTrackerId(String trackerId) {
        return movementDao.findByTrackerId(trackerId);
    }

    public List<Movement> getMovementsBetweenDates(String trackerId, String start, String end) {
        Date startDate = DateUtils.createDateFromString(start, "dd-MM-yyyy");
        Date endDate = DateUtils.createDateFromString(end, "dd-MM-yyyy");

        if (startDate == null || endDate == null) return null;

        Calendar cal = Calendar.getInstance();
        cal.setTime(endDate);
        cal.add(Calendar.DATE, 1);

        Date newEndDate = cal.getTime();

        return movementDao.findBetweenDates(trackerId, startDate, newEndDate);
    }

    public List<Movement> getAllMovements() {
        return movementDao.findAll();
    }

    public Movement getLatestMovement(String trackerId) {
        List<Movement> movements = movementDao.findByTrackerId(trackerId);

        if (!movements.isEmpty()) {
            Collections.sort(movements);
            return movements.get(movements.size() - 1);
        } else {
            return null;
        }

    }
}
