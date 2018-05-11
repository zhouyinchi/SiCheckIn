package my.ssm.controller;

import my.ssm.entity.Users;
import my.ssm.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by Weit on 2017/11/6.
 */
@Controller
@RequestMapping("/view")
public class UserViewController {
    @Autowired
    UserService userService;

   @RequestMapping("/user")
   public String test(){
       System.out.println("test");
       return "/users/showUsers";
   }
   @RequestMapping("/adduser")
   public  String addUser()
   {
       System.out.println("add");
       return "/users/addUser";
   }
}
