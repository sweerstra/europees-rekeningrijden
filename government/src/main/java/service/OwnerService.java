package service;

import dao.IOwnerDao;
import domain.Owner;

import javax.ejb.Stateless;
import javax.inject.Inject;
import java.util.List;

@Stateless
public class OwnerService {
    @Inject
    private IOwnerDao dao;

    public OwnerService() {
        super();
    }

    public Owner getById(long id) {
        return dao.findById(id);
    }

    public Owner create(Owner entity) {
        return dao.create(entity);
    }

    public List<Owner> getAllOwners() {
        return dao.findAll();
    }
}
