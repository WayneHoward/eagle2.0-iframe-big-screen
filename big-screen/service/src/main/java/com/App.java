package com;

import com.dfsoft.config.xsssql.config.XssHttpServletRequestWrapper;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 * @author 魏翔
 * @version 1.0.0
 * @ClassName com.App.java
 * @Description TODO
 * @createTime 2021年10月09日 11:29:00
 */
@SpringBootApplication
@MapperScan("com.dfsoft.mapper")
public class App {

    public static void main(String[] args) {

        ApplicationContext applicationContext = SpringApplication.run(App.class, args);
        //将XSS和sql过滤工具添加入spring上下文
        XssHttpServletRequestWrapper.setApplicationContext(applicationContext);

    }
}
