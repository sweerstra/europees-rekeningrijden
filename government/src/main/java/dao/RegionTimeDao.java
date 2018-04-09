package dao;

import domain.Owner;
import domain.RegionTime;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Stateless
public class RegionTimeDao extends DaoFacade<RegionTime> implements IRegionTimeDao{

    @PersistenceContext(name = "GovernmentPU")
    private EntityManager em;

    public RegionTimeDao()
    {
        super(RegionTime.class);
    }

}
