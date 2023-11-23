import {FC, useState} from "react";
import classNames from "classnames";
import CartoonImage from "../../assets/cartoon.jpg";
import MovieImage from "../../assets/movie.png";
import StudyImage from "../../assets/study.jpg";
import FoodImage from "../../assets/food.jpg";
import styles from "./styles.module.scss";

const SecondSection: FC = () => {
    const[activeTab,setActiveTab]=useState<string>("cartoon");

    //总是复制tabs（下划线）是很麻烦的，可以把tabs抽出来作为一个数据,[{},{},{}]
    const tabs=[
        {
            key:"cartoon",
            title:"动画",
        },
        {
            key:"food",
            title:"美食",
        },
        {
            key:"movie",
            title:"电影",
        },
        {
            key:"study",
            title:"学习",
        }
    ]

    /*
    {activeTab == tab.key && <span className={styles.line} />}
    这个是点击哪里亮哪里

    现在想要页面滑动，tab自动滑动到对应的文字上，可以这样
    <span className={`${styles.line} ${activeTab  tab && 'visible'}`}
    例如，如果 activeTab 的值为真，则生成的 className 将为 "line visible"，否则只有 "line"。
    但是这种写法不是特别好，有一个库：classnames，作用是改变class的name
    */
    return(
        <div className={styles.secondSection}>
            <ul>
                {tabs.map((tab)=>(
                    <li key={tab.key} onClick={()=>setActiveTab(tab.key)}>
                        <span>{tab.title}</span>
                        <span className={classNames(styles.line, {[styles.visible]:activeTab===tab.key})} />
                    </li>
                ))}
            </ul>

            <div>
                <section>
                    <h2>动画</h2>
                    <img src={CartoonImage} alt="cartoon" />
                </section>
                <section>
                    <h2>美食</h2>
                    <img src={FoodImage} alt="food" />
                </section>
                <section>
                    <h2>电影</h2>
                    <img src={MovieImage} alt="movie" />
                </section>
                <section>
                    <h2>学习</h2>
                    <img src={StudyImage} alt="study" />
                </section>
            </div>
        </div>
    );
}

export default SecondSection;