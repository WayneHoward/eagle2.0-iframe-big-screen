package com.dfsoft.config.xsssql.config;

import cn.hutool.extra.spring.SpringUtil;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;

/**
 * @author: 魏翔
 * @date: 2021/6/18 17:05
 * @description:
 */
@Slf4j
public class JsonHtmlXssDeserializer extends JsonDeserializer<String> {


    /**
     * 对入参的json进行转义
     */
        public JsonHtmlXssDeserializer(Class<String> string) {
            super();
        }
        @Override
        public Class<String> handledType() {
            return String.class;
        }
        @Override
        public String deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException, JsonProcessingException {
            String value = jsonParser.getValueAsString();
            if (value != null) {
                ParamCleanUtils paramCleanUtils = SpringUtil.getBean(ParamCleanUtils.class);
                log.warn("路径{}，json请求{}正在过滤", paramCleanUtils.getCurrentUrl(),value);
                return paramCleanUtils.cleanXSS(paramCleanUtils.cleanSqlKeyWords(value.toString()));
            }
            return value;
        }
}
