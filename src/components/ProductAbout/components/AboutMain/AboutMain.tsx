import React, {
  FC,
  useCallback,
  useState,
  useRef,
  useEffect,
  useMemo,
} from "react";
import { IProductFull } from "../../../../types/types";
import { SERVER } from "../../../../const/const";
import Button from "../../../UI/Button/Button";
import { useDarkTheme } from "../../../../hooks/useDarkTheme";
import { v4 as uuid } from "uuid";

import styles from "./AboutMain.module.scss";

interface Props {
  product: IProductFull;
  section: string;
}
const AboutMain: FC<Props> = (props) => {
  const { noDark } = useDarkTheme();
  let section = props.section;
  const { product } = props;
  section = section.toLowerCase();
  const aboutInfo = product[section][0];
  const productImages = useMemo(() => {
    if (aboutInfo.images.length !== 0) {
      return [...aboutInfo.images];
    } else return [];
  }, []);
  const [sliderTransform, setSliderTransform] = useState<number>(0);
  const keepImgElement = useRef<null | HTMLImageElement>(null);

  const slide = useCallback(
    (direction: string) => {
      if (keepImgElement.current) {
        const imgWidth = keepImgElement?.current?.offsetWidth;
        const isLimitRight = Boolean(
          sliderTransform - imgWidth <= -(imgWidth * productImages.length)
        );
        const isLimitLeft = Boolean(sliderTransform === 0);

        if (direction === "left" && !isLimitLeft) {
          //@ts-ignore
          setSliderTransform((prev) => prev + imgWidth);
        }

        if (direction === "right" && !isLimitRight) {
          //@ts-ignore
          setSliderTransform((prev) => prev - imgWidth);
        }
      }
    },
    [sliderTransform, keepImgElement.current]
  );

  useEffect(() => {
    setSliderTransform(0);
    return () => {
      setSliderTransform(0);
    };
  }, [product]);

  return (
    <div className={styles.about__main}>
      {product[section].length !== 0 && (
        <>
          <div className={styles.about__main__top}>
            <div className={styles.about__main__top__imgs}>
              <div className={styles.about__main__top__imgs__slider}>
                <div
                  className={styles.slider__wrapper}
                  style={{ transform: `translateX(${sliderTransform}px)` }}
                >
                  {productImages.map((imagePath: string) => {
                    return (
                      <div
                        key={uuid()}
                        className={styles.slider__wrapper__element}
                      >
                        <img
                          ref={keepImgElement}
                          className={noDark}
                          src={`${SERVER}` + `${imagePath}`}
                          alt="productImg.png"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className={styles.about__main__top__info}>
              <span className={styles.about__main__top__info__name}>
                {product.name}
              </span>
              <span className={styles.about__main__top__info__desc}>
                {product.desc}
              </span>
              <div className={styles.about__main__top__info__separator} />
              <span className={styles.about__main__top__info__title}>
                {aboutInfo.title}
              </span>
              <span className={styles.about__main__top__info__material}>
                {aboutInfo.material}
              </span>
            </div>
          </div>
          <div className={styles.about__main__top__imgs__controls}>
            <div
              className={styles.controls__toLeft}
              onClick={() => slide("left")}
            ></div>
            <div
              className={styles.controls__toRight}
              onClick={() => slide("right")}
            ></div>
          </div>
          <div className={styles.about__main__bottom}>
            <Button className={styles.about__main__bottom__btn}>Share</Button>
            <Button className={styles.about__main__bottom__btn}>Save</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default AboutMain;
