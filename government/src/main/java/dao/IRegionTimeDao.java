package dao;

import domain.Ownership;
import domain.Region;
import domain.RegionTime;

import java.util.List;

public interface IRegionTimeDao {

    RegionTime findById(long id);

    RegionTime create(RegionTime entity);

    List<RegionTime> findAll();

    void delete(RegionTime entity);
}
