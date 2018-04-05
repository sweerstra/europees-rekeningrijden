package dao;

import domain.Ownership;

import java.util.List;

public interface IOwnershipDao {
    Ownership findById(long id);

    List<Ownership> findAll();

    Ownership create(Ownership entity);

    void delete(Ownership entity);
}
