export interface IMenuItem{
    name:string
    url:string
    icon:string
}

export const MENU_DATA:IMenuItem[]=[{
    icon:'radix-icons:dashboard',
    name:'map',
    url:'/'
    },
    {
        icon:'radix-icons:plus-circled',
        name:'add training',
       url:'/trainingAdd'
    },
    {
        icon:'radix-icons:gear',
        name:'profile',
        url:'/profile'
    },
   
     {
        icon:'majesticons:academic-cap-line',
        name:'analytics',
       url:'/analytics'
    }
]