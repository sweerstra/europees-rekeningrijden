package dao;

import Domain.Employee;
import Domain.Invoice;

import java.util.List;

public interface IEmployeeDao {

    Employee findById(long id);

    List<Employee> findAll();

    Employee create(Employee entity);

    void delete(Employee entity);
}
