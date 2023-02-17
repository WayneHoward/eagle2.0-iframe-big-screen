package com.dfsoft.config.xsssql.config;

import cn.hutool.core.util.StrUtil;

/**
 * @author 魏翔
 */
public class FilterUtil {

    /**
     * 判断是否为白名单
     * @param whiteList
     * @param url
     * @return
     */
    public static boolean isWhite(String whiteList, String url) {
        //如果配置文件为空，则没有白名单
        if(StrUtil.isBlank(whiteList)){
            return false;
        }
        String[] white = whiteList.split(",");
        for (int i = 0; i < white.length; i++) {
            if (url.startsWith(white[i])) {
                return true;
            }
        }
        return false;
    }
}
