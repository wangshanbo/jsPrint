<!-- echart bar 纵向 条形统计图 -->
<template>
  <div :id="ids" class="chart-box" :class="echartCls" :style="echartStyle" />
</template>

<script>
import echarts from 'echarts' // 引入echarts
export default {
  name: '',
  props: {
    echartStyle: {
      type: Object,
      default () {
        return {
          width: '700px',
          height: '350px'
        }
      }
    },
    echartCls: {
      type: String,
      default: ''
    },
    ids: {
      type: [String, Number],
      default: 'myChart1'
    },
    echartData: {
      type: Object,
      default () {
        return {
          yAxis: {},
          series: []
        }
      }
    }
  },
  data () {
    return {
      myChart: null,
      isInitResize: false // 是否已初始化 echart resize
    }
  },
  methods: {
    drawEchart (e, fn) {
      const { series, legend = {}, xAxis, title } = e
      let { domId = '' } = e
      domId = domId || this.ids
      // 基于准备好的dom，初始化echarts实例
      this.myChart = echarts.init(document.getElementById(domId))
      const option = {
        color: ['#81CA9D', '#8784D8'],
        title: {
          text: title + '条形统计图'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        // animation: false,
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        legend: legend,
        grid: {
          left: '0%',
          right: '0%',
          bottom: '0%',
          containLabel: true
        },
        xAxis: xAxis,
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: series
      }

      // 绘制图表
      this.myChart.setOption(option)
      this.$nextTick(() => {
        if (fn) {
          fn()
        }
        if (!this.isInitResize) {
          this.isInitResize = true
          window.addEventListener('resize', this.onResizeFn)
        }
      })
    },
    onResizeFn () {
      this.throttle(this.myChart.resize()) // 使用节流函数
    },
    /**
   * 函数节流，指定時間內只執行一次
   * @param {Funtion} fn 回调函数
   * @param {Number} interval
   */
    throttle (fn, interval = 300) {
      return function () {
      // console.log('throttle1')
        if (fn.isThrottle) return
        // console.log('throttle2')
        fn.isThrottle = true
        fn.apply(this, arguments)
        setTimeout(() => {
        // console.log('throttle3')
          fn.isThrottle = false
        // store.dispatch('sys/UpdateIsTransition', false) // 启动页面切换转场
        }, interval)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.chart-box {
  margin: 20px auto;
  width: 100%;
  > div {
    width: 100%;
  }
}
</style>
