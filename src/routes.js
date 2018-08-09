import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Timeline from './views/timeline/index.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/timeline',
        component: Home,
        name: '时间轴',
        iconCls: 'el-icon-time',//图标样式class
        children: [
            { path: '/timeline', component: Timeline, name: 'Timeline' }
        ]
    },
    
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;