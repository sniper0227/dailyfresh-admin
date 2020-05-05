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
      <el-table-column align="center" label="是否新用户" prop="newUser">
        <template slot-scope="scope">
          <el-tag size="mini">{{ newUserDic[scope.row.newUser] }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="是否成功" prop="status">
        <template slot-scope="scope">
          <el-tag size="mini">{{ statusDic[scope.row.status] }}</el-tag>
        </template>
      </el-table-column>
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
    name: 'usersPromotionDetail',
    components: { Pagination },
    data() {
      return {
        list: [
          {
            userId: undefined,
            name: '张三',
            nickname: '昵称',
            newUser: '1',
            status: '0',
            time: '2019-10-01 12:00:00'
          }
        ],
        listLoading: true,
        newUserDic: ['是', '否'],
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
