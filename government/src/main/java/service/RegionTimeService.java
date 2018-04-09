package service;

import dao.IInvoiceDao;
import dao.IRegionTimeDao;
import domain.Invoice;
import domain.RegionTime;

import javax.ejb.Stateless;
import javax.inject.Inject;
import java.util.List;

@Stateless
public class RegionTimeService {

    @Inject
    private IRegionTimeDao dao;

    public RegionTimeService()
    {
        super();
    }


    public RegionTime create(RegionTime entity) {
        if (dao.findById(entity.getId()) == null) {
            return dao.create(entity);
        }
        return null;
    }

    public List<RegionTime> findAll() {
        return dao.findAll();
    }

}
