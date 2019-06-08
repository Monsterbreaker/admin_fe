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
    getOrderList(listParam){
        if(listParam.listType == 'list'){
            return _mm.request({
                url     : _mm.getServerUrl('/manage/order/list.do'),
                data    : {
                    pageNum : listParam.pageNum || 1
                }
            });
        }
        else if(listParam.listType == 'search'){
            return _mm.request({
                url     : _mm.getServerUrl('/manage/order/search.do'),
                data    : listParam
            });
        } 
    }
    // 获取订单详情
    getOrderDetail(orderNo){
        return _mm.request({
            url     : _mm.getServerUrl('/manage/order/detail.do'),
            data    : {
                orderNo : orderNo || 0
            }
        });
    }
    // 发货
    sendGoods(orderNo){
        return _mm.request({
            url     : _mm.getServerUrl('/manage/order/send_goods.do'),
            data    : {
                orderNo : orderNo || 0
            }
        });
    }
    // 周成交量
    turnoverWeek(){
        return _mm.request({
            url     : _mm.getServerUrl('/admin/order/turnover/week.do'),
            method:'GET',
        });
    }
    // 月成交量
    turnoverMonth(){
        return _mm.request({
            url     : _mm.getServerUrl('/admin/order/turnover/month.do'),
            method:'GET',
        });
    }
}