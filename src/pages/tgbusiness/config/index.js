/*
 * @Date           : 2020-09-13 01:01:49
 * @FilePath       : /backend-web/src/pages/tgbusiness/config/index.js
 * @Description    : 
 */


export const  columns=[
 
 { name: '_id', label: '群组id', align: 'left',  field: '_id'  },
 
    { name: 'title', align: 'center', label: '群组名字', field: 'title' },
    { name: 'memberCount', align: 'center', label: '用户数', field: 'memberCount',   },
    { name: 'canGetMembers', align: 'center', label: '能获取用户数', field: 'canGetMembers' },
    { name: 'description', align: 'center', label: '描述', field: 'description', 
     style: 'max-width: 400px', 
     classes:"p-break-spaces"
    },
    
    { name: 'invite_from_group', align: 'center', label: '邀请到其他群', field: 'invite_from_group' },
    { name: 'invite_to_group', align: 'center', label: '从其他群邀请', field: 'invite_to_group' },

    { name: 'handle', align: 'center', label: '操作',  },
 

]

// canGetMembers: true
// description: "🔞新人🧑🏻‍💻必看频道约定：\n  行业领头羊 属于我们支付人自己的家！\n亚太地区支付行业顶尖交流频道！\n1.姓名挂广告（禁言）\n2.发供应&需求广告（需两行内）\n3.发布暴力&色情内容（视情况禁言）\n4.欺诈&辱骂&诱导&刷屏 （清退或禁言）\n\n东南亚四方&担保&房产&招商"
// memberCount: 8209
// photo: "AQADBQADsakxG4_5MVcACAMAA4o9QOUW____2TZCEN3k7koiBA"
// title: "东南亚支付通道大佬集中营"
// _id: -1001176154742