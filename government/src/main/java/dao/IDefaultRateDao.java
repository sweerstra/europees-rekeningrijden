package dao;

import domain.DefaultRate;
import domain.EmissionCategory;

import java.util.List;


public interface IDefaultRateDao {

    DefaultRate findById(long id);

    List<DefaultRate> findAll();

    DefaultRate create(DefaultRate entity);

    void delete(DefaultRate entity);

    DefaultRate update(DefaultRate entity);
}
