package dao;

import domain.Log;

import java.util.List;

public interface ILogDao {
    Log findById(long id);

    List<Log> findAll();

    Log create(Log entity);

    void delete(Log entity);

    void deleteById(long id);
}
