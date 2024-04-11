export default {
    items: [
       
        {
            id: '1',
            title: 'Relations',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'StockIn',
                    title: 'RELATIONS',
                    type: 'item',
                    url: '/StocksIn/Attendance',
                    icon: 'feather icon-layers',
                }
            ]
        },
        // {
        //     id: '2',
        //     title: 'Pass Request',
        //     type: 'group',
        //     icon: 'icon-navigation',
        //     children: [
        //         {
        //             id: 'StockIn',
        //             title: 'Vachecial PASS REQUEST',
        //             type: 'item',
        //             url: '/StocksIn/StocksIn',
        //             icon: 'feather icon-layers',
        //         }
        //     ]
        // },
       
        {
            id: '3',
            title: 'User Management',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'UserManagement',
                    title: 'DOCUMENT',
                    type: 'item',
                    url: '/UserManagement/UserManagement',
                    icon: 'feather icon-trending-up',
                }
            ]
        },
        
        {
            id: '4',
            title: 'LOGOUT',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'Logout',
                    title: 'LOGOUT',
                    type: 'item',
                    url: '/Login',
                    icon: 'feather icon-power',
                }
            ]
        },
    ]
}