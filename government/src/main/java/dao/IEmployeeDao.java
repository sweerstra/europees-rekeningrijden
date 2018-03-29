package dao;

import domain.Employee;

import java.util.List;

public interface IEmployeeDao {

    Employee findById(long id);

    List<Employee> findAll();

    Employee create(Employee entity);

    void delete(Employee entity);
}
