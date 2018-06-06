package service;

import dao.IDefaultRateDao;
import domain.DefaultRate;
import domain.Region;

import javax.ejb.Stateless;
import javax.inject.Inject;
import java.util.List;


@Stateless
public class DefaultRateService {
    @Inject
    private IDefaultRateDao dao;

    public DefaultRateService() {
        super();
    }

    public DefaultRate create(DefaultRate entity) {
        return dao.create(entity);
    }

    public List<DefaultRate> findAll() {
        return dao.findAll();
    }
}
