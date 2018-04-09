package main.dao;



import main.domain.Employee;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;



@Stateless
public class EmployeeDao extends DaoFacade<Employee> implements IEmployeeDao {
    @PersistenceContext(unitName = "governmentPU")
    private EntityManager entityManager;

    public EmployeeDao(Class<Employee> entityClass) {
        super(entityClass);
    }


    public Employee create(Employee user) {
        entityManager.persist(user);
        return user;
    }

    public Employee update(Employee employee) {

        return entityManager.merge(employee);

    }

    public Employee findById(long id) {
        return entityManager.find(Employee.class, id);
    }


    public List<Employee> findAll() {
        List<Employee> employees = entityManager.createQuery(String.format("FROM %s", Employee.class.getName()))
                .getResultList();
        return employees;
    }

    public void delete(Employee employee) {
        entityManager.remove(employee);
    }


    public Employee getEmployeeByEmail(String email) {
        try {
            Employee employee = (Employee) entityManager.createQuery("SELECT u FROM Employee u WHERE u.email = :email")
                    .setParameter("email", email)
                    .getSingleResult();
            return employee;

        } catch (Exception e) {
            return null;
        }
    }


}
