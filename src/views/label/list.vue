<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <el-form inline size="small">
      <el-form-item label="标签名称">
        <el-input v-model="listQuery.labelName" clearable placeholder="请输入标签名称"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain icon="el-icon-search" @click="handleFilter">查找</el-button>
        <el-button type="primary" icon="el-icon-edit" @click="handleCreate">添加</el-button>
      </el-form-item>
    </el-form>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" stripe>
      <el-table-column align="center" label="排序" prop="labelSort"/>
      <el-table-column align="center" label="标签名称" prop="labelName"/>
      <el-table-column align="center" label="描述" prop="labelDesc"/>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
                @pagination="getList"/>

    <!-- 添加或修改对话框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="dataForm" status-icon label-width="100px">
        <el-form-item label="标签名称" prop="labelName">
          <el-input v-model="dataForm.labelName"/>
        </el-form-item>
        <el-form-item label="标签描述">
          <el-input v-model="dataForm.labelDesc"/>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="dataForm.labelSort" :min="1"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">确定</el-button>
        <el-button v-else type="primary" @click="updateData">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {labelList, createLabel, updateLabel, deleteLabel} from '@/api/label';
  import Pagination from '@/components/Pagination'; // Secondary package based on el-pagination

  export default {
    name: 'User',
    components: {Pagination},
    data() {
      return {
        list: null,
        total: 0,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20,
          labelName: undefined,
          sort: 'add_time',
          order: 'desc',
        },
        dataForm: {
          labelId: undefined,
          labelName: '',
          labelDesc: '',
          labelSort: 10,
        },
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: '编辑',
          create: '创建',
        },
        rules: {
          labelName: [{required: true, message: '标签名称不能为空', trigger: 'blur'}],
        },
      };
    },
    created() {
      this.getList();
    },
    methods: {
      //列表
      getList() {
        this.listLoading = true;
        labelList(this.listQuery).then(response => {
          this.list = response.data.data.list;
          this.total = response.data.data.total;
          this.listLoading = false;
        }).catch(() => {
          this.list = [];
          this.total = 0;
          this.listLoading = false;
        });
      },

      //搜索
      handleFilter() {
        this.listQuery.page = 1;
        this.getList();
      },

      //重置
      resetForm() {
        this.dataForm = {
          id: undefined,
          labelName: '',
          labelDesc: '',
        };
      },

      //添加
      handleCreate() {
        this.resetForm();
        this.dialogStatus = 'create';
        this.dialogFormVisible = true;
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate();
        });
      },

      //新增确认
      createData() {
        this.$refs['dataForm'].validate(valid => {
          if (valid) {
            createLabel(this.dataForm).then(response => {
              this.dialogFormVisible = false;
              this.$notify.success({
                title: '成功',
                message: '创建成功',
              });
              this.getList();
            }).catch(response => {
              this.$notify.error({
                title: '失败',
                message: response.data.errmsg,
              });
            });
          }
        });
      },

      //编辑
      handleUpdate(row) {
        this.dataForm = Object.assign({}, row);
        this.dialogStatus = 'update';
        this.dialogFormVisible = true;
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate();
        });
      },

      //修改确认
      updateData() {
        this.$refs['dataForm'].validate(valid => {
          if (valid) {
            updateLabel(this.dataForm).then(() => {
              this.getList();
              this.dialogFormVisible = false;
              this.$notify.success({
                title: '成功',
                message: '更新成功',
              });
            }).catch(response => {
              this.$notify.error({
                title: '失败',
                message: response.data.errmsg,
              });
            });
          }
        });
      },

      //删除
      handleDelete(row) {
        deleteLabel(row).then(response => {
          this.getList();
          this.$notify.success({
            title: '成功',
            message: '删除成功',
          });
        }).catch(response => {
          this.$notify.error({
            title: '失败',
            message: response.data.errmsg,
          });
        });
      },
    },
  };
</script>
