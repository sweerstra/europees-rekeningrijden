package service;

import com.mysql.cj.core.util.StringUtils;
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
        String trackerId = entity.getTrackerId();
        if (StringUtils.isNullOrEmpty(trackerId)) return null;

        Owner owner = entity.getOwner();
        Vehicle vehicle = entity.getVehicle();

        owner = owner != null && owner.getId() != 0
                ? ownerDao.findById(owner.getId())
                : null;

        vehicle = vehicle != null && vehicle.getId() != 0
                ? vehicleDao.findById(vehicle.getId())
                : null;

        Date now = new Timestamp(System.currentTimeMillis());
        Ownership ownership = new Ownership(trackerId, owner, vehicle, now, null);

        return ownershipDao.create(ownership);
    }

    public Ownership updateOwnership(Ownership entity) {
        Ownership original = ownershipDao.findById(entity.getId());
        if (original == null) return null;

        Vehicle newVehicle = entity.getVehicle();
        Owner newOwner = entity.getOwner();

        Vehicle originalVehicle = original.getVehicle();
        Owner originalOwner = original.getOwner();

        if ((originalVehicle == newVehicle || originalVehicle.equals(newVehicle))
                && (originalOwner == newOwner || originalOwner.equals(newOwner))) {
            return null;
        }

        Date now = new Timestamp(System.currentTimeMillis());
        original.setEndDate(now);
        ownershipDao.update(original);

        return addOwnership(new Ownership(entity.getTrackerId(), newOwner, newVehicle, now, null));
    }

    public Ownership closeOwnership(long id) {
        Ownership original = ownershipDao.findById(id);
        if (original == null) return null;

        Date now = new Timestamp(System.currentTimeMillis());
        original.setEndDate(now);
        return ownershipDao.update(original);
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

    public List<Ownership> getOwnershipsByTrackerId(String trackerId) {
        return ownershipDao.findByTrackerId(trackerId);
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

    public Ownership getLatestOwnership(long vehicleId) {
        List<Ownership> ownerships = ownershipDao.findByVehicle(vehicleId);
        Collections.sort(ownerships);
        return ownerships.get(ownerships.size() - 1);
    }
}
