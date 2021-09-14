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
        "createAction": "/admin/shop/dis/ad/create",
        "editAction": "/admin/shop/dis/ad/edit",
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
            "prop": "distribution_names",
            "minWidth": "180",
            "append_table_": 0,
            "label": "经销商名称"
        },
       
        {
            "name": "",
            "prop": "url",
            "width": "100",
            "append_table_sort": 0,
            "label": "url1"
        },
		{
		    "name": "",
		    "prop": "url2",
		    "width": "100",
		    "append_table_sort": 0,
		    "label": "url2"
		},

       ],
        "formFields": [
           {
            "name": "",
            "prop": "url",
            "datatype": "require",
            "type": "text",
            'style':"width:200px",
            "append_form_": 0,
            "label": "url连接一",
            
            column:2
        },
        {
            "name": "",
            "prop": "url2",
            "datatype": "require",
            "type": "text",
            "style":"width:100px",
            "label": "url连接一"
        },
      
    
		{prop:'distribution_ids',"datatype": "array", name:'distribution_names',rowName:'name',label:'请选择分销商',type:"searchCheckbox",url:'/admin/shop/dis/lists?status=1',tableFields:[
		      {prop:'name',label:'联系人',width:"200"},
		      {prop:'phone',label:'电话',width:"200"},
		      {prop:'created_at',label:'创建日期',width:"200"},
		],searchFields:[
		     {prop:'name',label:'分销商名称'},
		     {prop:'phone',label:'分销商电话'},
		
		]},
        {
            "prop": "poster_cover",
            "datatype": "array",
            "type": "upload",
            "append_form_": 0,
            "label": "广告位一",
             uploadMessage:'图片最佳尺寸是800*450px',
            "allowUpLoadNum": "1",
            "upurl": "disAd"
        },
		{
		    "prop": "poster_cover2",
		    "datatype": "array",
		    "type": "upload",
		    "append_form_": 0,
		    "label": "广告位二",
		     uploadMessage:'图片最佳尺寸是800*450px',
		    "allowUpLoadNum": "1",
		    "upurl": "disAd"
		},
       
       ]
    }
}
