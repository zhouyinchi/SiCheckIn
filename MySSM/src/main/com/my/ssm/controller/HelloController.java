package my.ssm.controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by Weit on 2017/11/8.
 */
@Controller
@RequestMapping("/hello")
public class HelloController {
    @RequestMapping("/my")
    public ModelAndView goodBye(ModelAndView mv){
        mv.addObject("msg","Hello Spring MVC");
        mv.setViewName("my");
        return mv;
    }
    @RequestMapping("/myparm")
    public ModelAndView myparm(ModelAndView mv,@RequestParam("userId") String userId)
    {
        mv.addObject("msg",userId);
        mv.setViewName("my");
        return mv;
    }
    @RequestMapping("/myparm/{guid}")
    public ModelAndView myparm1(ModelAndView mv,@PathVariable("guid") String guid)
    {
        mv.addObject("msg",guid);
        mv.setViewName("my");
        return mv;
    }
}
