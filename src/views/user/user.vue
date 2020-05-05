<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <el-form inline size="small">
      <el-form-item label="用户名">
        <el-input v-model="listQuery.username" clearable placeholder="请输入用户名"/>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="listQuery.mobile" clearable placeholder="请输入手机号"/>
      </el-form-item>
      <el-form-item label="标签">
        <el-select v-model="labelSelect" multiple placeholder="请选择标签">
          <el-option v-for="item in labelOptions" :key="item.labelId" :label="item.labelName" :value="item.labelId"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain icon="el-icon-search" @click="handleFilter">查找</el-button>
        <el-button :loading="downloadLoading" type="primary" icon="el-icon-download" @click="handleDownload">导出
        </el-button>
      </el-form-item>
    </el-form>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" stripe>
      <el-table-column align="center" label="用户名" prop="username"/>
      <el-table-column align="center" label="手机号码" prop="mobile"/>
      <el-table-column align="center" label="性别" prop="gender">
        <template slot-scope="scope">
          <el-tag>{{ genderDic[scope.row.gender] }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="生日" prop="birthday"/>
      <el-table-column align="center" label="用户等级" prop="userLevel">
        <template slot-scope="scope">
          <el-tag>{{ levelDic[scope.row.userLevel] }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态" prop="status">
        <template slot-scope="scope">
          <el-tag>{{ statusDic[scope.row.status] }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="推送" width="500px">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="labelBind(scope.row)">标签绑定</el-button>
          <el-button type="info" size="mini" disabled>短信推送</el-button>
          <el-button type="info" size="mini" disabled>公众号推送</el-button>
          <el-button type="info" size="mini" disabled>小程序推送</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
                @pagination="getList"/>

    <!-- 添加或修改对话框 -->
    <el-dialog title="绑定标签" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="dataForm" status-icon label-width="100px">
        <el-form-item label="选择标签">
          <el-checkbox-group v-model="dataForm.labelIds">
            <el-checkbox :label="item.labelId" v-for="item in this.dataForm.labelList" :key="item.labelId">
              {{item.labelName}}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="updateData">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { fetchList, labelBindSave, labelBindList } from '@/api/user'
  import { labelList } from '@/api/label'
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

  export default {
    name: 'User',
    components: { Pagination },
    data() {
      return {
        list: null,
        total: 0,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20,
          username: undefined,
          mobile: undefined,
          labelIds: '',
          sort: 'add_time',
          order: 'desc'
        },
        labelSelect: [],
        labelOptions: [],
        downloadLoading: false,
        genderDic: ['未知', '男', '女'],
        levelDic: ['普通用户', 'VIP用户', '高级VIP用户'],
        statusDic: ['可用', '禁用', '注销'],
        dataForm: {
          userId: undefined,
          labelIds: [],
          labelList: []
        },
        dialogFormVisible: false,
        dialogStatus: ''
      }
    },
    created() {
      this.getList()

      //标签
      let data = {
        page: 1,
        limit: 100
      }
      labelList(data).then(response => {
        this.labelOptions = response.data.data.list
      })
    },
    methods: {
      getList() {
        this.listLoading = true
        this.listQuery.labelIds = this.labelSelect.join(',')
        fetchList(this.listQuery).then(response => {
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
      handleDownload() {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['用户名', '手机号码', '性别', '生日', '状态']
          const filterVal = ['username', 'mobile', 'gender', 'birthday', 'status']
          excel.export_json_to_excel2(tHeader, this.list, filterVal, '用户信息')
          this.downloadLoading = false
        })
      },

      labelBind(row) {
        this.dialogFormVisible = true
        this.dataForm.userId = row.id

        let query = {
          userId: row.id
        }
        labelBindList(query).then(response => {
          if (response.data.data) {
            response.data.data.forEach(item => {
              this.dataForm.labelIds.push(item.labelId)
            })
          }
        })

        let data = {
          page: 1,
          limit: 100
        }
        labelList(data).then(response => {
          this.dataForm.labelList = response.data.data.list
        })
      },

      //用户标签绑定模态框 - 确定
      updateData() {
        if (this.dataForm.labelIds.length === 0) {
          this.$message.error('最少绑定一个标签')
          return false
        }
        let data = {
          userId: this.dataForm.userId,
          labelIds: this.dataForm.labelIds
        }
        labelBindSave(data).then(() => {
          this.getList()
          this.dialogFormVisible = false
          this.$notify.success({
            title: '成功',
            message: '绑定成功'
          })
        }).catch(response => {
          this.$notify.error({
            title: '失败',
            message: response.data.errmsg
          })
        })
      }
    }
  }
</script>
