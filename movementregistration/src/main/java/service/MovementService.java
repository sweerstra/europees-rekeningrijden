package service;

import dao.IMovementDao;
import domain.Movement;

import javax.ejb.Stateless;
import javax.inject.Inject;
import java.util.List;

@Stateless
public class MovementService {

    @Inject
    private IMovementDao movementDao;

    public MovementService()
    {
        super();
    }

    public Movement create(Movement movement)  {
     movement = movementDao.create(movement);
     return movement;
    }

    public List<Movement> findAll() {
        return movementDao.findAll();
    }

    public void delete(Movement movement)  {
        movementDao.delete(movement);
    }

    public Movement search(String authorisationCode) {
        return movementDao.findbyAuthorisationcode(authorisationCode);
    }


}
