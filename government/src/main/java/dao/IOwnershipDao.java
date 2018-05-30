package dao;

import domain.Ownership;

import java.util.List;

public interface IOwnershipDao {
    Ownership findById(long id);

    Ownership create(Ownership entity);

    Ownership update(Ownership entity);

    List<Ownership> findAll();

    List<Ownership> findLatest();

    List<Ownership> findByOwner(long id);

    List<Ownership> findByVehicle(long id);

    List<Ownership> findByTrackerId(String id);

    void delete(Ownership entity);
}
