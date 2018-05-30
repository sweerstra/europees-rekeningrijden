package dao;

import domain.User;

import java.util.List;

public interface IUserDao {

    User findById(long id);

    List<User> findAll();

    User create(User entity);

    void delete(User entity);

    User update(User entity);
}
