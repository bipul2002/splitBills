package com.splitbill.backend.service.serviceImpl;

import com.splitbill.backend.model.Group;
import com.splitbill.backend.model.User;
import com.splitbill.backend.repo.UserRepository;
import com.splitbill.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Override
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public Set<User> getUsers() {
        return new LinkedHashSet<>(userRepository.findAll());
    }

    @Override
    public User addUser(User tempUser) throws Exception{
        String password = "123";
        User local = this.userRepository.findByName(tempUser.getName());
        if(local!=null)
        {
            System.out.println("User already Exsist");
            throw new Exception("User already Exsist");
        }else {
           // tempUser.setUserId(UUID.randomUUID());
            tempUser.setPassword(passwordEncoder.encode(password));
            local = this.userRepository.save(tempUser);
        }

        return local;
    }

    @Override
    public void deleteUserById(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public User updateUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public Set<User> getAllUsersOfAGroup(Group group) {
        return userRepository.findByGroups(group);
    }
}
