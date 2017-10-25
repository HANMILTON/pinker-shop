const convertCaozuo = (val) => {
	return `<button class='btn btn-xs btn-default' data-type='detail'>查看详情</button>`		

}
export const orderOpts = {
	columns: [{
		th: '评论序号',
		field: 'id'
	}, {
		th: '订单编号',
		field: 'order_number'
	}, {
		th: '评价总分',
		field: 'comment_score'
	}, {
		th: '顾客手机号',
		field: 'mobile'
	}, {
		th: '星级',
		field: 'comment_star'
	}, {
		th: '商圈',
		field: 'shangquan_name'
	}, {
		th: '电话',
		field: 'tel'
	}, {
		th: '操作',
		field:'is_online',
		convertDom: convertCaozuo
	}]
}