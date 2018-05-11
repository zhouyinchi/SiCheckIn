package my.ssm.controller.data;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.fasterxml.jackson.databind.util.JSONPObject;
import jdk.nashorn.api.scripting.JSObject;
import my.ssm.entity.Users;
import my.ssm.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.UUID;

/**
 * Created by Weit on 2017/11/7.
 */
@Controller
@RequestMapping("/data/User")
public class usersDataController {
    @Autowired
    UserService userService;
    @RequestMapping("/getUser")
    @ResponseBody
    public Users getUser(@RequestParam("userId") String userId){
        Users users=new Users();
        users=userService.getUser(userId);
        return users;
    }
    @RequestMapping("/deleteUser")
    @ResponseBody
    public JSONObject delUser(@RequestParam("userId") String userId){
        Users users=new Users();
        users=userService.getUser(userId);
        boolean result=userService.delete(users);
        JSONObject object=new JSONObject();
        object.put("result",result);
        object.put("msg",result?"删除成功":"删除失败");
        return object;
    }
    @RequestMapping("/getAllUser")
    @ResponseBody
    public JSONObject getAll(){
        JSONObject jsonObject=new JSONObject();
        List<Users> users=userService.getAllUsers();
        jsonObject.put("total",users!=null?users.size():0);
        jsonObject.put("rows",users);
        return jsonObject;
    }

    @RequestMapping("/getUUID")
    @ResponseBody
    public  String getUUID(){
        return UUID.randomUUID().toString();
    }

    @RequestMapping("/saveUser")
    @ResponseBody
    public  JSONObject saveUser(@RequestBody JSONObject request){
        System.out.println("saveUser");
        JSONObject object=new JSONObject();
        String json= JSON.toJSONString(request);
        Users user= JSONObject.parseObject(json,Users.class);
        Users temp=userService.getUser(user.getUserid());
        if(temp==null){
            // add
            boolean result=userService.add(user);
            object.put("result",result);
            object.put("msg",result?"保存成功":"保存失败");
        }
        else {
            // update
            boolean result=userService.update(user);
            object.put("result",result);
            object.put("msg",result?"更新成功":"更新失败");
        }
        return object;
    }
}
