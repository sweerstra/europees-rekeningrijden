package dao;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

public abstract class DaoFacade<T> {

    private Class<T> entityClass;

    @PersistenceContext(unitName = "GovernmentPU")
    private EntityManager em;

    public DaoFacade(Class<T> entityClass) {
        this.entityClass = entityClass;
    }

    public T create(T entity) {
        em.persist(entity);
        return entity;
    }

    public T update(T entity) {
        return em.merge(entity);
    }

    public T findById(long id) {
        return em.find(entityClass, id);
    }

    @SuppressWarnings("unchecked")
    public List<T> findAll() {
        return em.createQuery(String.format("FROM %s", this.entityClass.getName()))
                .getResultList();
    }

    public void delete(T entity) {
        em.remove(entity);
    }

    public void deleteById(long id) {
        T entity = findById(id);

        if (entity != null) {
            delete(entity);
        }
    }
}
