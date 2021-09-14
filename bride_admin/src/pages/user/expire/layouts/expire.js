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
        "tableName": "member_lev_expires",
        "createAction": "/admin/user/expire/create",
        "editAction": "/admin/user/expire/edit",
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
            "prop": "member_lev.name",
            "minWidth": "180",
            "append_table_": 0,
            "label": "名称"
        },
        {
            "name": "",
            "prop": "amount",
            "minWidth": "180",
            "append_table_": 0,
            "label": "金额"
        },
        {
            "name": "",
            "prop": "months",
            "width": "100",
            "append_table_sort": 0,
            "label": "期限(月)"
        },
         {'prop': 'sort', 'minWidth': '', 'width': '100', 'align': 'center', 'type': 'sort', 'url': '/admin/user/expire/editField', 'label': '排序' },

       ],
        "formFields": [
           {
            "name": "",
            "prop": "lev_id",
            "datatype": "require",
            "type": "select",
			datakey:"memberLev",
            'style':"width:200px",
            "label": "会员等级",
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
            "prop": "months",
            "datatype": "require|number",
            "type": "text",
            "style":"width:100px",
            "label": "期限(月)"
        },




       ]
    }
}
