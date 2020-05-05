import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'el-icon-c-scale-to-original', noCache: true }
      }
    ]
  }
]

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/user',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'userManage',
    meta: {
      title: '用户管理',
      icon: 'el-icon-user'
    },
    children: [
      {
        path: 'user',
        component: () => import('@/views/user/user'),
        name: 'user',
        meta: {
          perms: ['GET /admin/user/list'],
          title: '会员管理',
          noCache: true
        }
      },
      {
        path: 'address',
        component: () => import('@/views/user/address'),
        name: 'address',
        meta: {
          perms: ['GET /admin/address/list'],
          title: '收货地址',
          noCache: true
        }
      },
      {
        path: 'collect',
        component: () => import('@/views/user/collect'),
        name: 'collect',
        meta: {
          perms: ['GET /admin/collect/list'],
          title: '会员收藏',
          noCache: true
        }
      },
      {
        path: 'footprint',
        component: () => import('@/views/user/footprint'),
        name: 'footprint',
        meta: {
          perms: ['GET /admin/footprint/list'],
          title: '会员足迹',
          noCache: true
        }
      },
      {
        path: 'history',
        component: () => import('@/views/user/history'),
        name: 'history',
        meta: {
          perms: ['GET /admin/history/list'],
          title: '搜索历史',
          noCache: true
        }
      },
      {
        path: 'feedback',
        component: () => import('@/views/user/feedback'),
        name: 'feedback',
        meta: {
          perms: ['GET /admin/feedback/list'],
          title: '意见反馈',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/goods',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'goodsManage',
    meta: {
      title: '商品管理',
      icon: 'el-icon-present'
    },
    children: [
      {
        path: 'category',
        component: () => import('@/views/mall/category'),
        name: 'category',
        meta: {
          perms: [
            'GET /admin/category/list',
            'POST /admin/category/create',
            'GET /admin/category/read',
            'POST /admin/category/update',
            'POST /admin/category/delete'],
          title: '商品类目',
          noCache: true
        }
      },
      {
        path: 'list',
        component: () => import('@/views/goods/list'),
        name: 'goodsList',
        meta: {
          perms: ['GET /admin/goods/list', 'POST /admin/goods/delete'],
          title: '商品列表',
          noCache: true
        }
      },
      {
        path: 'list',
        component: () => import('@/views/goods/list'),
        name: 'goodsList',
        meta: {
          perms: ['GET /admin/goods/list', 'POST /admin/goods/delete'],
          title: '套餐列表',
          noCache: true
        }
      },
      {
        path: 'create',
        component: () => import('@/views/goods/create'),
        name: 'goodsCreate',
        meta: {
          perms: ['POST /admin/goods/create'],
          title: '商品上架',
          noCache: true
        },
        hidden: true
      },
      {
        path: 'edit',
        component: () => import('@/views/goods/edit'),
        name: 'goodsEdit',
        meta: {
          perms: ['GET /admin/goods/detail', 'POST /admin/goods/update', 'POST /admin/goods/catAndBrand'],
          title: '商品编辑',
          noCache: true
        },
        hidden: true
      },
      {
        path: 'comment',
        component: () => import('@/views/goods/comment'),
        name: 'goodsComment',
        meta: {
          perms: ['GET /admin/comment/list', 'POST /admin/comment/delete'],
          title: '商品评论',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'orderManage',
    meta: {
      title: '订单管理',
      icon: 'el-icon-shopping-bag-2'
    },
    children: [
      {
        path: 'order',
        component: () => import('@/views/mall/order'),
        name: 'order',
        meta: {
          perms: [
            'GET /admin/order/list',
            'GET /admin/order/detail',
            'POST /admin/order/ordership',
            'POST /admin/order/orderrefund',
            'POST /admin/order/orderreply'],
          title: '订单管理',
          noCache: true
        }
      },
      {
        path: 'list',
        component: () => import('@/views/shopping/list'),
        name: 'shoppingList',
        meta: {
          title: '购物车列表',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/promotion',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'promotionManage',
    meta: {
      title: '采购管理',
      icon: 'el-icon-connection'
    },
    children: [
      {
        path: 'ad',
        component: () => import('@/views/promotion/ad'),
        name: 'ad',
        meta: {
          perms: [
            'GET /admin/ad/list',
            'POST /admin/ad/create',
            'GET /admin/ad/read',
            'POST /admin/ad/update',
            'POST /admin/ad/delete'],
          title: '采购订单',
          noCache: true
        }
      },
      {
        path: 'coupon',
        component: () => import('@/views/promotion/coupon'),
        name: 'coupon',
        meta: {
          perms: [
            'GET /admin/coupon/list',
            'POST /admin/coupon/create',
            'POST /admin/coupon/update',
            'POST /admin/coupon/delete'],
          title: '采购入库',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/promotion',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'promotionManage',
    meta: {
      title: '库房管理',
      icon: 'el-icon-connection'
    },
    children: [
      {
        path: 'ad',
        component: () => import('@/views/promotion/ad'),
        name: 'ad',
        meta: {
          perms: [
            'GET /admin/ad/list',
            'POST /admin/ad/create',
            'GET /admin/ad/read',
            'POST /admin/ad/update',
            'POST /admin/ad/delete'],
          title: '商品分拣',
          noCache: true
        }
      },
      {
        path: 'coupon',
        component: () => import('@/views/promotion/coupon'),
        name: 'coupon',
        meta: {
          perms: [
            'GET /admin/coupon/list',
            'POST /admin/coupon/create',
            'POST /admin/coupon/update',
            'POST /admin/coupon/delete'],
          title: '客户分拣',
          noCache: true
        }
      },
      {
        path: 'coupon',
        component: () => import('@/views/promotion/coupon'),
        name: 'coupon',
        meta: {
          perms: [
            'GET /admin/coupon/list',
            'POST /admin/coupon/create',
            'POST /admin/coupon/update',
            'POST /admin/coupon/delete'],
          title: '发货出库',
          noCache: true
        }
      },
      {
        path: 'coupon',
        component: () => import('@/views/promotion/coupon'),
        name: 'coupon',
        meta: {
          perms: [
            'GET /admin/coupon/list',
            'POST /admin/coupon/create',
            'POST /admin/coupon/update',
            'POST /admin/coupon/delete'],
          title: '入库管理',
          noCache: true
        }
      },
      {
        path: 'coupon',
        component: () => import('@/views/promotion/coupon'),
        name: 'coupon',
        meta: {
          perms: [
            'GET /admin/coupon/list',
            'POST /admin/coupon/create',
            'POST /admin/coupon/update',
            'POST /admin/coupon/delete'],
          title: '出库管理',
          noCache: true
        }
      },
      {
        path: 'coupon',
        component: () => import('@/views/promotion/coupon'),
        name: 'coupon',
        meta: {
          perms: [
            'GET /admin/coupon/list',
            'POST /admin/coupon/create',
            'POST /admin/coupon/update',
            'POST /admin/coupon/delete'],
          title: '库存盘点',
          noCache: true
        }
      },
      {
        path: 'coupon',
        component: () => import('@/views/promotion/coupon'),
        name: 'coupon',
        meta: {
          perms: [
            'GET /admin/coupon/list',
            'POST /admin/coupon/create',
            'POST /admin/coupon/update',
            'POST /admin/coupon/delete'],
          title: '报损报溢',
          noCache: true
        }
      },
      {
        path: 'coupon',
        component: () => import('@/views/promotion/coupon'),
        name: 'coupon',
        meta: {
          perms: [
            'GET /admin/coupon/list',
            'POST /admin/coupon/create',
            'POST /admin/coupon/update',
            'POST /admin/coupon/delete'],
          title: '商品调拨',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/promotion',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'promotionManage',
    meta: {
      title: '配送管理',
      icon: 'el-icon-connection'
    },
    children: [
      {
        path: 'ad',
        component: () => import('@/views/promotion/ad'),
        name: 'ad',
        meta: {
          perms: [
            'GET /admin/ad/list',
            'POST /admin/ad/create',
            'GET /admin/ad/read',
            'POST /admin/ad/update',
            'POST /admin/ad/delete'],
          title: '线路',
          noCache: true
        }
      },
      {
        path: 'coupon',
        component: () => import('@/views/promotion/coupon'),
        name: 'coupon',
        meta: {
          perms: [
            'GET /admin/coupon/list',
            'POST /admin/coupon/create',
            'POST /admin/coupon/update',
            'POST /admin/coupon/delete'],
          title: '物流排线',
          noCache: true
        }
      },
      {
        path: 'couponDetail',
        component: () => import('@/views/promotion/couponDetail'),
        name: 'couponDetail',
        meta: {
          title: '区域',
          noCache: true
        },
        hidden: true
      },
      {
        path: 'couponDetail',
        component: () => import('@/views/promotion/couponDetail'),
        name: 'couponDetail',
        meta: {
          title: '司机',
          noCache: true
        },
        hidden: true
      },
      {
        path: 'couponDetail',
        component: () => import('@/views/promotion/couponDetail'),
        name: 'couponDetail',
        meta: {
          title: '配送地图',
          noCache: true
        },
        hidden: true
      }
    ]
  },
  {
    path: '/promotion',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'promotionManage',
    meta: {
      title: '财务管理',
      icon: 'el-icon-connection'
    },
    children: [
      {
        path: 'ad',
        component: () => import('@/views/promotion/ad'),
        name: 'ad',
        meta: {
          perms: [
            'GET /admin/ad/list',
            'POST /admin/ad/create',
            'GET /admin/ad/read',
            'POST /admin/ad/update',
            'POST /admin/ad/delete'],
          title: '财务管理',
          noCache: true
        }
      },
      {
        path: 'coupon',
        component: () => import('@/views/promotion/coupon'),
        name: 'coupon',
        meta: {
          perms: [
            'GET /admin/coupon/list',
            'POST /admin/coupon/create',
            'POST /admin/coupon/update',
            'POST /admin/coupon/delete'],
          title: '财务流水',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/promotion',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'promotionManage',
    meta: {
      title: '促销管理',
      icon: 'el-icon-connection'
    },
    children: [
      {
        path: 'ad',
        component: () => import('@/views/promotion/ad'),
        name: 'ad',
        meta: {
          perms: [
            'GET /admin/ad/list',
            'POST /admin/ad/create',
            'GET /admin/ad/read',
            'POST /admin/ad/update',
            'POST /admin/ad/delete'],
          title: '广告管理',
          noCache: true
        }
      },
      {
        path: 'coupon',
        component: () => import('@/views/promotion/coupon'),
        name: 'coupon',
        meta: {
          perms: [
            'GET /admin/coupon/list',
            'POST /admin/coupon/create',
            'POST /admin/coupon/update',
            'POST /admin/coupon/delete'],
          title: '优惠券管理',
          noCache: true
        }
      },
      {
        path: 'couponDetail',
        component: () => import('@/views/promotion/couponDetail'),
        name: 'couponDetail',
        meta: {
          title: '优惠券管理详情',
          noCache: true
        },
        hidden: true
      }
    ]
  },
  {
    path: '/mall',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'mallManage',
    meta: {
      title: '基础管理',
      icon: 'el-icon-set-up'
    },
    children: [
      // 采用LBS，不需要维护
      // {
      //   path: 'region',
      //   component: () => import('@/views/mall/region'),
      //   name: 'region',
      //   meta: {
      //     title: '行政区域',
      //     noCache: true
      //   }
      // },

      {
        path: 'issue',
        component: () => import('@/views/mall/issue'),
        name: 'issue',
        meta: {
          perms: [
            'GET /admin/issue/list',
            'POST /admin/issue/create',
            'GET /admin/issue/read',
            'POST /admin/issue/update',
            'POST /admin/issue/delete'],
          title: '通用问题',
          noCache: true
        }
      },
      {
        path: 'keyword',
        component: () => import('@/views/mall/keyword'),
        name: 'keyword',
        meta: {
          perms: [
            'GET /admin/keyword/list',
            'POST /admin/keyword/create',
            'GET /admin/keyword/read',
            'POST /admin/keyword/update',
            'POST /admin/keyword/delete'],
          title: '关键词',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/sys',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'sysManage',
    meta: {
      title: '系统管理',
      icon: 'el-icon-cpu'
    },
    children: [
      {
        path: 'admin',
        component: () => import('@/views/sys/admin'),
        name: 'admin',
        meta: {
          perms: [
            'GET /admin/admin/list',
            'POST /admin/admin/create',
            'POST /admin/admin/update',
            'POST /admin/admin/delete'],
          title: '管理员',
          noCache: true
        }
      },
      {
        path: 'log',
        component: () => import('@/views/sys/log'),
        name: 'log',
        meta: {
          perms: ['GET /admin/log/list'],
          title: '操作日志',
          noCache: true
        }
      },
      {
        path: 'role',
        component: () => import('@/views/sys/role'),
        name: 'role',
        meta: {
          perms: [
            'GET /admin/role/list',
            'POST /admin/role/create',
            'POST /admin/role/update',
            'POST /admin/role/delete',
            'GET /admin/role/permissions',
            'POST /admin/role/permissions'],
          title: '角色管理',
          noCache: true
        }
      },
      {
        path: 'os',
        component: () => import('@/views/sys/os'),
        name: 'os',
        meta: {
          perms: [
            'GET /admin/storage/list',
            'POST /admin/storage/create',
            'POST /admin/storage/update',
            'POST /admin/storage/delete'],
          title: '对象存储',
          noCache: true
        }
      },
      {
        path: 'sql',
        component: () => import('@/views/sys/sql'),
        name: 'sql',
        meta: {
          title: '数据库监控',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/config',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'configManage',
    meta: {
      title: '配置管理',
      icon: 'el-icon-open'
    },
    children: [
      {
        path: 'mall',
        component: () => import('@/views/config/mall'),
        name: 'configMall',
        meta: {
          perms: ['GET /admin/config/mall', 'POST /admin/config/mall'],
          title: '基础配置',
          noCache: true
        }
      },
      {
        path: 'express',
        component: () => import('@/views/config/express'),
        name: 'configExpress',
        meta: {
          perms: ['GET /admin/config/express', 'POST /admin/config/express'],
          title: '运费配置',
          noCache: true
        }
      },
      {
        path: 'order',
        component: () => import('@/views/config/order'),
        name: 'configOrder',
        meta: {
          perms: ['GET /admin/config/order', 'POST /admin/config/order'],
          title: '订单配置',
          noCache: true
        }
      },
      {
        path: 'wx',
        component: () => import('@/views/config/wx'),
        name: 'configWx',
        meta: {
          perms: ['GET /admin/config/wx', 'POST /admin/config/wx'],
          title: '小程序配置',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/stat',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'statManage',
    meta: {
      title: '统计报表',
      icon: 'el-icon-pie-chart'
    },
    children: [
      {
        path: 'user',
        component: () => import('@/views/stat/user'),
        name: 'statUser',
        meta: {
          perms: ['GET /admin/stat/user'],
          title: '用户统计',
          noCache: true
        }
      },
      {
        path: 'order',
        component: () => import('@/views/stat/order'),
        name: 'statOrder',
        meta: {
          perms: ['GET /admin/stat/order'],
          title: '订单统计',
          noCache: true
        }
      },
      {
        path: 'goods',
        component: () => import('@/views/stat/goods'),
        name: 'statGoods',
        meta: {
          perms: ['GET /admin/stat/goods'],
          title: '商品统计',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/label',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'labelManagement',
    meta: {
      title: '标签管理',
      icon: 'el-icon-discount'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/label/list'),
        name: 'list',
        meta: {
          title: '标签列表',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/operat',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'operationsManagement',
    meta: {
      title: '运营管理',
      icon: 'el-icon-data-analysis'
    },
    children: [
      {
        path: 'orderAnalysis',
        component: () => import('@/views/operat/orderAnalysis'),
        name: 'orderAnalysis',
        meta: {
          title: '订单分析',
          noCache: true
        }
      },
      {
        path: 'productAnalysis',
        component: () => import('@/views/operat/productAnalysis'),
        name: 'productAnalysis',
        meta: {
          title: '商品分析',
          noCache: true
        }
      },
      {
        path: 'abnormalOrders',
        component: () => import('@/views/operat/abnormalOrders'),
        name: 'abnormalOrders',
        meta: {
          title: '异常分析',
          noCache: true
        }
      },
      {
        path: 'exceptionDetails',
        component: () => import('@/views/operat/exceptionDetails'),
        name: 'exceptionDetails',
        meta: {
          title: '异常明细',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/dataAnalysis',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'dataAnalysis',
    meta: {
      title: '数据分析KPI',
      icon: 'el-icon-files'
    },
    children: [
      {
        path: 'usersPromotion',
        component: () => import('@/views/dataAnalysis/usersPromotion'),
        name: 'usersPromotion',
        meta: {
          title: '用户推广KPI',
          noCache: true
        }
      },
      {
        path: 'usersPromotionDetail',
        component: () => import('@/views/dataAnalysis/usersPromotionDetail'),
        name: 'usersPromotionDetail',
        meta: {
          title: '用户推广明细',
          noCache: true
        },
        hidden: true
      },
      {
        path: 'productsPromotion',
        component: () => import('@/views/dataAnalysis/productsPromotion'),
        name: 'productsPromotion',
        meta: {
          title: '商品推广KPI',
          noCache: true
        }
      },
      {
        path: 'goodsPromotionDetail',
        component: () => import('@/views/dataAnalysis/goodsPromotionDetail'),
        name: 'goodsPromotionDetail',
        meta: {
          title: '商品推广明细',
          noCache: true
        },
        hidden: true
      },
      {
        path: 'commoditySales',
        component: () => import('@/views/dataAnalysis/commoditySales'),
        name: 'commoditySales',
        meta: {
          title: '商品销售KPI',
          noCache: true
        }
      },
      {
        path: 'goodsSalesSubsidiary',
        component: () => import('@/views/dataAnalysis/goodsSalesSubsidiary'),
        name: 'goodsSalesSubsidiary',
        meta: {
          title: '商品销售明细',
          noCache: true
        },
        hidden: true
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    children: [
      {
        path: 'password',
        component: () => import('@/views/profile/password'),
        name: 'password',
        meta: { title: '修改密码', noCache: true }
      }
    ],
    hidden: true
  },

  { path: '*', redirect: '/404', hidden: true }
]
