const navData = [
    { name: "首页展示", page: "/Index", icon: "home" },
    { name: "产品中心", page: "/ProductCenter", icon: "deployment-unit" },
    { name: "新闻资讯", page: "/News", icon: "fire" },
    { name: "工程案例", page: "/EngineeringCase", icon: "flag" },
    { name: "合作洽谈", page: "/Company", icon: "phone" }]

const productData = [
    { name: "首页展示", page: "/", icon: "home" },
    { name: "产品中心", page: "/ProductCenter", icon: "deployment-unit" },
    { name: "新闻资讯", page: "/News", icon: "fire" },
    { name: "工程案例", page: "/EngineeringCase", icon: "flag" },
    { name: "合作洽谈", page: "/Company", icon: "phone" }]

const homeData = {
    banner: [
        { imgUrl: "https://images.pexels.com/photos/3145755/pexels-photo-3145755.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500", activeUrl: "https://www.baidu.com" },
        { imgUrl: "https://images.pexels.com/photos/3145755/pexels-photo-3145755.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500", activeUrl: "https://www.taobao.com" }
    ],
    product: [
        {
            productName: "好东西",
            productId: "123",
            productImg: "https://images.pexels.com/photos/3145755/pexels-photo-3145755.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"

        }, {
            productName: "好东西",
            productId: "123",
            productImg: "https://images.pexels.com/photos/3145755/pexels-photo-3145755.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        }
    ],
    EngineeringCase: [
        {
            title: "title1",
            id: 1,
            listData: [{
                imgUrl: "http://img.daimg.com/uploads/allimg/200824/1-200R41313390-L.jpg"
            }, {
                imgUrl: "http://img.daimg.com/uploads/allimg/200824/1-200R41313390-L.jpg"
            }, {
                imgUrl: "http://img.daimg.com/uploads/allimg/200824/1-200R41313390-L.jpg"
            }, {
                imgUrl: "http://img.daimg.com/uploads/allimg/200824/1-200R41313390-L.jpg"
            }, {
                imgUrl: "http://img.daimg.com/uploads/allimg/200824/1-200R41313390-L.jpg"
            }, {
                imgUrl: "http://img.daimg.com/uploads/allimg/200824/1-200R41313390-L.jpg"
            }],
        },
        {
            title: "title2",
            id: 2,
            listData: [{
                imgUrl: "http://img.daimg.com/uploads/allimg/200824/1-200R41313390-L.jpg"
            }, {
                imgUrl: "http://img.daimg.com/uploads/allimg/200824/1-200R41313390-L.jpg"
            }, {
                imgUrl: "http://img.daimg.com/uploads/allimg/200824/1-200R41313390-L.jpg"
            }, {
                imgUrl: "http://img.daimg.com/uploads/allimg/200824/1-200R41313390-L.jpg"
            }],
        },
        {
            title: "title3",
            id: 3,
            listData: [{
                imgUrl: "http://img.daimg.com/uploads/allimg/200824/1-200R41313390-L.jpg"
            }, {
                imgUrl: "http://img.daimg.com/uploads/allimg/200824/1-200R41313390-L.jpg"
            }, {
                imgUrl: "http://img.daimg.com/uploads/allimg/200824/1-200R41313390-L.jpg"
            }, {
                imgUrl: "http://img.daimg.com/uploads/allimg/200824/1-200R41313390-L.jpg"
            }],
        }],
    News: [
        {
            href: "https://www.antdv.com/",
            title: `ant design vue part`,
            avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            description:
                "Ant Design, a design language for background applications, is refined by Ant UED Team.",
            content:
                "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
        }
    ]


}
const EngineeringCase = [
    {
        title: "title1",
        id: "1",
        listData: [{
            imgUrl: "http://img.daimg.com/uploads/allimg/200824/1-200R41313390-L.jpg"
        }, {
            imgUrl: "http://img.daimg.com/uploads/allimg/200824/1-200R41313390-L.jpg"
        }, {
            imgUrl: "http://img.daimg.com/uploads/allimg/200824/1-200R41313390-L.jpg"
        }],
    },
    {
        title: "title2",
        id: "2",
        listData: [{
            imgUrl: "http://img.daimg.com/uploads/allimg/200824/1-200R41313390-L.jpg"

        }, {
            imgUrl: "http://img.daimg.com/uploads/allimg/200824/1-200R41313390-L.jpg"

        }, {
            imgUrl: "http://img.daimg.com/uploads/allimg/200824/1-200R41313390-L.jpg"

        }, {
            imgUrl: "http://img.daimg.com/uploads/allimg/200824/1-200R41313390-L.jpg"

        }, {
            imgUrl: "http://img.daimg.com/uploads/allimg/200824/1-200R41313390-L.jpg"

        }, {
            imgUrl: "http://img.daimg.com/uploads/allimg/200824/1-200R41313390-L.jpg"

        }, {
            imgUrl: "http://img.daimg.com/uploads/allimg/200824/1-200R41313390-L.jpg"

        }],
    },
    {
        title: "title3",
        id: "3",
        listData: [{
            imgUrl: "http://img.daimg.com/uploads/allimg/200824/1-200R41313390-L.jpg"

        }, {
            imgUrl: "http://img.daimg.com/uploads/allimg/200824/1-200R41313390-L.jpg"

        }, {
            imgUrl: "http://img.daimg.com/uploads/allimg/200824/1-200R41313390-L.jpg"

        }, {
            imgUrl: "http://img.daimg.com/uploads/allimg/200824/1-200R41313390-L.jpg"

        }, {
            imgUrl: "http://img.daimg.com/uploads/allimg/200824/1-200R41313390-L.jpg"

        }, {
            imgUrl: "http://img.daimg.com/uploads/allimg/200824/1-200R41313390-L.jpg"

        }],
    }]
export {
    navData,
    productData,
    homeData,
    EngineeringCase
}