package com.dfsoft.controller;


import cn.hutool.core.util.StrUtil;
import cn.hutool.poi.excel.BigExcelWriter;
import cn.hutool.poi.excel.ExcelWriter;
import com.alibaba.excel.EasyExcel;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.dfsoft.constant.MessageConstant;
import com.dfsoft.entity.Alumnus;
import com.dfsoft.entity.Dictionary;
import com.dfsoft.service.IAlumnusService;
import com.dfsoft.service.IDictionaryService;
import io.swagger.annotations.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.util.List;

/**
 * <p>
 * 前端控制器
 * </p>
 *
 * @author weixiang
 * @since 2022-01-18
 */
@RestController
@RequestMapping("/alumnus")
@Slf4j
@Api(value = "用户信息", tags = {"用户信息管理接口"})
public class AlumnusController {


    @Autowired
    private IAlumnusService iAlumnusService;

    @Autowired
    private IDictionaryService iDictionaryService;

    /**
     * 录入校友信息
     *
     * @param alumnus
     * @return OutputResult
     */
    @PostMapping(value = "")
    @ApiOperation(value = "录入校友信息", httpMethod = "POST")
    public String insertDatasource(@ApiParam(name = "校友信息", value = "传入json格式", required = true) @RequestBody Alumnus alumnus) {
        // 获取名称
        String userName = alumnus.getUserName();
        //获取手机号
        String telephone = alumnus.getTelephone();
        //获取院校
        String universities = alumnus.getUniversities();
        //非空参数判断
        if (StrUtil.isBlank(userName) || StrUtil.isBlank(telephone) || StrUtil.isBlank(universities)) {
            return MessageConstant.VERIFICATION_FAILED;
        }
        if (checkExist(userName, telephone)) {
            return MessageConstant.IS_EXIST;
        }

        //保存
        boolean save = iAlumnusService.save(alumnus);
        if (save) {
            try {
                //如果院校不为空、并且不存字典表中存在，则添加入字典表
                LambdaQueryWrapper<Dictionary> universitiesEq = new LambdaQueryWrapper<Dictionary>().eq(universities != null, Dictionary::getValue, universities).
                        eq(Dictionary::getType, 1);
                int universitiesCount = iDictionaryService.count(universitiesEq);
                //院校不在字典中存在
                if (universitiesCount == 0) {
                    iDictionaryService.save(Dictionary.builder().type(1).value(universities).build());
                }
                //获取单位
                String organization = alumnus.getOrganization();
                //如果单位不为空、并且不存字典表中存在，则添加入字典表
                if (StrUtil.isNotBlank(organization)) {

                    LambdaQueryWrapper<Dictionary> eqDictionary = new LambdaQueryWrapper<Dictionary>().eq(organization != null, Dictionary::getValue, organization).
                            eq(Dictionary::getType, 2);
                    int dictionaryCount = iDictionaryService.count(eqDictionary);
                    //单位不在字典中存在
                    if (dictionaryCount == 0) {
                        iDictionaryService.save(Dictionary.builder().type(2).value(organization).build());
                    }
                }
            } catch (Exception e) {
                log.error(e.getMessage(), e);
                log.warn("同步字典信息失败");
            }
            return MessageConstant.SUCCESS;
        }
        return MessageConstant.ERROR;
    }


