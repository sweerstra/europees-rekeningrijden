package service;

import dao.IEmployeeDao;
import domain.Employee;

import javax.ejb.Stateless;
import javax.inject.Inject;
import java.util.List;

@Stateless
public class EmployeeService {

    @Inject
    private IEmployeeDao employeeDao;

    public EmployeeService() {
        super();
    }

    public Employee addEmployee(Employee employee) {
        return employeeDao.create(employee);
    }

    public List<Employee> getAllEmployees() {
        return employeeDao.findAll();
    }

    public Employee editEmployeeByAdmin(Long userID, Employee employee) {
        Employee found = findEmployeeById(userID);

        if (found == null)
            return null;

        if (new String(found.getRole()).equals("admin")) {
            Employee loadedEmployee = employeeDao.findById(employee.getId());

            if (loadedEmployee == null)
                return null;

            loadedEmployee.setEmail(employee.getEmail());
            loadedEmployee.setRole(employee.getRole());
            loadedEmployee.setActive(employee.getActive());

            return employeeDao.update(loadedEmployee);
        }
        return null;
    }

    public Employee addEmployeeByAdmin(long userID, Employee employee) {
        Employee found = findEmployeeById(userID);

        if (found == null)
            return null;

        if (new String(found.getRole()).equals("admin"))
            return employeeDao.create(employee);
        else return null;
    }

    public Employee authenthicate(String email, String password) {
        Employee employee = employeeDao.getEmployeeByEmail(email);

        if (employee == null || !employee.getPassword().equals(password)) return null;

        return employee;
    }

    public void deleteEmployee(Employee employee) {
        employeeDao.delete(employee);
    }

    public Employee updateEmployee(Employee employee) {
        return employeeDao.update(employee);
    }

    public Employee findEmployeeById(Long iD) {
        return employeeDao.findById(iD);
    }
}