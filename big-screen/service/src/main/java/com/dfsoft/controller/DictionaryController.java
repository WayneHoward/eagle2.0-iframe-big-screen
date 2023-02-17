package com.dfsoft.controller;

import com.dfsoft.entity.Dictionary;
import com.dfsoft.service.IDictionaryService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author weixiang
 * @since 2022-01-18
 */
@RestController
@RequestMapping("/dictionary")
@Api(value = "字典管理", tags = {"字典管理"})
public class DictionaryController {

    @Autowired
    private IDictionaryService iDictionaryService;
    /**
     * 获取字典信息列表
     *
     * @return OutputResult
     */
    @GetMapping("List")
    @ApiOperation(value = "获取校友信息列表", httpMethod = "GET")
    public List<Dictionary> listDictionary() {
        return iDictionaryService.list();
    }
}
