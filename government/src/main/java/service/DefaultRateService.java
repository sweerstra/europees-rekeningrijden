package service;

import dao.IDefaultRateDao;
import dao.IOwnerDao;
import domain.DefaultRate;
import domain.Owner;
import org.glassfish.jersey.jackson.internal.jackson.jaxrs.json.annotation.JSONP;

import javax.inject.Inject;
import java.util.List;

public class DefaultRateService {

    @Inject
    private IDefaultRateDao dao;

    public DefaultRateService() {
        super();
    }

    public DefaultRate create(DefaultRate entity) {
        return dao.create(entity);
    }


}
