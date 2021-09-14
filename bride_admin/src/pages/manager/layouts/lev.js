export default{
    data:{
        listsAction:'',
        pageSize:'15',
        canCreate:true,
        canEdit:true,
        delAll:false,
        tableName:'manager_levs',
        createAction:'/admin/manager/lev/create',
        editAction:'/admin/manager/lev/edit',
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
            {prop:'ratio',label:'比例',minWidth:"200"},
            {prop:'created_at',label:'日期',minWidth:"200"},
        ],
        searchFields:[
            {prop:'name',label:'等级名称'},
        ],
        formFields:[
            {prop:'name',label:'等级名称',type:'text',datatype:'require'},
            {prop:'ratio',label:'比例',type:'text',defaultValue:0,datatype:'require|integer',append_form_ratio:true},
           /*  {prop:'pic',label:'图片',type:'upload',allowUpLoadNum:1,upurl:'user'}, */
        ]
    }
}
