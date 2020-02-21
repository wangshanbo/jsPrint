<template>
  <div ref="printDom1" class="wrapper">
    <div class="print-btn no-print" @click="onPrint">打印打印</div>
    <div class="A4" v-for="(item, index) of list" :key="item.id">
      <div class="table-box">
        <div class="table-title">{{item.title}}</div>
        <table class="table-wrap" border="1" cellspacing="0" cellpadding="0">
          <thead>
            <tr>
              <td>序号</td>
              <td>名称</td>
              <td>单价</td>
              <td>数量</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(obj, i) of item.tableList" :key="i">
              <td>{{i+1}}</td>
              <td>{{obj.name}}</td>
              <td>{{obj.prince}}</td>
              <td>{{obj.number}}斤</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Print',
  data () {
    return {
      tableList: [
        { name: '苹果', prince: '8.5元/斤', number: '150' },
        { name: '雪梨', prince: '4.0元/斤', number: '140' },
        { name: '橘子', prince: '3.5元/斤', number: '110' },
        { name: '香蕉', prince: '1.5元/斤', number: '180' },
        { name: '荔枝', prince: '11.0元/斤', number: '210' },
        { name: '龙眼', prince: '13.2元/斤', number: '105' },
        { name: '芒果', prince: '4.5元/斤', number: '220' },
        { name: '提子', prince: '20元/斤', number: '200' },
        { name: '橙子', prince: '6.0元/斤', number: '320' },
        { name: '哈密瓜', prince: '4.0元/斤', number: '400' },
        { name: '西瓜', prince: '2.0元/斤', number: '500' },
        { name: '火龙果', prince: '1.0元/斤', number: '150' }
      ],
      echartDomArr: [],
      list: []
    }
  },
  created () {
    this.initData()
  },
  methods: {
    initData () {
      let arr = []
      for (let i = 0; i < 6; i++) {
        let obj = {
          id: Math.random(),
          title: i + 1 + '月份水果库存',
          tableList: [],
          xAxis: [],
          series: []
        }
        this.tableList.forEach(item => {
          obj.tableList.push(item)
          obj.xAxis.push(item.name)
          obj.series.push(item.number)
        })
        arr.push(obj)
      }
      this.list = arr
    },
    /**
     * 打印
     */
    onPrint () {
      this.$nextTick(() => {
        this.$print(this.$refs.printDom1, {
          styleStr: `
            .table-wrap td{text-align:center;}
            .wrapper .table-wrap thead tr{ background-color:#eee;}
          `,
          echartDomArr: this.echartDomArr,
          printDoneCallBack () {
            console.log('调用后台接口')
          },
          setDomHeightArr: [
            '.wrapper .A4',
            '.wrapper .table-box',
            '.wrapper .chart-box'
          ] // 根据渲染实际高度，自动设置dom高度
        })
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
div {
  box-sizing: border-box;
}
.flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
.no-wrap {
  word-break: keep-all; /* 不换行 */
  white-space: nowrap; /* 不换行 */
  overflow: hidden; /* 内容超出宽度时隐藏超出部分的内容 */
  text-overflow: ellipsis;
}
.no-border {
  border: none !important;
}

/* 滚动条整体部分*/
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  background: #f2f2f2;
}

/* 滚动条里面的小方块，能上下左右移动（取决于是垂直滚动条还是水平滚动条）*/
::-webkit-scrollbar-thumb {
  width: 6px;
  height: 6px;
  border-radius: 4px;
  background: #4d435a;
}

::-webkit-input-placeholder {
  color: #bdbdbd;
}

.fl {
  float: left;
}
.fr {
  float: right;
}
.clearfix:after {
  display: block;
  content: "";
  height: 0;
  line-height: 0;
  clear: both;
  visibility: hidden;
}
</style>

<style scoped lang="scss">
.wrapper {
  .print-btn {
    margin: 0 auto;
    padding: 0px 10px;
    width: 300px;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    color: #fff;
    background-color: rgba(10, 117, 240, 0.8);
    border: 1px solid #eee;
    border-radius: 5px;
    transition: all 0.2s;

    &:hover {
      background-color: #f90;
    }
  }
  .table-title {
    position: relative;
    width: 100%;
    height: 40px;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    line-height: 40px;
    text-decoration: underline;
  }
  .table-wrap {
    width: 100%;
    table-layout: fixed;
    border: 1px solid #eee;
    border-collapse: collapse;
  }
  .table-wrap thead tr {
    height: 40px;
    line-height: 40px;
    font-weight: bold;
    background-color: #eee;
  }
  .table-wrap thead tr td {
    font-size: 14px;
  }
  .table-wrap td {
    height: 30px;
    line-height: 30px;
    font-size: 12px;
  }
}

// print
@page {
  size: auto;
  margin: 8mm 4mm; // 打印页的边距
}
.A4 {
  box-sizing: border-box;
  width: 794px;
  margin: 15px auto;
  padding: 20px 30px;
  border: 1px solid #eee;
  page-break-after: always;
  &:last-child {
    page-break-after: auto; // 避免最后一页为空白页
  }
}
@media print {
  .A4 {
    float: none;
    border: 0;
    background: red;
  }
}
</style>
