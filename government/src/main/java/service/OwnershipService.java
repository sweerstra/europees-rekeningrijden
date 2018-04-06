package service;

import dao.IOwnerDao;
import dao.IOwnershipDao;
import dao.IVehicleDao;
import domain.Owner;
import domain.Ownership;
import domain.Vehicle;

import javax.ejb.Stateless;
import javax.inject.Inject;
import java.util.Date;
import java.util.List;

@Stateless
public class OwnershipService {
    @Inject
    private IOwnershipDao ownershipDao;

    @Inject
    private IOwnerDao ownerDao;

    @Inject
    private IVehicleDao vehicleDao;

    public OwnershipService() {
        super();
    }

    public Ownership getById(long id) {
        return ownershipDao.findById(id);
    }

    public Ownership addOwnership(Ownership entity) {
        Owner owner = entity.getOwner();
        Vehicle vehicle = entity.getVehicle();

        if (owner == null || vehicle == null) return null;

        Owner foundOwner = ownerDao.findById(owner.getId());
        Vehicle foundVehicle = vehicleDao.findById(vehicle.getId());

        if (foundOwner == null || foundVehicle == null) return null;

        Ownership ownership = new Ownership(foundOwner, foundVehicle, new Date(), null);

        return ownershipDao.create(ownership);
    }

    public List<Ownership> getAllOwnerships() {
        return ownershipDao.findAll();
    }

    public List<Ownership> getLatestOwnerships() {
        return ownershipDao.findLatest();
    }

    public List<Ownership> getOwnershipsByOwner(long id) {
        return ownershipDao.findByOwner(id);
    }
}
