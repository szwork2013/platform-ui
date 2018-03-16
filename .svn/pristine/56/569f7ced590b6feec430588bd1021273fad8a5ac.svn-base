const option = {
    color: ['green', '#006699', '#e5323e', '#4cabce'],
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    grid: {
        top: '40px',
        left: '0px',
        right: '0px',
        bottom: '0px',
        containLabel: true
    },
    legend: {
        top: '0px',
        textStyle:{
            fontSize:14
        },
        data: ['计划', '已申请通过', '已支付', '正在申请']
    },
    xAxis: [
        {
            axisLabel:{
                fontSize:14
            },
            type: 'category',
            axisTick: {show: false},
            data: ['公司整体', '场站/项目']
        },
    ],
    yAxis: [
        {
            type: 'value'
        },
    ],
    series: [
        {
            name: '计划',
            type: 'bar',
            key: 'budget',
            barGap: 0,
            data: [1063412, 12332, 13221]
        },
        {
            name: '已申请通过',
            key: 'passBudget',
            type: 'bar',
            data: [45220, 22182, 32191]
        },
        {
            name: '已支付',
            key: 'pay',
            type: 'bar',
            data: [22398, 23277, 22101]
        },
        {
            name: '正在申请',
            key: 'applyBudget',
            type: 'bar',
            data: [33150, 22232, 22201]
        },
    ]
};

export default option;