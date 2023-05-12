<template>

  <div>
    <el-radio-group v-model="search.extra" fill="#FFF" @change="changeDay">
      <el-radio label="1">按天统计</el-radio>
      <!--      <el-radio label="2">一月内</el-radio>-->
      <el-radio label="3">按月统计</el-radio>
    </el-radio-group>
    <div class="echarts-box">
      <div id="myEcharts" :style="{ width: '1200px', height: '500px' }"></div>
    </div>
  </div>
</template>

<script>
import {getCurrentInstance, onMounted, onUnmounted, reactive, toRefs} from 'vue';
import * as echarts from "echarts";
import {addDay, dateFormat} from "@/utils";
import {getOrderSummary} from "@/api/admin";

export default {
  name: "echartsBox",
  setup() {
    /// 声明定义一下echart
    let echart = echarts;
    let chart = null;

    const state = reactive({
      searchCondition: {
        publishTimeMin: ""
      },
      search: {
        extra: "1",
      },
      // choose:''
      option: {
        title: {
          text: '交易情况统计图'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['交易额', '成交数量',]
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '交易额',
            type: 'line',
            stack: 'line1',
            // data: []
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '成交数量',
            type: 'line',
            stack: 'line2',
            data: [1, 2, 3, 4, 5, 1, 2]
            // data: []
          },
        ]
      }
    })

    onMounted(async () => {
      await search();
      initChart();
      // initChart();
    });

    const search = async () => {
      console.log("进入")
      try {
        console.log(state.search)
        const {data} = await getOrderSummary(state.search);
        if (data.ok) {
          console.log(data.data)
          state.option.xAxis.data = data.data.titles
          state.option.series[1].data = data.data.orderCounts;
          state.option.series[0].data = data.data.orderAmounts;
          console.log(state.option.series)
          chart.setOption(state.option);
        }

      } catch (e) {
      }
    }

    onUnmounted(() => {
      echart.dispose;
    });

    // 基础配置一下Echarts
    function initChart() {
      chart = echart.init(document.getElementById("myEcharts"), "dark");
      // 把配置和数据放这里
      chart.setOption(state.option);
      window.onresize = function () {
        //自适应大小
        // chart.resize();
      };
    }

    const changeDay = async (day) => {
      await search();
      // console.log(day)
      /*      state.searchCondition.publishTimeMin = dateFormat(
                "YYYY-mm-dd",
                addDay(-day)
            );
            console.log(state.searchCondition.publishTimeMin)*/

    }


    return {
      ...toRefs(state),
      initChart,
      changeDay,
    };
  }
};
</script>