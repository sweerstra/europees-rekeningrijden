package dao;

import domain.DefaultRate;


public interface IDefaultRateDao {

    DefaultRate findById(long id);

    DefaultRate create(DefaultRate entity);

    void delete(DefaultRate entity);

    DefaultRate update(DefaultRate entity);
}
