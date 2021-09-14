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
        "createAction": "/admin/shop/coupon/wechatCard/create",
        "editAction": "/admin/shop/coupon/wechatCard/edit",
        "checkAll": true,
        //"putaway":'/admin/project/edit-field-all',
        tarbars:{
            prop:'scanQrocde',
            data:[
                {label:'购买核券',value:'0'},
                {label:'线下现金券',value:'1'},
            ]
        },
        "searchFields": [
          {
            "name": "",
            "prop": "name",
            "type": "text",
            "label": "卡券名称"
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
            "prop": "title",
            "minWidth": "180",
            "append_table_": 0,
            "label": "卡券名"
        },
        {
            "name": "",
            "prop": "amount",
            "width": "100",
            "append_table_sort": 0,
            "label": "金额"
        },

       ],
        "formFields": [
           {
            "name": "",
            "prop": "title",
            "datatype": "require",
            "type": "text",
            'style':"width:200px",
            "append_form_": 0,
            "label": "卡券名称",
             "editDisabled":true,
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
        // {
        //     "name": "",
        //     "prop": "brand_name",
        //     "datatype": "require",
        //     "type": "text",
        //     "style":"width:100px",
        //     "label": "brand名称",
        //     column:2
        // },

        // {
        //     "name": "",
        //     "prop": "center_title",
        //     "datatype": "require",
        //     "type": "text",
        //     "style":"width:100px",
        //     "label": "中间标题"
        // },
        // {
        //     "name": "",
        //     "prop": "center_sub_title",
        //     "datatype": "require",
        //     "type": "text",
        //     "style":"width:100px",
        //     "label": "子标题",
        //      column:2
        // },
        // {
        //     "name": "",
        //     "prop": "center_app_brand_user_name",
        //     "datatype": "require",
        //     "type": "text",
        //     "style":"width:120px",
        //      disabled:true,
        //      defaultValue:'gh_e8ce57284546@app',
        //     "label": "小程序用户名"
        // },
        // {
        //     "name": "",
        //     "prop": "center_app_brand_pass",
        //     "datatype": "require",
        //     "type": "text",
        //     "style":"width:200px",
        //     defaultValue:'/pages/index/main',
        //     "label": "小程序页面路径",
        //      column:2
        // },
        // {
        //     "name": "",
        //     "prop": "custom_url_name",
        //     "datatype": "require",
        //     "type": "text",
        //     "style":"width:100px",
        //     "label": "url名称"
        // },
        {
            "name": "",
            "prop": "begin_timestamp",
            "datatype": "require",
            "type": "date",
            "style":"width:150px",
            "label": "开始时间",
             "editDisabled":true,
             column:2
        },
        {
            "name": "",
            "prop": "end_timestamp",
            "datatype": "require",
            "type": "date",
            "style":"width:150px",
             "editDisabled":true,
            "label": "结束日期"
        },


        {
            "prop": "logo_url",
            "datatype": "array",
            "type": "upload",
            "append_form_": 0,
            "label": "logo",
             uploadMessage:'图片最佳尺寸是800*450px',
            "allowUpLoadNum": "1",
            "upurl": "wechatCard"
        },
        {
            "prop": "icon_url_list",
            "datatype": "array",
            "type": "upload",
            "append_form_": 0,
            "label": "图文图片",
             uploadMessage:'图片最佳尺寸是800*450px',
            "allowUpLoadNum": "1",
            "upurl": "wechatCard"
        },
        {
            "name": "",
            "prop": "abstract",
            "datatype": "require",
            "type": "textarea",
            "style":"height:80px",
            "append_form_": 0,
            "label": "图文内容"
        },

        {
            "name": "",
            "prop": "deal_detail",
            "datatype": "require",
            "type": "textarea",
            "style":"height:80px",
            "append_form_": 0,
            "label": "卡券详情"
        },


       ]
    }
}
