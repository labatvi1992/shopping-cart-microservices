import { FC } from 'react';
import { BasicCarousel } from '../../base';
import image1 from '../../assets/carousel/slide-1.png';
import image2 from '../../assets/carousel/slide-2.png';
import image3 from '../../assets/carousel/slide-3.png';
import image4 from '../../assets/carousel/slide-4.png';
import image5 from '../../assets/carousel/slide-5.png';
import product1 from '../../assets/product/product-1.jpg';
import product2 from '../../assets/product/product-2.jpg';
import product3 from '../../assets/product/product-3.jpg';
import product4 from '../../assets/product/product-4.jpg';
import product5 from '../../assets/product/product-5.jpg';

const images = [image1, image2, image3, image4, image5];
const products = [product1, product2, product3, product4, product5];

const Home: FC = () => {
    return (
        <div className="home-page">
            <div className="main-section">
                <BasicCarousel
                    numberToShow={1}
                    numerToScroll={1}
                    autoplay
                    showDot
                    data={[
                        { image: images[0] },
                        { image: images[1] },
                        { image: images[2] },
                        { image: images[3] },
                        { image: images[4] },
                    ]}
                    renderItem={(item, itemIndex) => {
                        return <img key={itemIndex} style={{ flex: 1 }} src={item.image} alt="" />;
                    }}
                />
            </div>
            <div className="main-section">
                <div className="title">Sản phẩm nổi bật</div>
                <div className="body">
                    <BasicCarousel
                        numberToShow={5}
                        numerToScroll={5}
                        autoplay={false}
                        showDot={false}
                        data={[
                            { image: products[0] },
                            { image: products[1] },
                            { image: products[2] },
                            { image: products[3] },
                            { image: products[4] },
                        ]}
                        renderItem={(item, itemIndex) => {
                            return (
                                <div key={itemIndex} style={{ display: 'flex', flexDirection: 'column' }}>
                                    <img src={item.image} width={200} height={200} />
                                </div>
                            );
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
