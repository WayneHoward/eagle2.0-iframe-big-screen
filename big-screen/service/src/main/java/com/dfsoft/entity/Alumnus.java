package com.dfsoft.entity;

import com.alibaba.excel.annotation.ExcelIgnore;
import com.alibaba.excel.annotation.ExcelProperty;
import com.alibaba.excel.annotation.write.style.ColumnWidth;
import com.alibaba.excel.annotation.write.style.HeadFontStyle;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.Date;

/**
 * <p>
 *
 * </p>
 *
 * @author weixiang
 * @since 2022-01-18
 */
@Data
@EqualsAndHashCode(callSuper = false)
@TableName("alumnus")
@AllArgsConstructor
@NoArgsConstructor
@HeadFontStyle(fontHeightInPoints = 11)
public class Alumnus implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 主键
     */
    @TableId(value = "id", type = IdType.ASSIGN_ID)
    @ExcelIgnore
    private Long id;


    /**
     * 姓名
     */
    @ExcelProperty("姓名")
    private String userName;

    /**
     * 性别
     */
    @ExcelProperty("性别")
    private Integer sex;

    /**
     * 电话
     */
    @ExcelProperty("电话")
    private String telephone;

    /**
     * 生日
     */
    @ExcelProperty("生日")
    private String birthday;

    /**
     * 邮箱
     */
    @ExcelProperty("邮箱")
    private String mailbox;

    /**
     * 院校
     */
    @ExcelProperty("院校")
    private String universities;

    /**
     * 工作单位
     */
    @ExcelProperty("工作单位")
    @ColumnWidth(14)
    private String organization;

    /**
     * 个人简介
     */
    @ExcelProperty("个人简介")
    @ColumnWidth(25)
    private String introduction;


    /**
     * 微信
     */
    @ExcelProperty("微信")
    private String wechat;


}
