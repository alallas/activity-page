import {FC} from "react";
import CartoonImage from "../../assets/cartoon.jpg";
import MovieImage from "../../assets/movie.png";
import StudyImage from "../../assets/study.jpg";
import FoodImage from "../../assets/food.jpg";
import styles from "./styles.module.scss";

const SecondSection: FC = () => {
    return(
        <div className={styles.secondSection}>
            <ul>
                <li>动画</li>
                <li>美食</li>
                <li>电影</li>
                <li>生活</li>
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
                    <h2>生活</h2>
                    <img src={StudyImage} alt="study" />
                </section>
            </div>
        </div>
    );
}

export default SecondSection;