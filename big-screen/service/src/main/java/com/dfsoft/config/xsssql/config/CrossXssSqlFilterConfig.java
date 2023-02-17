package com.dfsoft.config.xsssql.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author: 魏翔
 * @date: 2021/6/19 17:54
 * @description:
 */


@Data
@Component
@ConfigurationProperties(prefix = "xss-sql-config")
public class CrossXssSqlFilterConfig {

    /**
     * 忽略的url地址
     */
    private String ignoreURL = "";

    /**
     * 过滤的敏感字符
     */
    private List<String> sensitiveCharacter = new ArrayList<>();

    /**
     * 替换的敏感字符
     */
    private Map<String,String> replaceCharacter = new HashMap<>();
}
