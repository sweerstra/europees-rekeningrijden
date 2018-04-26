package service;

import dao.IEmissionDao;
import dao.IEmployeeDao;
import dao.IRegionDao;
import domain.EmissionCategory;
import domain.Employee;
import domain.Invoice;
import domain.Region;

import javax.ejb.Stateless;
import javax.inject.Inject;
import java.util.List;

@Stateless
public class EmissionService {

    @Inject
    private IEmissionDao dao;

    public EmissionService() {
        super();
    }

    public EmissionCategory create(EmissionCategory entity) {
        if (dao.findById(entity.getId()) == null) {
            return dao.create(entity);
        }
        return null;
    }

    public List<EmissionCategory> findAll() {
        return dao.findAll();
    }

    public void deleteEmission(EmissionCategory emissionCategory) {
        dao.delete(emissionCategory);
    }

    public EmissionCategory updateEmission(EmissionCategory emissionCategory) {
        return dao.update(emissionCategory);
    }

    public EmissionCategory findEmissionById(Long iD) {
        return dao.findById(iD);
    }
}
