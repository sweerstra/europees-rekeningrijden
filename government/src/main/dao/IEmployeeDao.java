package main.dao;



import main.domain.Employee;

import java.util.List;

public interface IEmployeeDao {
    Employee create(Employee employee);

    Employee update(Employee employee);

    Employee findById(long id);


    List<Employee> findAll();

    void delete(Employee employee);

    Employee getEmployeeByEmail(String email);


}
