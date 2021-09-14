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
        "tableName": "article_order_expires",
        "createAction": "/admin/articleOrder/expire/create",
        "editAction": "/admin/articleOrder/expire/edit",
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
            "prop": "amount",
            "minWidth": "180",
            "append_table_": 0,
            "label": "金额"
        },
        {
            "name": "",
            "prop": "days",
            "width": "100",
            "append_table_sort": 0,
            "label": "期限(天)"
        },
         {'prop': 'sort', 'minWidth': '', 'width': '100', 'align': 'center', 'type': 'sort', 'url': '/admin/merchant/expire/editField', 'label': '排序' },

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
            "prop": "days",
            "datatype": "require|number",
            "type": "text",
            "style":"width:100px",
            "label": "期限(天)"
        },




       ]
    }
}
