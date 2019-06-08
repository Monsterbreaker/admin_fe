/*
* @Author: Rosen
* @Date:   2017-04-05 11:07:34
* @Last Modified by:   Rosen
* @Last Modified time: 2017-04-05 17:47:33
*/

'use strict';

import MMUtile from 'util/mm.jsx';

const _mm = new MMUtile();

export default class Order{
    // 获取订单列表
    getUserList(listParam){
        if(listParam.listType == 'list'){
            if(listParam.searchType == 'customerName') {
                return _mm.request({
                    url     : _mm.getServerUrl('/admin/user/customer.do'),
                    data    : {
                        pageNum : listParam.pageNum || 1,
                        username : '%'
                    }
                });
            }else {
                return _mm.request({
                    url     : _mm.getServerUrl('/admin/user/seller.do'),
                    data    : {
                        pageNum : listParam.pageNum || 1,
                        username : '%'
                    }
                });
            }
        }
        else if(listParam.listType == 'search'){
            if(listParam.searchType == 'customerName') {
                return _mm.request({
                    url     : _mm.getServerUrl('/admin/user/customer.do'),
                    data    : listParam
                });
            }else {
                return _mm.request({
                    url     : _mm.getServerUrl('/admin/user/seller.do'),
                    data    : listParam
                });
            }
        } 
    }
    // 改变用户状态
    setUserStatus(userId, status){
        if(status == 1) {
            return _mm.request({
                url     : _mm.getServerUrl('/admin/user/freeze'),
                data    : {
                    userId      : userId,
                },
                method  : 'POST'
            });
        }else {
            return _mm.request({
                url     : _mm.getServerUrl('/admin/user/thaw'),
                data    : {
                    userId      : userId,
                },
                method  : 'POST'
            });
        }
        
    }
}