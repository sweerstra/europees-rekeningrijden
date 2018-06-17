package dao;

import domain.Owner;

import java.util.List;

public interface IOwnerDao {
    Owner findById(long id);

    Owner findByBSN(String citizenServiceNumber);

    Owner findByEmail(String email);

    List findByName(String name);

    List<Owner> findAll();

    Owner create(Owner entity);

    void delete(Owner entity);

    Owner update(Owner entity);
}
