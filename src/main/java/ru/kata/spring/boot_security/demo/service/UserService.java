package ru.kata.spring.boot_security.demo.service;

import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;


public interface UserService {

    User identifyUser();

    List<User> findAllUsers();

    User findUserById(Long id);

    void saveUser(User user);

    void updateUser(User user, Long id);

    void deleteUser(Long id);


}
