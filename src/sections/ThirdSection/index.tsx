import {FC} from "react";
import Title1Image from "../../assets/title1.jpg";
import Title2Image from "../../assets/title2.jpg";
import CommonImage from "../../assets/comment.jpg";
import styles from "./styles.module.scss";

const ThirdSection: FC = () => {
    return(
        <div className={styles.thirdSection}>
            <img src={Title1Image} alt="Title 1" />
            <img className={styles.comment} src={CommonImage} alt="Comment" />
            <img src={Title2Image} alt="Title 2" />
            <img className={styles.comment} src={CommonImage} alt="Comment" />
        </div>
    );
}

export default ThirdSection;