    /**
     * 获取校友信息列表
     *
     * @return OutputResult
     */
    @GetMapping("List")
    @ApiOperation(value = "获取校友信息列表", httpMethod = "GET")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "condition", value = "条件", paramType = "query", dataType = "string")
    })
    public List<Alumnus> listAssembly(@RequestParam(required = false) String condition) {
        LambdaQueryWrapper<Alumnus> eq = new LambdaQueryWrapper<Alumnus>().like(condition != null, Alumnus::getUserName, condition).or().
                like(condition != null, Alumnus::getTelephone, condition).or().
                like(condition != null, Alumnus::getOrganization, condition);
        return iAlumnusService.list(eq);
    }

    /**
     * 获取校友详情
     *
     * @return OutputResult
     */
    @GetMapping("")
    @ApiOperation(value = "获取校友详情", httpMethod = "GET")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "userName", value = "姓名", paramType = "query", dataType = "string"),
            @ApiImplicitParam(name = "telephone", value = "电话", paramType = "query", dataType = "string"),
    })
    public Alumnus detailAssembly(@RequestParam String userName, @RequestParam String telephone) {
        LambdaQueryWrapper<Alumnus> eq = new LambdaQueryWrapper<Alumnus>().eq(userName != null, Alumnus::getUserName, userName).
                eq(telephone != null, Alumnus::getTelephone, telephone);
        return iAlumnusService.getOne(eq);
    }

    /**
     * 编辑校友信息
     *
     * @param alumnus
     * @return
     */
    @PutMapping()
    @ApiOperation(value = "编辑校友信息", httpMethod = "PUT")
    public String updateAssembly(@ApiParam(name = "校友信息", value = "传入json格式", required = true) @RequestBody Alumnus alumnus) {
        LambdaQueryWrapper<Alumnus> eq = new LambdaQueryWrapper<Alumnus>().eq(alumnus.getUserName() != null, Alumnus::getUserName, alumnus.getUserName()).
                eq(alumnus.getTelephone() != null, Alumnus::getTelephone, alumnus.getTelephone()).
                ne(alumnus.getId() != null, Alumnus::getId, alumnus.getId());
        int alumnusCount = iAlumnusService.count(eq);
        if (alumnusCount > 0) {
            return MessageConstant.IS_EXIST;
        }
        if (iAlumnusService.updateById(alumnus)) {
            return MessageConstant.SUCCESS;
        } else {
            return MessageConstant.ERROR;

        }

    }


    /**
     * 根据名称和手机号判断当前用户是否存在
     *
     * @param userName
     * @param telephone
     * @return
     */
    private boolean checkExist(String userName, String telephone) {
        //判断用户信息是否已经录入
        LambdaQueryWrapper<Alumnus> eq = new LambdaQueryWrapper<Alumnus>().eq(userName != null, Alumnus::getUserName, userName).
                eq(telephone != null, Alumnus::getTelephone, telephone);
        int alumnusCount = iAlumnusService.count(eq);
        //如果已经录入，返回错误信息
        if (alumnusCount > 0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 导出excel文件
     *
     * @return OutputResult
     */
    @GetMapping("export")
    @ApiOperation(value = "导出excel文件", httpMethod = "GET")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "condition", value = "条件", paramType = "query", dataType = "string"),
            @ApiImplicitParam(name = "exportFileName", value = "文件名", paramType = "query", dataType = "string")

    })
    private void export(@RequestParam(required = false) String condition,@RequestParam(required = false) String exportFileName, HttpServletResponse response) {
        try {
            LambdaQueryWrapper<Alumnus> eq = new LambdaQueryWrapper<Alumnus>().like(condition != null, Alumnus::getUserName, condition).or().
                    like(condition != null, Alumnus::getTelephone, condition).or().
                    like(condition != null, Alumnus::getOrganization, condition);
            // 打开输出流
            response.setContentType("octets/stream");
            response.addHeader("Content-Disposition", "attachment;fileName=" + new String(exportFileName.getBytes(StandardCharsets.UTF_8.name()), "iso-8859-1"));
            //response.addHeader("Content-Disposition", "attachment;filename=" + exportFileName);
            // 读取要下载的文件，保存到文件输入流
            EasyExcel.write(response.getOutputStream(), Alumnus.class).sheet("sheet").doWrite(iAlumnusService.list(eq));
        } catch (Exception e) {
            log.error(
                    "==================OrderMainController.class method = exporXls throws Exception==================",
                    e);
        }
    }
}
