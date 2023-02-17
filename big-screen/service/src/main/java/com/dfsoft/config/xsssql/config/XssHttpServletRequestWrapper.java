package com.dfsoft.config.xsssql.config;

import cn.hutool.core.io.IoUtil;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationContext;
import org.springframework.util.StreamUtils;

import javax.servlet.ReadListener;
import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

/**
 * @author: 魏翔
 * @date: 2021/6/18 09:43
 * @description: 防止sql注入, xss攻击
 * 前端可以对输入信息做预处理，后端也可以做处理。
 */
@Slf4j
public class XssHttpServletRequestWrapper extends HttpServletRequestWrapper {

    private ParamCleanUtils paramCleanUtils;

    private static ApplicationContext applicationContext;

    /**
     * 用于保存读取body中数据
     */
    private  byte[] body;

    public XssHttpServletRequestWrapper(HttpServletRequest servletRequest) {
        super(servletRequest);
        paramCleanUtils = applicationContext.getBean(ParamCleanUtils.class);
        paramCleanUtils.setCurrentUrl(servletRequest.getRequestURI());
        try{
            body = StreamUtils.copyToByteArray(servletRequest.getInputStream());
        }catch (IOException ioe){
            log.error(ioe.getMessage(),ioe);
            log.error("读取servletRequest 中的InputStream异常");
        }

    }

    public static void setApplicationContext(ApplicationContext context){
        applicationContext = context;
    }

    /**
     * 覆盖getParameter方法，将参数名和参数值都做xss过滤。
     * 如果需要获得原始的值，则通过super.getParameterValues(name)来获取
     * getParameterNames,getParameterValues和getParameterMap也可能需要覆盖
     */
    @Override
    public String getParameter(String parameter) {
        String value = super.getParameter(parameter);
        if (value == null) {
            return null;
        }
        return paramCleanUtils.cleanXSS(value);
    }

    @Override
    public String[] getParameterValues(String parameter) {
        String[] values = super.getParameterValues(parameter);
        if (values == null) {
            return null;
        }
        int count = values.length;
        String[] encodedValues = new String[count];
        for (int i = 0; i < count; i++) {
            encodedValues[i] = paramCleanUtils.cleanXSS(values[i]);
        }
        return encodedValues;
    }

    @Override
    public Map<String, String[]> getParameterMap() {
        Map<String, String[]> values = super.getParameterMap();
        if (values == null) {
            return null;
        }
        Map<String, String[]> result = new HashMap<>(16);
        for (String key : values.keySet()) {
            String encodedKey = paramCleanUtils.cleanXSS(key);
            int count = values.get(key).length;
            String[] encodedValues = new String[count];
            for (int i = 0; i < count; i++) {
                encodedValues[i] = paramCleanUtils.cleanXSS(values.get(key)[i]);
            }
            result.put(encodedKey, encodedValues);
        }
        return result;
    }

    /**
     * 覆盖getHeader方法，将参数名和参数值都做xss过滤。
     * 如果需要获得原始的值，则通过super.getHeaders(name)来获取
     * getHeaderNames 也可能需要覆盖
     */
    @Override
    public String getHeader(String name) {
        String value = super.getHeader(name);
        if (value == null) {
            return null;
        }
        return paramCleanUtils.cleanXSS(value);
    }

    /**
     * 覆盖getReader方法
     * @return
     * @throws IOException
     */
    @Override
    public BufferedReader getReader() throws IOException{

        return new BufferedReader(new InputStreamReader(getInputStream()));
    }

    /**
     * 覆盖getInputStream，如果getInputStream中有特殊字符，也会过滤
     * @return
     * @throws IOException
     */
    @Override
    public ServletInputStream getInputStream() throws IOException{
        if(body.length == 0){
            return super.getInputStream();
        }
        ByteArrayInputStream bais = new ByteArrayInputStream(body);
        String value = IoUtil.read(new BufferedReader(new InputStreamReader(bais)));
        value = paramCleanUtils.cleanXSS(value);
        System.out.println(value);
        ByteArrayInputStream valuepBais= new ByteArrayInputStream(value.getBytes());
        return new ServletInputStream() {

            @Override
            public int read() {
                return valuepBais.read();
            }

            @Override
            public boolean isFinished() {
                // TODO Auto-generated method stub
                return false;
            }

            @Override
            public boolean isReady() {
                // TODO Auto-generated method stub
                return false;
            }

            @Override
            public void setReadListener(ReadListener arg0) {
                // TODO Auto-generated method stub
            }
        };
    }

}
