package dao;

import domain.EmissionCategory;
import domain.Employee;
import domain.Region;

import java.util.List;

public interface IEmissionDao {

    EmissionCategory findById(long id);

    EmissionCategory findByName(String name);

    EmissionCategory create(EmissionCategory entity);

    EmissionCategory update(EmissionCategory entity);

    List<EmissionCategory> findAll();

    void delete(EmissionCategory entity);

    void deleteByName(EmissionCategory entity);
}
