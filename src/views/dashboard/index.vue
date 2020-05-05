<template>
  <div class="app-home">
    <div>
      <h2>运营简报</h2>
      <el-row :gutter="20" class="count">
        <el-col :span="6">
          <div>
            <h3>用户数量</h3>
            <count-to :start-val="0" :end-val="userTotal" :duration="2600"/>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <h3>商品数量</h3>
            <count-to :start-val="0" :end-val="goodsTotal" :duration="3000"/>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <h3>货品数量</h3>
            <count-to :start-val="0" :end-val="productTotal" :duration="3200"/>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <h3>订单数量</h3>
            <count-to :start-val="0" :end-val="orderTotal" :duration="3600"/>
          </div>
        </el-col>
      </el-row>
    </div>

    <div>
      <el-row :gutter="20">
        <el-col :span="16">
          <h2>销售额趋势</h2>
          <ve-line :data="chartData"/>
        </el-col>
        <el-col :span="8">
          <h2>待处理单据</h2>
          <ul>
            <li>
              <span>待分拣订单</span>
              <em>198笔</em>
            </li>
            <li>
              <span>分拣中订单</span>
              <em>198笔</em>
            </li>
            <li>
              <span>未支付订单</span>
              <em>198笔</em>
            </li>
            <li>
              <span>待支付借款单</span>
              <em>198笔</em>
            </li>
          </ul>
        </el-col>
      </el-row>
    </div>

    <div>
      <el-row :gutter="20">
        <el-col :span="12">
          <h2>分类统计</h2>
          <ve-pie :data="chartData2"></ve-pie>
        </el-col>
        <el-col :span="12">
          <h2>商户销量分布</h2>
          <ve-pie :data="chartData2" :settings="chartSettings"></ve-pie>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import { info } from '@/api/dashboard'
  import VeLine from 'v-charts/lib/line'
  import VePie from 'v-charts/lib/pie'
  import CountTo from 'vue-count-to'

  export default {
    components: {
      CountTo,
      VeLine,
      VePie
    },
    data() {
      this.chartSettings = {
        roseType: 'radius'
      }
      return {
        userTotal: 0,
        goodsTotal: 0,
        productTotal: 0,
        orderTotal: 0,
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
          columns: ['日期', '访问用户'],
          rows: [
            { '日期': '1/1', '访问用户': 1393 },
            { '日期': '1/2', '访问用户': 3530 },
            { '日期': '1/3', '访问用户': 2923 },
            { '日期': '1/4', '访问用户': 1723 },
            { '日期': '1/5', '访问用户': 3792 },
            { '日期': '1/6', '访问用户': 4593 }
          ]
        }
      }
    },
    created() {
      info().then(response => {
        this.userTotal = response.data.data.userTotal
        this.goodsTotal = response.data.data.goodsTotal
        this.productTotal = response.data.data.productTotal
        this.orderTotal = response.data.data.orderTotal
      })
    },
    methods: {
      handleSetLineChartData(type) {
        this.$emit('handleSetLineChartData', type)
      }
    }
  }
</script>
