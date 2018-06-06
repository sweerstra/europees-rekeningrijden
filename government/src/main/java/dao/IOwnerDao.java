package dao;

import domain.Owner;

import java.util.List;

public interface IOwnerDao {

    Owner findById(long id);

    Owner findByBSN(String citizenServiceNumber);

    List findByName(String name);

    List<Owner> findAll();

    Owner create(Owner entity);

    void delete(Owner entity);
}
