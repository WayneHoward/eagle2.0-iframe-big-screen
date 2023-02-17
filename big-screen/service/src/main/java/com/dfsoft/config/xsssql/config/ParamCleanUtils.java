package com.dfsoft.config.xsssql.config;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Map;

/**
 * @author: 魏翔
 * @date: 2021/6/19 16:40
 * @description:
 */
@Slf4j
@Component
@Data
public class ParamCleanUtils {

    // private static String key = "and|exec|insert|select|delete|update|count|*|%|chr|mid|master|truncate|char|declare|;|or|-|+";
    private String replacedString = " ";
    public String currentUrl;

    @Autowired
    private CrossXssSqlFilterConfig crossXssSqlFilterConfig;


    /**
     * 将敏感字符替换
     *
     * @param valueP
     * @return
     */
    String cleanXSS(String valueP) {
        //获取敏感字段
        Map<String, String> sensitiveFields = crossXssSqlFilterConfig.getReplaceCharacter();
        // 循环从下面的html实体中删除敏感符号
        for (Map.Entry<String, String> entry : sensitiveFields.entrySet()) {
            valueP = valueP.replaceAll(entry.getKey(), entry.getValue());
        }
        valueP = cleanSqlKeyWords(valueP);
        return valueP;
    }

    /**
     * 将敏感字符过滤
     *
     * @param value
     * @return
     */
    String cleanSqlKeyWords(String value) {
        //获取过滤的字符
        List<String> notAllowedKeyWords = crossXssSqlFilterConfig.getSensitiveCharacter();
        String paramValue = value;
        for (String keyword : notAllowedKeyWords) {
            boolean flag = paramValue.length() > keyword.length() + 4
                    && (paramValue.contains(" " + keyword) || paramValue.contains(keyword + " ") || paramValue.contains(" " + keyword + " "));
            if (flag) {
                paramValue = StringUtils.replace(paramValue, keyword, replacedString);
                log.warn(currentUrl + "已被过滤，因为参数中包含不允许sql的关键词(" + keyword
                        + ")" + ";参数：" + value + ";过滤后的参数：" + paramValue);
            }
        }
        return paramValue;
    }
}
