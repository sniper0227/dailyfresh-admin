<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <el-form inline size="small">
      <el-form-item label="商品名称">
        <el-input v-model="listQuery.name" clearable placeholder="请输入商品名称"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain icon="el-icon-search" @click="handleFilter">查找</el-button>
      </el-form-item>
    </el-form>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" stripe>
      <el-table-column align="center" label="商品名称" prop="name"/>
      <el-table-column align="center" label="所属门店" prop="subordinateToStores"/>
      <el-table-column align="center" label="库存容量" prop="inventoryCapacity"/>
      <el-table-column align="center" label="销售总量" prop="totalSales"/>
      <el-table-column align="center" label="日均销售量" prop="averageDailySales"/>
      <el-table-column align="center" label="销售率" prop="sales"/>
      <el-table-column align="center" label="管理">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleDetail(scope.row)">购买记录</el-button>
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
    name: 'commoditySales',
    components: { Pagination },
    data() {
      return {
        list: [
          {
            name: '苹果',
            subordinateToStores: '光谷',
            inventoryCapacity: '100',
            totalSales: '200',
            averageDailySales: '150',
            sales: '0.05'
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
        this.$router.push({ path: '/dataAnalysis/goodsSalesSubsidiary', query: { id: row.id } })
      },
    }
  }
</script>
