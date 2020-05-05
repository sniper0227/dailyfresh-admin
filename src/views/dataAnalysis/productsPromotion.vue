<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <el-form inline size="small">
      <el-form-item label="员工姓名">
        <el-input v-model="listQuery.name" clearable placeholder="请输入员工姓名"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain icon="el-icon-search" @click="handleFilter">查找</el-button>
      </el-form-item>
    </el-form>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" stripe>
      <el-table-column align="center" label="员工姓名" prop="name"/>
      <el-table-column align="center" label="推广次数" prop="numberOf"/>
      <el-table-column align="center" label="推广成功次数" prop="numberSuccessful"/>
      <el-table-column align="center" label="推广无效次数" prop="invalidNumber"/>
      <el-table-column align="center" label="用户转换率" prop="conversionRate"/>
      <el-table-column align="center" label="转化销售总额" prop="sales"/>
      <el-table-column align="center" label="管理">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleDetail(scope.row)">明细记录</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
                @pagination="getList"/>
  </div>
</template>

<script>
  import { dataAnalysis } from '@/api/dataAnalysis'
  import Pagination from '@/components/Pagination'

  export default {
    name: 'productsPromotion.vue',
    components: { Pagination },
    data() {
      return {
        list: [
          {
            name: '张三',
            numberOf: '100',
            numberSuccessful: '5',
            invalidNumber: '95',
            sales:'2355',
            conversionRate: '0.05'
          }
        ],
        total: 0,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20,
          name: '',
          sort: 'add_time',
          order: 'desc'
        },
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = false
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },

      handleDetail(row) {
        this.$router.push({ path: '/dataAnalysis/goodsPromotionDetail', query: { id: row.id } })
      },
    }
  }
</script>
