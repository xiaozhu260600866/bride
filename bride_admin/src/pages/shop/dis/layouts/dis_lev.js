export default{
    data:{
        listsAction:'',
        pageSize:'15',
        canCreate:true,
        canEdit:true,
        delAll:false,
        tableName:'distributions_levs',
        createAction:'/admin/shop/dis/lev/create',
        editAction:'/admin/shop/dis/lev/edit',
        //是否需要审核
        //auditAction:'/admin/userLev/change-status',
        checkAll:false,
       /* tarbars:{
            prop:'status',
            data:[
                {label:'使用中',value:'0'},
                {label:'已使用',value:'1'},
            ]
        }, */
        tableFields:[
            {prop:'name',label:'等级名称',minWidth:"150"},
            {prop:'first_distor',label:'一级比例(%)',minWidth:"200",append_table_first_distor:true},
            {prop:'second_distor',label:'二级比例(%)',minWidth:"200",append_table_second_distor:true},
            {prop:'third_distor',label:'三级比例(%)',minWidth:"200",append_table_third_distor:true},
            {prop:'amount',label:'升级条件',minWidth:"200"},
            {prop:'created_at',label:'日期',minWidth:"200"},
        ],
        searchFields:[
            {prop:'name',label:'等级名称'},
        ],
        formFields:[
          /*  {prop:'lev',label:'等级',type:'select',datakey:'levArr',datatype:'require'}, */
            {prop:'name',label:'等级名称',type:'text',datatype:'require'},
            {prop:'first_distor',label:'一级比例',type:'text',defaultValue:0,datatype:'require|integer',append_form_first_distor:true},
            {prop:'second_distor',label:'二级比例',type:'text',defaultValue:0,datatype:'require|integer',append_form_second_distor:true},
            {prop:'third_distor',label:'三级比例',type:'text',defaultValue:0,datatype:'require|integer',append_form_third_distor:true},
            {prop:'upgrade_type',label:'升级条件',defaultValue:0,append_form_upgrade_type:true},
           /*  {prop:'pic',label:'图片',type:'upload',allowUpLoadNum:1,upurl:'user'}, */
        ]
    }
}
