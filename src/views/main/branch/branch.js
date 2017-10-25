const convertCaozuo = (val) => {
	return `<span class='info-font cursor-pointer' data-type='edit'>编辑</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class='danger-font cursor-pointer' data-type='delete'>删除</span>`		

}
export const branchOpts = {
	columns: [{
		th: '编号',
		field: 'id'
	}, {
		th: '城市',
		field: 'shi_name'
	}, {
		th: '店名',
		field: 'shop_name'
	}, {
		th: '地区',
		field: 'xian_name'
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