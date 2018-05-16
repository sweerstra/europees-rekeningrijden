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

    public Employee editEmployee(Employee employee) {
        Employee loadedEmployee = employeeDao.findById(employee.getId());

        if(loadedEmployee == null)
            return null;

        loadedEmployee.setEmail(employee.getEmail());
        loadedEmployee.setRole(employee.getRole());
        loadedEmployee.setActive(employee.getActive());

        return employeeDao.update(loadedEmployee);
    }


    public Employee createEmployee(Employee employee) {
            return employeeDao.create(employee);
    }

    public Employee addEmployeeByAdmin(long userID, Employee employee) {
        Employee found = findEmployeeById(userID);

        if (found == null)
            return null;

        if (new String(found.getRole()).equals("admin"))
            return employeeDao.create(employee);
        else return null;
    }

    public Employee setActiveByAdmin(long selfID, long userID) {
        Employee found = findEmployeeById(selfID);

        if (found == null)
            return null;

        Employee employee;

        if (new String(found.getRole()).equals("admin")) {
            employee = findEmployeeById(userID);
            employee.setActive(true);
            return employeeDao.update(employee);
        } else
            return null;
    }

    public Employee setInactiveByAdmin(long selfID, long userID) {
        Employee found = findEmployeeById(selfID);

        if (found == null)
            return null;

        Employee employee;

        if (new String(found.getRole()).equals("admin")) {
            employee = findEmployeeById(userID);
            employee.setActive(false);
            return employeeDao.update(employee);
        } else
            return null;
    }

    public Employee setEmployeeRoleByAdmin(long selfID, long userID, String rolename) {
        Employee found = findEmployeeById(selfID);

        if (found == null)
            return null;

        Employee employee;

        if (new String(found.getRole()).equals("admin")) {
            employee = findEmployeeById(userID);
            employee.setRole(rolename);
            return employeeDao.update(employee);
        } else
            return null;
    }

    public Employee setEmployeeEmail(long userID, String email) {
        Employee found = findEmployeeById(userID);

        if (found == null)
            return null;

       found.setEmail(email);
       return employeeDao.update(found);
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