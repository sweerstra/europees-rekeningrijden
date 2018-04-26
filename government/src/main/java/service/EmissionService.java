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
import java.util.ArrayList;
import java.util.List;

@Stateless
public class EmissionService {

    @Inject
    private IEmissionDao dao;

    public EmissionService() {
        super();
    }

    public List<EmissionCategory> create(List<EmissionCategory> entities) {
        if(entities == null || entities.isEmpty()) return null;

        List<EmissionCategory> created = new ArrayList<>();

        for (EmissionCategory category : entities) {
            deleteEmission(category);
            created.add(dao.create(category));
        }

        return created;
    }


    public List<EmissionCategory> findAll() {
        return dao.findAll();
    }

    public void deleteEmission(EmissionCategory emissionCategory) {
        EmissionCategory original = dao.findByName(emissionCategory.getName());

        if (original == null) return;

        dao.deleteByName(original);
    }

    public EmissionCategory updateEmission(EmissionCategory emissionCategory) {
        return dao.update(emissionCategory);
    }

    public EmissionCategory findEmissionById(Long iD) {
        return dao.findById(iD);
    }
}
