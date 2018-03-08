package service;

import dao.ILogDao;
import domain.Log;
import domain.Tracker;

import javax.ejb.Stateless;
import javax.inject.Inject;
import java.util.List;

@Stateless
public class LogService {

    @Inject
    private ILogDao logDao;

    public LogService()
    {
        super();
    }

    public Log create(Log entity){
        return logDao.create(entity);
    }

    public void delete(long id) {
        Log entity = logDao.findById(id);
        logDao.delete(entity);
    }

    public Log findById(long id) {
        return logDao.findById(id);
    }

    public List<Log> findAll() {
        return logDao.findAll();
    }
}
