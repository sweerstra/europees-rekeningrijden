package dao;

import domain.Region;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Stateless
public class JPARegionDao extends DaoFacade<Region> implements IRegionDao {

    @PersistenceContext(unitName = "GovernmentPU")
    private EntityManager em;

    public JPARegionDao() {
        super(Region.class);
    }

    @Override
    public Region findByName(String name) {
        try {
            return (Region) em.createQuery("SELECT r FROM Region r WHERE r.name = :name")
                    .setParameter("name", name)
                    .getSingleResult();
        } catch (Exception e) { return null; }
    }

    @Override
    public void deleteCoordinatesByRegion(Region entity) {
        em.createQuery("DELETE FROM Coordinate c WHERE c.region.id = :id")
                .setParameter("id", entity.getId())
                .executeUpdate();
    }
}
