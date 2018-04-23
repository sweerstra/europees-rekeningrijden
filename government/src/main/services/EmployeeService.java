package main.services;


import main.dao.IEmployeeDao;
import main.domain.Employee;

import javax.ejb.Stateless;
import javax.inject.Inject;
import java.util.UUID;

@Stateless
public class EmployeeService {

    @Inject
    private IEmployeeDao employeeDao;

    public EmployeeService()
    {
        super();
    }

    public Employee addEmployee(Employee employee)
    {
        return employeeDao.create(employee);
    }

    public Employee authenthicate(String email, String password)
    {
        Employee loadedUser = employeeDao.getEmployeeByEmail(email);
        if (loadedUser == null) return null;
        if (loadedUser.getPassword() == password) return loadedUser;
        else
            return null;
    }

    public void deleteEmployee(Employee employee)
    {
         employeeDao.delete(employee);
    }

    public Employee updateEmployee(Employee employee)
    {
       return employeeDao.update(employee);
    }
    public Employee findEmployeeById(Long iD)
    {
        return employeeDao.findById(iD);
    }

}
