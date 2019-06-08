/*
* @Author: Rosen
* @Date:   2016-11-06 12:39:33
* @Last Modified by:   Rosen
* @Last Modified time: 2017-02-15 21:14:25
*/
'use strict';
import React        from 'react';
import ReactDOM     from 'react-dom';

import PageTitle    from 'component/page-title/index.jsx';
import MMUtile      from 'util/mm.jsx';
import Order        from 'service/order.jsx';

const _mm           = new MMUtile();
const _order        = new Order();

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/line';

const Home = React.createClass({
    getInitialState() {
        return {
        };
    },
    componentDidMount: function(){
        _order.turnoverWeek().then(res => {
            this.turnover(res,'week','周营业额');
        }, errMsg => {
            _mm.errorTips(errMsg);
        });
        _order.turnoverMonth().then(res=>{
            this.turnover(res,'month','月营业额')
        },errMsg => {
            _mm.errorTips(errMsg);
        });
    },
    turnover(res,type,name){
        var turnoverItem=res.turnoverItemVoList;
        var date =[];
        var data=[]
        for (var i = 0; i <res.days; i++) {
            date.push(turnoverItem[i].date);
            data.push(turnoverItem[i].turnover);
        }
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById(type));
        // 绘制图表
        myChart.setOption({
            title:{
                text:name,
                show: true
            },
            backgroundColor: '#FBFBFB',
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['营业额']
            },
            calculable : true,
            xAxis : [
                {
                    axisLabel:{
                        rotate: 30,
                        interval:0
                    },
                    axisLine:{
                        lineStyle :{
                            color: '#CECECE'
                        }
                    },
                    type : 'category',
                    boundaryGap : false,
                    data : date
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    axisLine:{
                        lineStyle :{
                            color: '#CECECE'
                        }
                    }
                }
            ],
            series: [
                {
                    name:name,
                    type:'line',
                    itemStyle : { normal: {label : {show: true}}},
                    color:['#66AEDE'],
                    data: data
                }
            ]
        });
    },
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle pageTitle="周营业额"/>
                <div className="row">
                <div id="week" style={{ width: 600, height: 400 }}></div>
                </div>
                <PageTitle pageTitle="月营业额"/>
                <div className="row">
                <div id="month" style={{ width: 1000, height: 400 }}></div>
                </div>
            </div>
        );
    }
});

export default Home;
