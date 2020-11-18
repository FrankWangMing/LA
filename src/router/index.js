import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/Home.vue'
import Company from '../views/company/Company.vue'
import Index from '../views/Index.vue'
import News from '../views/News.vue'
import ProductCenter from '../views/ProductCenter.vue'
import EngineeringCase from '../views/EngineeringCase.vue'
import Engineering from '../views/second/Engineering.vue'
import Product from '../views/second/Product.vue'
import New from '../views/second/New.vue'
import HelloWorld from '@/components/common/HelloWorld.vue'
import Admin from '@/admin/admin'
import adminProduct from '@/admin/product/product'
import adminAddProduct from '@/admin/product/addProduct'
import adminEditProduct from '@/admin/product/editProduct'
import adminEditNew from '@/admin/news/editNews'
import adminNews from '@/admin/news/news'
import adminAddNews from '@/admin/news/addNews'
import adminEngineering from '@/admin/engineering/engineering'
import adminAddEngineering from '@/admin/engineering/addEngineering'
import adminEditEng from '@/admin/engineering/editEngineering'


import adminData from '@/admin/data'
import adminIndex from '@/admin/index/indexSet/index'
import adminChat from '@/admin/index/companySet/company'
import adminUser from '@/admin/index/userSet/user'
import adminLogin from '@/admin/login'

import cloudbase from "@cloudbase/js-sdk";
import cloudbaserc from "../../cloudbaserc.json";
import test from '@/admin/test'

const app = cloudbase.init({
  env: cloudbaserc.envId,
});

const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err);
};



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Index,
    children: [
      {
        path: '/Index',
        name: 'Home',
        component: Home
      },
      {
        path: '/Company',
        name: 'Company',
        component: Company,
      }, {
        path: '/News',
        name: 'News',
        component: News,
      }, {
        path: '/EngineeringCase',
        name: 'EngineeringCase',
        component: EngineeringCase
      },
      {
        path: '/ProductCenter',
        name: 'ProductCenter',
        component: ProductCenter
      },
      {
        path: '/New/:id',
        name: 'New',
        component: New,
        props: true
      },
      {
        path: '/EngineeringCase/:id',
        name: 'Engineering',
        component: Engineering,
        props: true
      }, {
        path: '/Product/:id',
        name: 'Product',
        component: Product,
        props: true
      }, {
        path: '/test',
        name: 'HelloWorld',
        component: HelloWorld,
        props: true
      }]
  },
  {
    path: '/admin',
    component: Admin,
    beforeEnter: (to, from, next) => {
      const auth = app.auth();
      console.log(auth.hasLoginState())
      if (auth.hasLoginState()) {
        next()
      } else {
        router.push("login")
      }
    },
    children: [
      {
        path: 'user',
        name: 'adminUser',
        component: adminUser,
        props: true
      },
      {
        path: 'index',
        name: 'adminIndex',
        component: adminIndex,
        props: true
      },
      {
        path: 'chat',
        name: 'adminChat',
        component: adminChat,
        props: true
      },
      {
        path: '',
        name: 'adminData',
        component: adminData,
        props: true
      },
      {
        path: 'product',
        name: 'adminProduct',
        component: adminProduct,
        props: true
      },
      {
        path: 'addProduct',
        name: 'adminAddProduct',
        component: adminAddProduct,
        props: true
      },
      {
        path: 'editProduct/:id',
        name: 'adminEditProduct',
        component: adminEditProduct,
        props: true
      }, {
        path: 'editNew/:id',
        name: 'adminEditNew',
        component: adminEditNew,
        props: true
      }, {
        path: 'editEng/:id',
        name: 'adminEditEng',
        component: adminEditEng,
        props: true
      },
      {
        path: 'news',
        name: 'adminNews',
        component: adminNews,
        props: true
      },
      {
        path: 'addnews',
        name: 'adminAddNews',
        component: adminAddNews,
        props: true
      },
      {
        path: 'AddEngineering',
        name: 'adminAddEngineering',
        component: adminAddEngineering,
        props: true
      },
      {
        path: 'Engineering',
        name: 'adminEngineering',
        component: adminEngineering,
        props: true
      }
    ]
  },
  {
    path: '/login',
    name: 'adminLogin',
    component: adminLogin,
    props: true
  },
  {
    path: '/testaaa',
    name: 'test',
    component: test,
    props: true
  },
  {
    path: "*",
    redirect: "/Index"
  },
]

const router = new VueRouter({
  routes,
  mode: 'history',
  scrollBehavior: function (to, from, savedPosition) {
    console.log(to)
    if (to.hash) {
      return {
        selector: to.hash
      }
    }
    console.log(from)
    console.log(savedPosition)
    return { x: 0, y: 0 }
  }
})

export default router
