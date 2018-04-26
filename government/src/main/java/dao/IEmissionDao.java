package dao;

import domain.EmissionCategory;
import domain.Employee;

import java.util.List;

public interface IEmissionDao {

    EmissionCategory findById(long id);

   EmissionCategory create(EmissionCategory entity);

    EmissionCategory update(EmissionCategory employee);

    List<EmissionCategory> findAll();

    void delete(EmissionCategory entity);

}
