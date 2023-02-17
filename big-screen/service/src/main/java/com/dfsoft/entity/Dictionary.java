package com.dfsoft.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;

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
@Builder
@TableName("dictionary")
public class Dictionary implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 主键
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /**
     * 具体值，目前有院校和单位
     */
    private String value;

    /**
     * 类型；1代表院校；2代表单位
     */
    private Integer type;


}
