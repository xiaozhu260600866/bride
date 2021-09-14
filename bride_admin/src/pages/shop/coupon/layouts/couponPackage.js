export default {
    data: {
        "listsAction": "",
        "pageSize": 30,
        "canCreate": 1,
        "canEdit": 1,
        canupload:false,
        classUrl:"",
        createEditLabel:"110px",
        createEditDiagWidth:'900px',
        "tableName": "wechat_cards",
        "createAction": "/admin/shop/coupon/couponPackage/create",
        "editAction": "/admin/shop/coupon/couponPackage/edit",
        "checkAll": true,
        //"putaway":'/admin/project/edit-field-all',
        "searchFields": [
          {
            "name": "",
            "prop": "name",
            "type": "text",
            "label": "名称"
        },
       /* {
            "name": "",
            "prop": "user_name",
            "type": "text",
            "label": "负责人名称"
        }, */

        ],
        "tableFields": [
           {
            "name": "",
            "prop": "name",
            "minWidth": "180",
            "append_table_": 0,
            "label": "名称"
        },
        {
            "name": "",
            "prop": "coupon_names",
            "minWidth": "180",
            "append_table_": 0,
            "label": "优惠券"
        },
        {
            "name": "",
            "prop": "amount",
            "width": "100",
            "append_table_sort": 0,
            "label": "金额"
        },
		{
		    "name": "",
		    "prop": "merchant_names",
		    "width": "100",
		    "append_table_sort": 0,
		    "label": "使用点"
		},

       ],
        "formFields": [
           {
            "name": "",
            "prop": "name",
            "datatype": "require",
            "type": "text",
            'style':"width:200px",
            "append_form_": 0,
            "label": "名称",
            
            column:2
        },
        {
            "name": "",
            "prop": "amount",
            "datatype": "require|price",
            "type": "text",
            "style":"width:100px",
            "label": "金额"
        },
        {
            "name": "",
            "prop": "type",
            "datatype": "require",
            "type": "text",
            "style":"width:100px",
            "label": "类型",
            defaultValue:0,
            append_form_type:"1"

        },
        {prop:'cpupon_ids',"datatype": "array", name:'coupon_names',rowName:'title',label:'请选择卡券',type:"searchCheckbox",url:'/admin/shop/coupon/wechatCard/lists',tableFields:[
             {prop:'title',label:'微信卡券名称',width:"200"},
              {prop:'amount',label:'金额',width:"200"},
              {prop:'created_at',label:'创建日期',width:"200"},
        ],searchFields:[
             {prop:'title',label:'微信卡券名称'},

        ]},
		{prop:'merchant_ids',"datatype": "array", name:'merchant_names',rowName:'company_name',label:'请选择商家',type:"searchCheckbox",url:'/admin/merchant/lists?role=5',tableFields:[
		     {prop:'userInfo.company_name',label:'商家名称',width:"200"},
		      {prop:'name',label:'联系人',width:"200"},
		      {prop:'userInfo.phone',label:'电话',width:"200"},
		      {prop:'created_at',label:'创建日期',width:"200"},
		],searchFields:[
		     {prop:'title',label:'商家名称'},
		
		]},
        {
            "prop": "cover",
            "datatype": "array",
            "type": "upload",
            "append_form_": 0,
            "label": "logo",
             uploadMessage:'图片最佳尺寸是800*450px',
            "allowUpLoadNum": "1",
            "upurl": "wechatCard"
        },
        {
            "name": "",
            "prop": "content",
            "datatype": "require",
            "type": "textarea",
            "style":"height:80px",
            "append_form_": 0,
            "label": "详情"
        },
       ]
    }
}
