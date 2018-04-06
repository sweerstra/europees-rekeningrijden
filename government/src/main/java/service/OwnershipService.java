package service;

import dao.IOwnershipDao;
import domain.Ownership;

import javax.ejb.Stateless;
import javax.inject.Inject;
import java.util.List;

@Stateless
public class OwnershipService {
    @Inject
    private IOwnershipDao dao;

    public OwnershipService() {
        super();
    }

    public Ownership getById(long id) {
        return dao.findById(id);
    }

    public Ownership create(Ownership entity) {
        return dao.create(entity);
    }

    public List<Ownership> getAllOwnerships() {
        return dao.findAll();
    }

    public List<Ownership> getLatestOwnerships() {
        return dao.findLatest();
    }

    public List<Ownership> getOwnershipsByOwner(long id) {
        return dao.findByOwner(id);
    }
}
