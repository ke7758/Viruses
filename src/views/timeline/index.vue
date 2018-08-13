<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item label="时间节点：">
					<el-select v-model="value6" @change="chakan">
						<el-option value="按天查看" class="scale"></el-option>
						<el-option value="按周查看" class="scale"></el-option>
						<el-option value="按月查看" class="scale"></el-option>
						<el-option value="按年查看" class="scale"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="项目名称：">
					<el-select v-model="filters.project">
						<el-option label="全部" value="0"></el-option>
						<el-option label="项目1" value="1"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="人员：">
					<el-select v-model="filters.personnel">
						<el-option label="全部" value="0"></el-option>
						<el-option label="人员1" value="1"></el-option>
						<el-option label="人员2" value="2"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary">筛选</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary">新增项目</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<gantt class="left-container" :tasks="tasks"></gantt>

		<!--编辑界面-->
	</section>
</template>

<script>
	import util from '../../common/js/util'
	import Gantt from '../../components/Gantt.vue';
	//import NProgress from 'nprogress'
	import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';

	export default {
		components: {Gantt},
		data() {
			return {
				value6: '按天查看',
				tasks: {
					data: [
						{
							id: 1, 
							text: '企业管家迭代(P0)', 
							start_date: '09-08-2018', 
							duration: 12, 
							progress: 0.6,
							show: true,
							open: true,//默认是否打开
							color:"blue",
							type: 'project'// gantt.config.types.milestone为里程碑类型
						},
						{
							id: 2, 
							text: '范恒（订单列表）', 
							parent: '1',//父任务ID
							textColor: '#ff0000',
							start_date: '09-08-2018',  //计划结束时间
							duration: 3, 
							progress: 0.4,
							color: "green",
						},
						{
							id: 3, 
							text: '葛志浩（订单详情）', 
							parent: '1',//父任务ID
							textColor: '#ff0000',
							start_date: '10-08-2018',  //计划结束时间
							duration: 4, 
							progress: 0.4
						}
					]
				},
				filters: {
					time: '',
					project: '0',
					personnel: '0'
				}
			}
		},
		methods: {
			chakan() {
				if(this.value6 =='按天查看'){
					gantt.config.scale_unit = "day";
					gantt.config.step = 1;
					gantt.config.date_scale = "%d";//设置日期
					gantt.config.subscales = [
						{unit: "year", step: 1, date: "%Y"},
						{unit: "month", step: 1, date: "%M"}
					];
					gantt.config.scale_height = 70;
					gantt.templates.date_scale = null;
				}else if(this.value6=='按周查看'){
					var weekScaleTemplate = function (date) {
						var dateToStr = gantt.date.date_to_str("%M %d");
						var endDate = gantt.date.add(gantt.date.add(date, 1, "week"), -1, "day");
						return dateToStr(date) + " - " + dateToStr(endDate);
					};
					gantt.config.scale_unit = "week";
					gantt.templates.date_scale = weekScaleTemplate;
					gantt.config.step = 1;
					gantt.config.subscales = [
						{unit: "day", step: 1, date: "%D"}
					];
					gantt.config.scale_height = 70;
				}else if(this.value6=='按月查看'){
					gantt.config.scale_unit = "month";
					gantt.config.date_scale = "%Y, %F";
					gantt.config.step = 1;
					gantt.config.subscales = [
						{unit: "week", step: 1, date: "%W"}
					];
					gantt.config.scale_height = 70;
					gantt.templates.date_scale = null;
				}else if(this.value6=='按年查看'){
					gantt.config.scale_unit = "year";
					gantt.config.step = 1;
					gantt.config.date_scale = "%Y";
					gantt.config.min_column_width = 50;
					gantt.config.scale_height = 70;
					gantt.templates.date_scale = null;
					gantt.config.subscales = [
						{unit: "month", step: 1, date: "%M"}
					];
				}
			}
		},
		mounted() {
		}
	}

</script>
<style>
    @import "~dhtmlx-gantt/codebase/dhtmlxgantt.css";
</style>