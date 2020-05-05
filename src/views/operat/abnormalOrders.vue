<template>
  <div class="app-charts">
    <el-form inline size="small">
      <el-form-item label="用户名">
        <el-input v-model="listQuery.name" placeholder="请输入用户名"/>
      </el-form-item>
      <el-form-item label="下单日期">
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
        <el-button type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="20">
      <el-col :span="8">
        <p>出错订单数</p>
        <h3>¥382043.88/¥382043.88</h3>
      </el-col>
      <el-col :span="8">
        <p>出错金额</p>
        <h3>¥326432.03/¥326432.03</h3>
      </el-col>
      <el-col :span="8">
        <p>应退金额/实退金额</p>
        <h3>85.44%/85.44%</h3>
      </el-col>
    </el-row>

    <div>
      <h3>订单异常趋势 2019-12-04 ~ 2019-12-06</h3>
      <ve-histogram :settings="chartSettings" :data="chartData2"/>
    </div>

    <div>
      <h3>客户异常排行榜 2019-12-04 ~ 2019-12-06</h3>
      <ve-line :data="chartData"/>
    </div>

    <div>
      <h3>明细:176</h3>
      <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" stripe>
        <el-table-column align="center" min-width="100" label="订单编号" prop="orderSn"/>
        <el-table-column align="center" label="手机号" prop="mobile"/>
        <el-table-column align="center" label="订单金额" prop="orderPrice"/>
        <el-table-column align="center" label="支付金额" prop="actualPrice"/>
        <el-table-column align="center" label="下单时间" prop="addTime"/>
        <el-table-column align="center" label="支付时间" prop="payTime"/>
        <el-table-column align="center" label="配送日期" prop="deliveryDateStr"/>
        <el-table-column align="center" label="配送时间段" prop="deliveryTime"/>
      </el-table>

      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
                  @pagination="getList"/>
    </div>

  </div>
</template>

<script>
  import VeLine from 'v-charts/lib/line'
  import Pagination from '@/components/Pagination'
  import VeHistogram from 'v-charts/lib/histogram'

  export default {
    components: { VeLine, VeHistogram, Pagination },
    data() {
      this.chartSettings = {
        dimension: ['日期'],
        metrics: ['访问用户', '下单用户']
      }
      return {
        listQuery: {
          startTime: '',
          endTime: '',
          name: ''
        },
        chartData: {
          columns: ['日期', '访问用户', '下单用户', '下单率'],
          rows: [
            { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
            { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
            { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
            { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
            { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
            { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
          ]
        },
        chartData2: {
          columns: ['日期', '访问用户', '下单用户', '下单率'],
          rows: [
            { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
            { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
            { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
            { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
            { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
            { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
          ]
        },
        listLoading: true,
        list: [],
        total:0,
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = false
      },

      handleFilter() {
        this.getList()
      }
    }

  }
</script>
