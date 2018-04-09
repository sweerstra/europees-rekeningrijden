package dao;

import domain.Employee;

import java.util.List;

public interface IEmployeeDao {

    Employee findById(long id);

    Employee create(Employee entity);

    Employee update(Employee employee);

    Employee getEmployeeByEmail(String email);

    List<Employee> findAll();

    void delete(Employee entity);
}
