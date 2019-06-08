/*
* @Author: Rosen
* @Date:   2017-02-11 19:03:18
* @Last Modified by:   Rosen
* @Last Modified time: 2017-04-05 23:22:47
*/

'use strict';
import React        from 'react';
import ReactDOM     from 'react-dom';
import { Link }     from 'react-router';

import PageTitle    from 'component/page-title/index.jsx';
import Pagination   from 'component/pagination/index.jsx';

import MMUtile      from 'util/mm.jsx';
import Order        from 'service/order.jsx';

const _mm = new MMUtile();
const _order = new Order();

// import './index.scss';

const UserList = React.createClass({
    getInitialState() {
        return {
            list            : [],
            listType        : 'list', // list / search
            searchType      : 'customerName',//customerName/sellerName
            username        : '',
            pageNum         : 1,
            pages           : 0
        };
    },
    componentDidMount(){
       this.loadUserList();
    },
    // 加载产品列表
    loadUserList(){
        let listParam       = {},
            listType        = this.state.listType,
            searchType      = this.state.searchType;

        listParam.listType  = listType;
        listParam.pageNum   = this.state.pageNum;
        listParam.searchType=searchType;
        // 按用户名搜索
        if(this.state.listType ==='search'){
            listParam.username = this.state.username;
        }
        // 查询
        _order.getUserList(listParam).then(res => {
            this.setState(res);
        }, errMsg => {
            _mm.errorTips(errMsg);
        });
    },
    // 搜索类型变化
    onSearchTypeChange(e){
        let searchType = e.target.value;
        this.setState({
            searchType : searchType
        });
    },
    // 关键词变化
    onNameChange(e){
        let username_ = e.target.value.trim();
        this.setState({
            username : username_
        });
    },
    // 搜索
    onSearch(){
        if(this.state.username){
            // setState是异步的
            this.setState({
                listType    : 'search',
                pageNum     : 1
            }, () => {
                this.loadUserList();
            });
        }else{
            // setState是异步的
            this.setState({
                listType    : 'list',
                pageNum     : 1
            }, () => {
                this.loadUserList();
            });
        }
            
    },
    // 页数变化
    onPageNumChange(pageNum){
        this.setState({
            pageNum     : pageNum
        }, () => {
            this.loadUserList();
        });
    },
    setUserStatus(userId, status){
        let currentStatus   = status,
            newStatus       = currentStatus == 0 ? 1 : 0,
            statusChangeTips= currentStatus == 0 ? '确认冻结该用户？' : '确认解冻改用户？';
        if(window.confirm(statusChangeTips)){
            _order.setUserStatus(userId, newStatus).then(res => {
                // 操作成功提示
                _mm.successTips(res.msg);
                this.loadUserList();
            }, err => {
                _mm.errorTips(err.msg);
            });
        }
    },
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle pageTitle="用户管理"/>
                <div className="row">
                    <div className="search-wrap col-md-12">
                        <div className="form-inline">
                            <div className="form-group">
                                <select className="form-control" onChange={this.onSearchTypeChange}>
                                    <option value="customerName">顾客</option>
                                    <option value="sellerName">商家</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="账户名（模糊查询）" onChange={this.onNameChange}/>
                            </div>
                            <button type="button" className="btn btn-default" onClick={this.onSearch}>查询</button>
                        </div>
                    </div>
                    <div className="table-wrap col-lg-12">
                        <table className="table table-striped table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>账号名</th>
                                    <th>账号状态</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.list.length ? this.state.list.map((user, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{user.id}</td>
                                                <td>{user.username}</td>
                                                <td>{user.status == 0 ? '正常' : '已冻结'}</td>
                                                <td>
                                                    <a className="btn btn-xs btn-warning opear" 
                                                        data-status={user.status} 
                                                        onClick={this.setUserStatus.bind(this, user.id, user.status)}>{user.status == 0 ? '冻结' : '解冻'}
                                                    </a>
                                                </td>
                                            </tr>
                                        );
                                    }) :
                                    (
                                        <tr>
                                            <td colSpan="6" className="text-center">没有找到相应结果~</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                    {
                    this.state.pages > 1 ? <Pagination onChange={this.onPageNumChange} 
                        current={this.state.pageNum} 
                        total={this.state.total} 
                        showLessItems/>: null
                    }
                </div>
            </div>
        );
    }
});

export default UserList;