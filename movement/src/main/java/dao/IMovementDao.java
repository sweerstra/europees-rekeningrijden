package dao;

import domain.Movement;

import java.util.Date;
import java.util.List;

public interface IMovementDao {
    Movement create(Movement entity);

    List<Movement> findByTrackerId(String trackerId);

    List<Movement> findBetweenDates(String trackerId, Date startDate, Date endDate);

    List<Movement> findAll();
}
