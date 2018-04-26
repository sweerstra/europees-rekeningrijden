package service;

import dao.IOwnerDao;
import dao.IOwnershipDao;
import dao.IVehicleDao;
import domain.Owner;
import domain.Ownership;
import domain.Vehicle;

import javax.ejb.Stateless;
import javax.inject.Inject;
import java.sql.Timestamp;
import java.util.Collections;
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

        if (owner != null && owner.getId() != 0) {
            owner = ownerDao.findById(owner.getId());
        } else {
            owner = null;
        }

        if (vehicle != null && vehicle.getId() != 0) {
            vehicle = vehicleDao.findById(vehicle.getId());
        } else {
            vehicle = null;
        }

        Date now = new Timestamp(System.currentTimeMillis());
        Ownership ownership = new Ownership(entity.getTrackerId(), owner, vehicle, now, null);

        return ownershipDao.create(ownership);
    }

    public Ownership updateOwnership(Ownership entity) {
        Ownership original = ownershipDao.findById(entity.getId());
        if (original == null) return null;

        Vehicle newVehicle = entity.getVehicle();
        Owner newOwner = entity.getOwner();

        Vehicle originalVehicle = original.getVehicle();
        Owner originalOwner = original.getOwner();

        Date now = new Timestamp(System.currentTimeMillis());
        original.setEndDate(now);

        // update old
        ownershipDao.update(original);

        Ownership newOwnership = new Ownership();
        newOwnership.setStartDate(now);

        if (!originalVehicle.equals(newVehicle) || !originalOwner.equals(newOwner)) {
            newOwnership.setVehicle(newVehicle);
            newOwnership.setOwner(newOwner);

            // create new
            ownershipDao.create(newOwnership);
        }

        return null;
    }

    public Ownership create(Ownership entity) {
        return ownershipDao.create(entity);
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

    public List<Ownership> getOwnershipsByVehicleOrTrackerId(long vehicleId, String trackerId) {
        // if ownership does not have vehicle, use latest vehicle ID
        if (vehicleId == 0) {
            List<Ownership> ownerships = ownershipDao.findByTrackerId(trackerId);

            // we want the last ownership that has a vehicle, so sort by start date
            Collections.sort(ownerships);
            Collections.reverse(ownerships);

            for (Ownership ownership : ownerships) {
                Vehicle vehicle = ownership.getVehicle();

                if (vehicle != null) {
                    vehicleId = vehicle.getId();
                    break;
                }
            }
        }

        return ownershipDao.findByVehicle(vehicleId);
    }

    public Ownership getLatestOwnership(long id) {
        List<Ownership> latests = ownershipDao.findByVehicle(id);
        Collections.sort(latests);
        return latests.get(latests.size() - 1);
    }
}
