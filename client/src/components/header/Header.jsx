import { MdLocalShipping } from 'react-icons/md';
import { FiHeart, FiShoppingBag } from 'react-icons/fi';

import React, { useState, useEffect } from 'react';
import {
  HeaderOuter,
  HeaderInner,
  Logo,
  Nav,
  ThirdInnerContainer,
  Search,
  WishlistButton,
  ShopButton,
  Slideshow,
  BannerSlider,
  Slide,
  BannerText,
  BannerLink,
} from '../../theme/headerStyle.js';

const banner1 = (
  <Slide>
    <BannerText>
      Free Shipping + Returns, Free Membership, Exclusive Products
    </BannerText>
    <BannerLink>Join Now</BannerLink>
  </Slide>
);

const banner2 = (
  <Slide>
    <BannerText>Save Up to 40%</BannerText>
    <BannerLink>Shop All Our New Markdowns</BannerLink>
  </Slide>
);

export default function Header() {
  const banners = [banner1, banner2];
  const delay = 2500;

  const [index, setIndex] = useState(0);

  useEffect(() => {
    setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === banners.length - 1 ? 0 : prevIndex + 1,
        ),
      delay,
    );
    return () => {};
  }, [index]);

  return (
    <>
      <HeaderOuter>
        <HeaderInner>
          <Logo>
            <h1>CAMINITO</h1>
          </Logo>

          <div>
            <Nav>New Releases</Nav>
            <Nav>Men</Nav>
            <Nav>Women</Nav>
            <Nav>Kids</Nav>
          </div>

          <ThirdInnerContainer>
            <Search>
              <input type="text" placeholder="Search" />
            </Search>

            <div>
              <WishlistButton />
              <ShopButton />
            </div>
          </ThirdInnerContainer>

        </HeaderInner>
      </HeaderOuter>

      <Slideshow>
        <BannerSlider
          style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
        >
          {banners.map((banner) => banner)}
        </BannerSlider>
      </Slideshow>
    </>
  );
}