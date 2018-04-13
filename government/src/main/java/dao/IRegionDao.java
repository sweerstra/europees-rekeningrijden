package dao;

import domain.Region;

import java.util.List;

public interface IRegionDao {
    Region findById(long id);

    Region findByName(String name);

    Region create(Region entity);

    Region update(Region entity);

    List<Region> findAll();

    void delete(Region entity);
}
