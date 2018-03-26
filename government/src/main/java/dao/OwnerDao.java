package dao;

import Domain.Owner;

import javax.ejb.Stateless;
import javax.persistence.Entity;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.xml.bind.annotation.XmlRootElement;

@Stateless
public class OwnerDao extends DaoFacade<Owner> implements IOwnerDao{

    @PersistenceContext(name = "GovernmentPU")
    private EntityManager em;

    public OwnerDao() {
        super(Owner.class);
    }


}
