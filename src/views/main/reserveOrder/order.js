
const convertCaozuo = (val) => {
	if(val=="00"){
		return "<span class='info-font cursor-pointer' data-type='ok'>确认</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class='danger-font cursor-pointer' data-type='exit'>取消</span>"
	}else if(val=="10"){
		return "<span class='info-font cursor-pointer' data-type='arrive'>到店</span>"
	}else{
		return ""
	}
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
const mergeTime = (date,time) =>{
	var date = date.split(" ")[0]
	return date+ " " + time
}
export const orderOpts = {
	columns: [{
		th: '下单时间',
		field: 'time_add'
	}, {
		th: '姓名',
		field: 'reserve_contacter'
	}, {
		th: '手机号',
		field: 'reserve_mobile'
	}, {
		th: '预约时间',
		field: 'time_start@reserve_time',
		merge: mergeTime
	}, {
		th: '人数',
		field: 'reserve_people'
	}, {
		th: '备注',
		field: 'amount'
	}, {
		th: '支付(元)',
		field: 'money_pay'
	}, {
		th: '操作',
		field: 'reserve_status',
		convertDom: convertCaozuo
	}]
};
export const orderOpts1 = {
	columns: [{
		th: '下单时间',
		field: 'time_add'
	}, {
		th: '姓名',
		field: 'reserve_contacter'
	}, {
		th: '手机号',
		field: 'reserve_mobile'
	}, {
		th: '人数',
		field: 'reserve_people'
	}, {
		th: '备注',
		field: 'amount'
	}, {
		th: '支付(元)',
		field: 'money_pay'
	}, {
		th: '操作',
		field: 'reserve_status',
		convertDom: convertCaozuo
	}]
}