package com.homework.hrace;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class Resolver {
    @RequestMapping("/")
    public String index() {
        return "index.html";
    }
}
