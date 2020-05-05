<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <el-form inline size="small">
      <el-form-item label="员工姓名">
        <el-input v-model="listQuery.name" clearable placeholder="请输入员工姓名"/>
      </el-form-item>
      <el-form-item label="推广时间">
        <el-date-picker
          v-model="listQuery.startTime"
          type="date"
          placeholder="开始时间"
          value-format="yyyy-MM-dd">
        </el-date-picker>
        <span> - </span>
        <el-date-picker
          v-model="listQuery.endTime"
          type="date"
          placeholder="结束时间"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain icon="el-icon-search" @click="handleFilter">查找</el-button>
      </el-form-item>
    </el-form>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" stripe>
      <el-table-column align="center" label="员工姓名" prop="name"/>
      <el-table-column align="center" label="推广用户昵称" prop="nickname"/>
      <el-table-column align="center" label="推广商品名称" prop="nameCommodity"/>
      <el-table-column align="center" label="是否购买" prop="status">
        <template slot-scope="scope">
          <el-tag size="mini">{{ statusDic[scope.row.status] }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="购买数量" prop="purchaseQuantity"/>
      <el-table-column align="center" label="消费金额" prop="consumptionAmount"/>
      <el-table-column align="center" label="推广时间" prop="time"/>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
                @pagination="getList"/>
  </div>
</template>

<script>
  import { dataAnalysis } from '@/api/dataAnalysis'
  import Pagination from '@/components/Pagination'

  export default {
    name: 'goodsPromotionDetail',
    components: { Pagination },
    data() {
      return {
        list: [
          {
            userId: undefined,
            name: '张三',
            nickname: '昵称',
            nameCommodity:'苹果',
            status: '0',
            purchaseQuantity:'52',
            consumptionAmount:'80',
            time: '2019-10-01 12:00:00'
          }
        ],
        listLoading: true,
        statusDic: ['是', '否'],
        total: 0,
        listQuery: {
          page: 1,
          limit: 20,
          name: '',
          startTime: '',
          endTime: '',
          sort: 'add_time',
          order: 'desc'
        }
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
      }
    }
  }
</script>
