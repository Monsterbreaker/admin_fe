/*
* @Author: Rosen
* @Date:   2017-02-24 10:35:19
* @Last Modified by:   Rosen
* @Last Modified time: 2017-04-09 23:43:37
*/

'use strict';
import MMUtile from 'util/mm.jsx';

const _mm = new MMUtile();

export default class Product{
    
    // 获取品类
    getCategory(parentCategoryId){
        return _mm.request({
            url     : _mm.getServerUrl('/admin/category/get_category.do'),
            data    : {
                categoryId : parentCategoryId || 0
            }
        });
    }
    // 新增品类
    saveCategory(category){
        return _mm.request({
            url     : _mm.getServerUrl('/admin/category/add.do'),
            data    : {
                parentId        : category.parentId    || 0,
                categoryName    : category.categoryName  || ''
            },
            method  : 'POST'
        });
    }
    // 更新品类名称
    updateCategoryName(category){
        return _mm.request({
            url     : _mm.getServerUrl('/admin/category/updateCategoryName.do'),
            data    : category,
            method  : 'POST'
        });
    }
}
