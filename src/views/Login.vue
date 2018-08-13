<template>
    <el-form :model="loginForm" :rules="loginRules" ref="loginForm" v-if="loginstate" label-position="left" label-width="0px" class="demo-ruleForm login-container">
        <h3 class="title">管理员登录</h3>
        <el-form-item prop="account">
            <el-input type="text" v-model="loginForm.account" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="loginCheckPass">
            <el-input type="password" v-model="loginForm.checkPass" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
        <el-form-item style="width:100%;">
            <el-button type="primary" style="width:100%;" @click.native.prevent="signin" :loading="logining">登录</el-button>
        </el-form-item>
        <el-form-item style="width:100%;">
            <el-button style="width:100%;" @click.native.prevent="goRegister">注册</el-button>
        </el-form-item>
    </el-form>
    <el-form :model="registerForm" v-else :rules="registerRules" ref="registerForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
        <a class="el-icon-back gologin" href="#" @click="goLogin"></a>
        <h3 class="title">注册</h3>
        <el-form-item prop="rnickname">
            <el-input type="text" v-model="registerForm.rnickname" auto-complete="off" placeholder="昵称"></el-input>
        </el-form-item>
        <el-form-item prop="raccount">
            <el-input type="text" v-model="registerForm.raccount" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="rcheckPass">
            <el-input type="password" v-model="registerForm.rcheckPass" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item style="width:100%;">
            <el-button type="primary" style="width:100%;" @click.native.prevent="register" :loading="logining">注册</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { requestLogin, requestRegister } from '../api/api';
//import NProgress from 'nprogress'
export default {
    data() {
        return {
            loginstate: true,
            logining: false,
            loginForm: {
                account: '',
                checkPass: ''
            },
            registerForm: {
                rnickname: '',
                raccount: '',
                rcheckPass: ''
            },
            loginRules: {
                account: [
                    { required: true, message: '请输入账号', trigger: 'blur' },
                    //{ validator: validaePass }
                ],
                checkPass: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    //{ validator: validaePass2 }
                ]
            },
            registerRules: {
                rnickname : [
                    { required: true, message: '请输入昵称', trigger: 'blur' },
                    //{ validator: validaePass }
                ],
                raccount: [
                    { required: true, message: '请输入账号', trigger: 'blur' },
                    //{ validator: validaePass }
                ],
                rcheckPass: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    //{ validator: validaePass2 }
                ]
            },
            checked: true
        };
    },
    methods: {
        handleReset2() {
            this.$refs.loginForm.resetFields();
        },
        signin(ev) {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    this.logining = true;
                    var username = this.loginForm.account,
                        Password = this.loginForm.checkPass;
                    requestLogin().then(data => {
                        this.logining = false;
                        let state = data.filter((item,index) => {
                            return item.username === username && item.Password === Password
                        })
                        if( state[0] ) {
                            sessionStorage.setItem('user', JSON.stringify(state[0]));
                            this.$router.push({ path: '/timeline' });
                        }else {
                            this.$message({
                                message: '账号或密码错误',
                                type: 'error'
                            });
                        }
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        goLogin() {
            this.loginstate = true;
        },
        goRegister() {
            this.loginstate = false;
        },
        register() {
            this.$refs.registerForm.validate((valid) => {
                if (valid) {
                    var registerParams = { 
                        username: this.registerForm.raccount, 
                        password: this.registerForm.rcheckPass, 
                        nickname: this.registerForm.rnickname 
                    };
                    requestLogin().then(data => {
                        let state = data.filter(item => {
                            return item.username === registerParams.username
                        })
                        if( state[0] ) {
                            this.$message({
                                message: '账号已注册',
                                type: 'error'
                            });
                        }else {
                            requestRegister(registerParams).then(data => {
                                this.logining = false;
                                if(data.affectedRows) {
                                    this.$message({
                                        message: '注册成功！',
                                        type: 'success'
                                    });
                                    this.goLogin()
                                }
                            });
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }
}

</script>

<style lang="scss" scoped>
.login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    position: relative;
    .gologin {
        position: absolute;
        top: 20px;
        left: 20px;
        color: #000;
        text-decoration: none;
        padding-left: 5px;;
    }
    .title {
        margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
    }
    .remember {
        margin: 0px 0px 35px 0px;
    }
}
</style>