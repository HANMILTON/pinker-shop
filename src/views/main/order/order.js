const convertCaozuo = () => {
	return "<button class='btn btn-xs btn-default' data-type='check'>确认消费</button>"
}
const convertStatus = (val) =>{
	switch(val){
		case "1":
			return `未使用`
			break;
		case "2":
			return `已使用`
			break;						
	}
}
export const orderOpts = {
	columns: [{
		th: '下单时间',
		field: 'time_add'
	}, {
		th: '套餐名称',
		field: 'goods_name'
	}, {
		th: '数量',
		field: 'num'
	}, {
		th: '实际价格',
		field: 'amount'
	}, {
		th: '已付金额',
		field: 'money_pay'
	}, {
		th: '用户',
		field: 'app_user_name',
	}, {
		th: '手机号',
		field: 'mobile'
	}, {
		th: '订单编号',
		field: 'order_number'
	}, {
		th: '状态',
		field: 'status',
		convert: convertStatus
	}]
}