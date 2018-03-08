package services;

import dao.ITrackerDao;
import domain.Tracker;

import javax.ejb.Stateless;
import javax.inject.Inject;
import java.util.List;

@Stateless
public class TrackerService {

    @Inject
    private ITrackerDao trackerDao;

    public TrackerService()
    {
        super();
    }

    public Tracker create(Tracker entity){
        if(trackerDao.findById(entity.getId()) == null) {
            return trackerDao.create(entity);
        }
        return null;
    }

    public void delete(long id) {
        Tracker entity = trackerDao.findById(id);
        trackerDao.delete(entity);
    }

    public Tracker findById(long id) {
        return trackerDao.findById(id);
    }

    public List<Tracker> findAll() {
        return trackerDao.findAll();
    }

}
