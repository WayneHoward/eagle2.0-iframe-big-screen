package com.dfsoft.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.dfsoft.entity.Alumnus;
import com.dfsoft.mapper.AlumnusMapper;
import com.dfsoft.service.IAlumnusService;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author weixiang
 * @since 2022-01-18
 */
@Service
public class AlumnusServiceImpl extends ServiceImpl<AlumnusMapper, Alumnus> implements IAlumnusService {

}
