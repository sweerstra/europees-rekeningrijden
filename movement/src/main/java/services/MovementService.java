package services;

import dao.IMovementDao;
import domain.Movement;

import javax.ejb.Stateless;
import javax.inject.Inject;
import java.util.List;

@Stateless
public class MovementService {
    @Inject
    private IMovementDao movementDao;

    public MovementService() {
        super();
    }

    public Movement addMovement(Movement movement) {
        movement = movementDao.create(movement);
        return movement;
    }

    public List<Movement> getAllMovements() {
        return movementDao.findAll();
    }


    public Movement search(String authorisationCode) {
        return movementDao.findbyAuthorisationcode(authorisationCode);
    }
}
