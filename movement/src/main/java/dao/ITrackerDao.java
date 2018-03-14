package dao;

import domain.Tracker;

import java.util.List;

public interface ITrackerDao {

    Tracker findById(long id);

    List<Tracker> findAll();

    Tracker create(Tracker entity);

    Tracker update(Tracker entity);

    void delete(Tracker entity);

    void deleteById(long id);
}
