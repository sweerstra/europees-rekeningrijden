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

    public Employee authenthicate(String email, String password) {
        Employee loadedUser = employeeDao.getEmployeeByEmail(email);
        if (loadedUser == null) return null;
        if (loadedUser.getPassword().equals(password)) return loadedUser;
        else
            return null;
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