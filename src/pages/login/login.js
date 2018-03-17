var wepy = require('wepy');
var Api = require('../../utils/api');

Page({
    formSubmit: function (e) {
        var username = e.detail.value.username;
        var password = e.detail.value.password;
        console.log(username,password);
        if(username.lenth === 0 || password.length === 0) {
            wx.showToast({
                title: '请输入完整',
                image: '../../images/icon/error.png'
            })
        }
        else {
            wx.request({
                url: Api.Login(),
                method: 'POST',
                data: {
                    username: username,
                    password: password
                },
                dataType: 'json',
                header: {  
                    'content-type': 'application/x-www-form-urlencoded'
                },
                fail: function (res) {
                    console.log(res);
                },
                success: function (res) {
                    console.log('登录信息', res);
                    var msg = res.msg;
                    var code = res.code;
                    if (code == '200') {
                        wx.showToast({
                            title: msg,
                            icon: 'success',
                        })
                        wx.switchTab({
                            url: '../index/index ',
                        })
                    }
                    else {
                        wx.showToast({
                            title: msg,
                            image: '../../images/icon/error.png',
                        })
                    }

                }
            })
        }
    },
    
    //修改密码
    modify: function () {
        wx.navigateTo({
            url: 'modify/modify',
        })
    },

    //注册账号
    register: function () {
        wx.navigateTo({
            url: 'register/register',
        })
    }
})