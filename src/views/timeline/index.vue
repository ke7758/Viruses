<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item label="时间节点：">
					<el-date-picker
						v-model="filters.time"
						type="daterange"
						align="right"
						unlink-panels
						range-separator="至"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
						:picker-options="pickerOptions2">
					</el-date-picker>
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


		<!--编辑界面-->
	</section>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';

	export default {
		data() {
			return {
				filters: {
					time: '',
					project: '0',
					personnel: '0'
				},
				pickerOptions2: {
					shortcuts: [{
						text: '最近一周',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近一个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近三个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
							picker.$emit('pick', [start, end]);
						}
					}]
				}
			}
		},
		methods: {
			
		},
		mounted() {
			
		}
	}

</script>