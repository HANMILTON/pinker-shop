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
		th: '买单时间',
		field: 'time_pay'
	}, {
		th: '姓名',
		field: 'user_name'
	}, {
		th: '手机号',
		field: 'mobile'
	}, {
		th: '支付（元）',
		field: 'amount'
	}, {
		th: '实际支付',
		field: 'money_pay'
	}]
}