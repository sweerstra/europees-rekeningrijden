package dao;

import domain.Owner;

import java.util.List;

public interface IOwnerDao {

    Owner findById(long id);

    List<Owner> findAll();

    Owner create(Owner entity);

    void delete(Owner entity);
}
