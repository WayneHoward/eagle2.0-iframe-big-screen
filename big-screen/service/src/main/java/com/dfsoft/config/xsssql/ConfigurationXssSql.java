package com.dfsoft.config.xsssql;
import com.dfsoft.config.xsssql.config.CrosXssSqlFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @author : weixiang
 * @date: 2019/10/28 16:53
 * @description:
 */
@Configuration
public class ConfigurationXssSql {

    @Bean
    public FilterRegistrationBean CrossXssSqlFilter(){

        FilterRegistrationBean bean = new FilterRegistrationBean();

        bean.addUrlPatterns("/*");
        bean.setFilter(new CrosXssSqlFilter());
        return bean;
    }

}
