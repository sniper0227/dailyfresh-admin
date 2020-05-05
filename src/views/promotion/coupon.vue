<template>
  <div class="app-container">
    <!-- 查询和其他操作 -->
    <el-form inline size="small">
      <el-form-item label="优惠券标题">
        <el-input v-model="listQuery.name" clearable placeholder="请输入优惠券标题"/>
      </el-form-item>
      <el-form-item label="优惠券类型">
        <el-select v-model="listQuery.type" clearable placeholder="请选择优惠券类型">
          <el-option v-for="type in typeOptions" :key="type.value" :label="type.label" :value="type.value"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button v-permission="['GET /admin/coupon/list']" type="primary" plain icon="el-icon-search"
                   @click="handleFilter">查找
        </el-button>
        <el-button v-permission="['POST /admin/coupon/create']" type="success" plain icon="el-icon-edit"
                   @click="handleCreate">添加
        </el-button>
        <el-button :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download"
                   @click="handleDownload">导出
        </el-button>
      </el-form-item>
    </el-form>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" stripe>
      <el-table-column align="center" label="优惠券名称" prop="name"/>
      <el-table-column align="center" label="介绍" prop="desc"/>
      <el-table-column align="center" label="标签" prop="tag"/>
      <el-table-column align="center" label="最低消费" prop="min">
        <template slot-scope="scope">满{{ scope.row.min }}元可用</template>
      </el-table-column>
      <el-table-column align="center" label="满减金额" prop="discount">
        <template slot-scope="scope">减免{{ scope.row.discount }}元</template>
      </el-table-column>
      <el-table-column align="center" label="每人限领" prop="limit">
        <template slot-scope="scope">{{ scope.row.limit != 0 ? scope.row.limit : '不限' }}</template>
      </el-table-column>
      <el-table-column align="center" label="商品使用范围" prop="goodsType">
        <template slot-scope="scope">{{ scope.row.goodsType | formatGoodsType }}</template>
      </el-table-column>
      <el-table-column align="center" label="优惠券类型" prop="type">
        <template slot-scope="scope">{{ scope.row.type | formatType }}</template>
      </el-table-column>
      <el-table-column align="center" label="优惠券数量" prop="total">
        <template slot-scope="scope">{{ scope.row.total != 0 ? scope.row.total : '不限' }}</template>
      </el-table-column>
      <el-table-column align="center" label="状态" prop="status">
        <template slot-scope="scope">{{ scope.row.status | formatStatus }}</template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="300" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-permission="['GET /admin/coupon/read']" type="primary" size="mini"
                     @click="handleDetail(scope.row)">详情
          </el-button>
          <el-button v-permission="['POST /admin/coupon/update']" type="info" size="mini"
                     @click="handleUpdate(scope.row)">编辑
          </el-button>
          <el-button v-permission="['POST /admin/coupon/delete']" type="danger" size="mini"
                     @click="handleDelete(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
                @pagination="getList"/>

    <!-- 添加或修改对话框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="dataForm" status-icon label-position="left" label-width="100px">
        <el-form-item label="优惠券名称" prop="name">
          <el-input v-model="dataForm.name"/>
        </el-form-item>
        <el-form-item label="介绍" prop="desc">
          <el-input v-model="dataForm.desc"/>
        </el-form-item>
        <el-form-item label="标签" prop="tag">
          <el-input v-model="dataForm.tag"/>
        </el-form-item>
        <el-form-item label="最低消费" prop="min">
          <el-input v-model="dataForm.min">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="满减金额" prop="discount">
          <el-input v-model="dataForm.discount">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="每人限领" prop="limit">
          <el-input v-model="dataForm.limit">
            <template slot="append">张</template>
          </el-input>
        </el-form-item>
        <el-form-item label="分发类型" prop="type">
          <el-select v-model="dataForm.type">
            <el-option
              v-for="type in typeOptions"
              :key="type.value"
              :label="type.label"
              :value="type.value"/>
          </el-select>
        </el-form-item>
        <el-form-item label="优惠券数量" prop="total">
          <el-input v-model="dataForm.total">
            <template slot="append">张</template>
          </el-input>
        </el-form-item>
        <el-form-item label="有效期">
          <el-radio-group v-model="dataForm.timeType">
            <el-radio-button :label="0">领券相对天数</el-radio-button>
            <el-radio-button :label="1">指定绝对时间</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-show="dataForm.timeType === 0">
          <el-input v-model="dataForm.days">
            <template slot="append">天</template>
          </el-input>
        </el-form-item>
        <el-form-item v-show="dataForm.timeType === 1">
          <el-col :span="11">
            <el-date-picker v-model="dataForm.startTime" type="datetime" placeholder="选择日期"
                            value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%;"/>
          </el-col>
          <el-col :span="2" style="text-align: center">至</el-col>
          <el-col :span="11">
            <el-date-picker v-model="dataForm.endTime" type="datetime" placeholder="选择日期"
                            value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%;"/>
          </el-col>
        </el-form-item>
        <el-form-item label="商品限制范围">
          <el-radio-group v-model="dataForm.goodsType">
            <el-radio-button :label="0">全场通用</el-radio-button>
            <el-radio-button :label="1">指定分类</el-radio-button>
            <el-radio-button :label="2">指定商品</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-show="dataForm.goodsType === 1">
          <el-tree
            ref="categoryTree"
            :data="categoryData"
            show-checkbox
            node-key="id"
            :default-checked-keys="dataForm.goodsValue"
            :props="defaultProps"
            @check-change="categoryChange">
          </el-tree>
        </el-form-item>
        <el-form-item v-show="dataForm.goodsType === 2">
          <div class="searchGoods">
            <el-input v-model="searchKey" clearable placeholder="请输入商品名称"></el-input>
            <ul class="goodsList" v-if="goodsData.length > 0">
              <li v-for="item in goodsData" :key="item.id" :class="item.checkd ? 'on' : ''" @click="goodsChange(item)">
                {{item.name}}
              </li>
            </ul>
          </div>

          <el-table :data="dataForm.goodsValueNames" stripe style="margin-top: 20px;min-height: 300px">
            <el-table-column align="center" label="商品名称" prop="name"></el-table-column>
            <el-table-column align="center" label="操作" width="300" class-name="small-padding fixed-width">
              <template slot-scope="scope">
                <el-button type="danger" size="mini" @click="goodsDelete(scope.row)">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus==='create'" type="primary" @click="createData">确定</el-button>
        <el-button v-else type="primary" @click="updateData">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import { listCoupon, createCoupon, updateCoupon, deleteCoupon, readCoupon } from '@/api/coupon'
  import { listCategory } from '@/api/category'
  import { listGoods } from '@/api/goods'
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

  const defaultTypeOptions = [
    {
      label: '通用领券',
      value: 0
    },
    {
      label: '注册赠券',
      value: 1
    },
    {
      label: '兑换码',
      value: 2
    }
  ]

  const defaultStatusOptions = [
    {
      label: '正常',
      value: 0
    },
    {
      label: '已过期',
      value: 1
    },
    {
      label: '已下架',
      value: 2
    }
  ]

  export default {
    name: 'Coupon',
    components: { Pagination },
    filters: {
      formatType(type) {
        for (let i = 0; i < defaultTypeOptions.length; i++) {
          if (type === defaultTypeOptions[i].value) {
            return defaultTypeOptions[i].label
          }
        }
        return ''
      },
      formatGoodsType(goodsType) {
        if (goodsType === 0) {
          return '全场通用'
        } else if (goodsType === 1) {
          return '指定分类'
        } else {
          return '指定商品'
        }
      },
      formatStatus(status) {
        if (status === 0) {
          return '正常'
        } else if (status === 1) {
          return '已过期'
        } else {
          return '已下架'
        }
      }
    },
    data() {
      return {
        typeOptions: Object.assign({}, defaultTypeOptions),
        statusOptions: Object.assign({}, defaultStatusOptions),
        list: [],
        total: 0,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20,
          name: undefined,
          type: undefined,
          status: undefined,
          sort: 'add_time',
          order: 'desc'
        },
        dataForm: {
          id: undefined,
          name: undefined,
          desc: undefined,
          tag: undefined,
          total: 0,
          discount: 0,
          min: 0,
          limit: 1,
          type: 0,
          status: 0,
          goodsType: 0,
          goodsValue: [],
          goodsValueNames: [],
          timeType: 0,
          days: 0,
          startTime: null,
          endTime: null
        },
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: '编辑',
          create: '创建'
        },
        rules: {
          name: [
            { required: true, message: '优惠券标题不能为空', trigger: 'blur' }
          ]
        },
        downloadLoading: false,
        categoryData: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        searchKey: undefined, //指定商品关键词
        goodsData: [] //根据关键词返回的商品数据
      }
    },
    created() {
      this.getList()
    },
    watch: {
      searchKey(val) {
        if (val) {
          let data = {
            page: 1,
            limit: 100,
            name: val
          }
          listGoods(data).then(res => {
            res.data.data.list.forEach(item => {
              item.checkd = false
              this.dataForm.goodsValue.forEach(val => {
                if (item.id === val) {
                  item.checkd = true
                }
              })
            })
            this.goodsData = res.data.data.list
          })
        } else {
          this.goodsData = []
        }
      },
      'dataForm.goodsType'(val_new, val_old) {
        if (val_new === 2 && val_old === 1) {
          this.dataForm.goodsValue = []
          this.searchKey = ''
          this.goodsData = []
          this.dataForm.goodsValueNames = []
        }

        if (val_new === 1 && val_old === 2) {
          this.dataForm.goodsValue = []
          this.categoryData = []
          this.getCategoryList()
        }
      }
    },
    methods: {
      //优惠券列表
      getList() {
        this.listLoading = true
        listCoupon(this.listQuery)
          .then(response => {
            this.list = response.data.data.list
            this.total = response.data.data.total
            this.listLoading = false
          })
          .catch(() => {
            this.list = []
            this.total = 0
            this.listLoading = false
          })
      },

      //商品分类
      getCategoryList() {
        listCategory().then(response => {
          this.categoryData = response.data.data.list
        })
      },

      //商品分类change
      categoryChange() {
        let arr = this.$refs.categoryTree.getCheckedNodes(true).map(item => {
          return item.id
        })
        this.dataForm.goodsValue = arr
      },

      //商品选择change
      goodsChange(val) {
        if (!val.checkd) {
          this.dataForm.goodsValue.push(val.id)
          this.dataForm.goodsValueNames.push({
            id: val.id,
            name: val.name
          })
        } else {
          this.dataForm.goodsValue.forEach((item, index) => {
            if (val.id === item) {
              this.dataForm.goodsValue.splice(index, 1)
            }
          })
          this.dataForm.goodsValueNames.forEach((item, index) => {
            if (val.id === item.id) {
              this.dataForm.goodsValueNames.splice(index, 1)
            }
          })
        }
        val.checkd = !val.checkd
      },

      //删除商品
      goodsDelete(row) {
        this.dataForm.goodsValue.forEach((item, index) => {
          if (row.id === item) {
            this.dataForm.goodsValue.splice(index, 1)
          }
        })
        this.dataForm.goodsValueNames.forEach((item, index) => {
          if (row.id === item.id) {
            this.dataForm.goodsValueNames.splice(index, 1)
          }
        })
        this.searchKey = ''
        this.goodsData = []
      },

      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },

      //重置数据
      resetForm() {
        this.dataForm = {
          id: undefined,
          name: undefined,
          desc: undefined,
          tag: undefined,
          total: 0,
          discount: 0,
          min: 0,
          limit: 1,
          type: 0,
          status: 0,
          goodsType: 0,
          goodsValue: [],
          goodsValueNames: [],
          timeType: 0,
          days: 0,
          startTime: null,
          endTime: null
        }
      },

      //新增
      handleCreate() {
        this.resetForm()
        this.getCategoryList()
        this.searchKey = ''
        this.goodsData = []
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },

      //新增 - 确认
      createData() {
        this.$refs['dataForm'].validate(valid => {
          if (valid) {
            createCoupon(this.dataForm)
              .then(response => {
                this.list.unshift(response.data.data)
                this.dialogFormVisible = false
                this.$notify.success({
                  title: '成功',
                  message: '创建优惠券成功'
                })
              })
              .catch(response => {
                this.$notify.error({
                  title: '失败',
                  message: response.data.errmsg
                })
              })
          }
        })
      },

      //编辑
      handleUpdate(row) {
        this.searchKey = undefined
        this.getCategoryList()
        readCoupon(row.id).then(res => {
          this.dataForm = Object.assign({}, res.data.data)
        })

        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          if (this.dataForm.days === 0) {
            this.dataForm.daysType = 1
          } else {
            this.dataForm.daysType = 0
          }
          this.$refs['dataForm'].clearValidate()
        })
      },

      //编辑 - 确定
      updateData() {
        this.$refs['dataForm'].validate(valid => {
          if (valid) {
            updateCoupon(this.dataForm)
              .then(() => {
                for (const v of this.list) {
                  if (v.id === this.dataForm.id) {
                    const index = this.list.indexOf(v)
                    this.list.splice(index, 1, this.dataForm)
                    break
                  }
                }
                this.dialogFormVisible = false
                this.$notify.success({
                  title: '成功',
                  message: '更新优惠券成功'
                })
              })
              .catch(response => {
                this.$notify.error({
                  title: '失败',
                  message: response.data.errmsg
                })
              })
          }
        })
      },
      handleDelete(row) {
        deleteCoupon(row)
          .then(response => {
            this.$notify.success({
              title: '成功',
              message: '删除优惠券成功'
            })
            const index = this.list.indexOf(row)
            this.list.splice(index, 1)
          })
          .catch(response => {
            this.$notify.error({
              title: '失败',
              message: response.data.errmsg
            })
          })
      },
      handleDetail(row) {
        this.$router.push({ path: '/promotion/couponDetail', query: { id: row.id } })
      },
      handleDownload() {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = [
            '优惠券ID',
            '名称',
            '内容',
            '标签',
            '最低消费',
            '减免金额',
            '每人限领',
            '优惠券数量'
          ]
          const filterVal = [
            'id',
            'name',
            'desc',
            'tag',
            'min',
            'discount',
            'limit',
            'total'
          ]
          excel.export_json_to_excel2(tHeader, this.list, filterVal, '优惠券信息')
          this.downloadLoading = false
        })
      }
    }
  }
</script>
<style lang="scss">
  .searchGoods {
    position: relative;

    .goodsList {
      margin: 0;
      padding: 10px 20px;
      list-style: none;
      display: flex;
      position: absolute;
      top: 40px;
      left: 0;
      width: 100%;
      z-index: 9;
      background: #fff;
      box-shadow: 0 0 10px rgba(0, 0, 0, .1);

      li {
        padding-left: 20px;
        margin-right: 30px;
        cursor: pointer;
        position: relative;

        &:before {
          content: "";
          position: absolute;
          left: 0;
          top: 50%;
          width: 13px;
          height: 13px;
          transform: translateY(-50%);
          border: 1px solid #ddd;
          border-radius: 3px;
        }

        &.on {
          color: #409EFF;

          &:before {
            border: 1px solid #409EFF;
            background: #409EFF;
          }
        }
      }
    }
  }
</style>
