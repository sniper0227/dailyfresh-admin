<template>
  <div class="app-container">
    <!-- 查询和其他操作 -->
    <el-form inline size="mini">
      <el-form-item label="用户名">
        <el-input v-model="listQuery.userName" clearable placeholder="请输入用户名"/>
      </el-form-item>
      <el-form-item label="商品名称">
        <el-input v-model="listQuery.goodsName" clearable placeholder="请输入商品名称"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain icon="el-icon-search" @click="handleFilter">查找</el-button>
        <el-button :loading="downloadLoading" type="primary" icon="el-icon-download" @click="handleDownload">导出
        </el-button>
      </el-form-item>
    </el-form>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" stripe>
      <el-table-column align="center" min-width="100px" label="用户名" prop="userName"/>
      <el-table-column align="center" min-width="100px" label="商品名称" prop="goodsName"/>
      <el-table-column align="center" min-width="100px" label="添加时间" prop="addTime"/>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
                @pagination="getList"/>
  </div>
</template>

<script>
  import { listCollect } from '@/api/user'
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

  export default {
    name: 'Collect',
    components: { Pagination },
    data() {
      return {
        list: null,
        total: 0,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20,
          userName: undefined,
          goodsName: undefined,
          sort: 'add_time',
          order: 'desc'
        },
        downloadLoading: false
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        listCollect(this.listQuery).then(response => {
          this.list = response.data.data.list
          this.total = response.data.data.total
          this.listLoading = false
        }).catch(() => {
          this.list = []
          this.total = 0
          this.listLoading = false
        })
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      resetForm() {
        this.dataForm = {
          id: undefined,
          userId: '',
          valueId: '',
          addTime: undefined
        }
      },
      handleDownload() {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['用户ID', '商品ID', '添加时间']
          const filterVal = ['userId', 'valueId', 'addTime']
          excel.export_json_to_excel2(tHeader, this.list, filterVal, '用户收藏信息')
          this.downloadLoading = false
        })
      }
    }
  }
</script>
