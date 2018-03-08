package dao;

import domain.Movement;

import java.util.List;

public interface IMovementDao {



    /***
     * Find all Movements
     * @return All Users
     */
    List<Movement> findAll();

    /***
     * Create Movement
     * @return Created User
     */
    Movement create(Movement entity);

    /***
     * Delete Movement
     * @param entity Movement to delete
     */
    void delete(Movement entity);

}
