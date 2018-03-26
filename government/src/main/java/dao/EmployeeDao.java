package dao;

import Domain.Employee;
import Domain.Invoice;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Stateless
public class EmployeeDao extends DaoFacade<Employee> implements IEmployeeDao{
    @PersistenceContext(unitName = "GovernmentPU")
    private EntityManager em;

    public EmployeeDao() {
        super(Employee.class);
    }

}
