package dao;

import domain.Movement;

import java.util.List;

public interface IMovementDao {

    List<Movement> findAll();

    Movement findbyAuthorisationcode(String authorisationCode);



    Movement create(Movement entity);

    void delete(Movement entity);

}
