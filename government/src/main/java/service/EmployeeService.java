package service;

import dao.IEmployeeDao;
import domain.Employee;

import javax.ejb.Stateless;
import javax.inject.Inject;

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

    public Employee setEmployeeRole(long selfID, long userID, String rolename) {
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