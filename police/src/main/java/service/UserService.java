package service;

import dao.IUserDao;
import domain.User;

import javax.ejb.Stateless;
import javax.inject.Inject;

@Stateless
public class UserService {

    @Inject
    private IUserDao userDao;

    public UserService() {
        super();
    }

    public User addEmployee(User user) {
        return userDao.create(user);
    }

    public void deleteUser(User user) {
        userDao.delete(user);
    }

    public User updateUser(User user) {
        return userDao.update(user);
    }

    public User findUser(Long id) {
        return userDao.findById(id);
    }
}
