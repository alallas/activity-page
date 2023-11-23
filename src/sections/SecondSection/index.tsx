import {FC, useEffect, useRef, useState} from "react";
import classNames from "classnames";
import CartoonImage from "../../assets/cartoon.jpg";
import MovieImage from "../../assets/movie.png";
import StudyImage from "../../assets/study.jpg";
import FoodImage from "../../assets/food.jpg";
import LogoImage from "../../assets/logo.png";
import styles from "./styles.module.scss";


//总是复制tabs（下划线）是很麻烦的，可以把tabs抽出来作为一个数据,[{},{},{}]
const tabs=[
    {
        key:"cartoon",
        title:"动画",
        image:CartoonImage,
    },
    {
        key:"food",
        title:"美食",
        image:FoodImage,
    },
    {
        key:"movie",
        title:"电影",
        image:MovieImage,
    },
    {
        key:"study",
        title:"学习",
        image:StudyImage,
    }
]

const TAB_HEIGHT=56;

/*
要实现的功能：
1.点击tab跳转——————scrollIntoView
具体来说就是点击某个tab，然后找页面中是否存在对应的要素，然后用scrollIntoView去滚动到那里
那怎么找页面是否存在对应的元素呢，用document.querySelector,也就是为每一个section 去设置一个id
要拿的东西：对应id的section和tab的key
要变的状态：是否到了某个tab

2.tabs吸顶
思路是，当屏幕滚动到secondSection的顶部，即这个的顶部等于页面顶部时，让tab的position变成fix
那怎么知道secondsection到了顶呢，用getBoundingClientRect
要拿的东西：secondsection
要变的状态：是否吸顶

3.滚动时高亮tab
在onscroll过程中，遍历section，如果section距离视口顶部是56px，那么就高亮对应的tab
所以要拿的东西：sections(子)

4.按钮吸底
到第二部分时就出现，同样用新增className的操作，与吸顶的时候同时出现，同时set为true
也就是className出现在isFixed等于true的时候
即滑到第二部分————开关打开，setIsFixed为true————className增加————切换position（或出现）
*/

const SecondSection: FC = () => {
    const[activeTab,setActiveTab]=useState("cartoon");
    const [isFixed,setIsFixed]=useState<boolean>(false);

    //初始化一个ref引用，可以指向整个secondsection然后方便监听
    //为什么用ref，因为这个每次执行时不会加载组件，即不会触发组件的重新渲染
    const secondSectionRef=useRef<HTMLDivElement>(null);

    const activate=(key:string)=>{
        //先把setActivateTab设置一下，让classNames变化，
        //也就是先点击的时候，先变成高亮，然后再跳转到对应的section
        setActiveTab(key);

        //找是否有对应的section，找到的话就跳转
        const tabContentEl=document.querySelector(`[data-id=${key}]`);   //为啥要加上中括号
        if(tabContentEl){
            //这里有个bug，就是子section到了视口的顶部，被ul盖住了，遗憾的是scrollIntoView没有offset的功能，只能用样式调整
            tabContentEl.scrollIntoView({behavior:"smooth"});
        }
    }

    const onScroll=()=>{
        if(secondSectionRef.current){
            const {top}=secondSectionRef.current.getBoundingClientRect();

            //吸顶与否也需要一个状态来记录,优化的代码见上面这一条
            setIsFixed(top<=0);
            /*
            if(top<=0){
                setIsFixed(true);
            } else{
                setIsFixed(false);
            }
            */

            const sectionNodes=secondSectionRef.current.querySelectorAll("section");
            //把生成的nodelist转化为array
            Array.from(sectionNodes).forEach(sectionEl=>{
                const{top}=sectionEl.getBoundingClientRect();
                const key=sectionEl.getAttribute("data-id") || "";
                if(top<=TAB_HEIGHT){
                    setActiveTab(key);
                }
            })
        }
    }

    /*
    这个scroll要绑定到全局的窗口上面，要监听全局的window，不能绑定到secondsection的div上面
    因为它没有overflow的东西（？
    useEffect用于在函数组件中处理副作用。副作用是指与组件渲染结果无关的操作，比如数据获取、订阅事件、手动修改 DOM 等
    第一个参数为副作用函数，它会在组件首次渲染和每次依赖项发生变化时执行
    第二个参数是依赖数组，告诉react在啥东西发生变化的时候执行，空数组表示只在挂载和卸载的时候执行
    此处没有用到state的变化，不需要监听内容，只需要在挂载和卸载的时候启动就好了
    这里的return的清除函数只在最后组件卸载的时候才会移除，
    也就是第一次加载页面，建立监听器，监听器就一直存在了，在用户不停滚动屏幕过程中，监听器一直发挥作用，
    直到组件要卸载的时候才会执行清除函数，而不是在事件执行完之后就会执行清除函数
    */
    useEffect(()=>{
        window.addEventListener("scroll",onScroll);
        return ()=>{
            window.removeEventListener("scroll",onScroll);
        }
    },[])


    /*
    {activeTab == tab.key && <span className={styles.line} />}
    这个是点击哪里亮哪里

    现在想要页面滑动，tab自动滑动到对应的文字上，可以这样
    <span className={`${styles.line} ${activeTab  tab && 'visible'}`}
    例如，如果 activeTab 的值为真，则生成的 className 将为 "line visible"，否则只有 "line"。
    但是这种写法不是特别好，有一个库：classnames，作用是改变class的name
    {[styles.visible]:activeTab===tab.key}这里加上中括号的意思是这是一个动态的属性，涉及到类名或id名变化的时候用到
    */

    /*
    html中凡是遇到要写很多个的，都可以用{arrays.map((array)=>())}
    */
    return(
        <div className={styles.secondSection} ref={secondSectionRef}>
            <ul className={classNames({[styles.isFixed]:isFixed})}>
                {tabs.map((tab)=>(
                    <li key={tab.key} onClick={()=>activate(tab.key)}>
                        <span>{tab.title}</span>
                        <span className={classNames(styles.line, { [styles.visible]: activeTab===tab.key })}></span>
                    </li>
                ))}
            </ul>

            <div>
                {tabs.map((tab)=>(
                    <section key={tab.key} data-id={tab.key}>
                        <h2>{tab.title}</h2>
                        <img src={tab.image} alt={tab.key} />
                    </section>
                ))}
            </div>
            <div className={classNames(styles.btmWrapper,{[styles.visible]:isFixed})}>
                <img src={LogoImage} alt="Logo" />
                <a href="https://www.bilibili.com/" target="_blank" rel="noreferrer">
                    <button>App 内打开</button>
                </a>
            </div>
        </div>
    );
}

export default SecondSection;