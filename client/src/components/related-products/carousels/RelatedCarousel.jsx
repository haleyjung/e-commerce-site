import { BsArrowRight, BsArrowLeft } from 'react-icons/bs';

import React, { useState, useEffect } from 'react';
import ComparisonModal from '../subcomponents/ComparisonModal.jsx';
import RelatedCard from './RelatedCard.jsx';

import {
  CardsWrapper,
  ContentWrapper,
  Content,
} from '../../../theme/carouselStyle.js';

import {
  LeftChevron,
  RightChevron,
  ScaledLeftArrow,
  ScaledRightArrow,
  DeactivatedLeftChevron,
  DeactivatedRightChevron,
} from '../../../theme/buttonStyle.js';

export default function RelatedCarousel({
  products,
  mainProduct,
  handleProductChange,
  setWishlistProducts,
  wishlistProducts,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(products.length);
  const [modal, setModal] = useState({
    display: false,
    clickedProduct: {},
  });

  const { display, clickedProduct } = modal;

  // determines the initial number of product cards maxDisplayCountn on page
  const maxDisplayCount = 4;

  // determines the total number of cards
  useEffect(() => {
    setLength(products.length);
  }, [products]);

  const toggleModal = (product) => {
    setModal({
      display: !display,
      clickedProduct: product,
    });
  };

  const next = () => {
    if (currentIndex < length - maxDisplayCount) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 27) {
      toggleModal();
    }
  };

  return (
    <div>
      <CardsWrapper>
        {/* {currentIndex > 0 && (
          <LeftChevron className="left-arrow" onClick={prev}>
            <ScaledLeftArrow />
          </LeftChevron>
        )} */}

        { length <= maxDisplayCount
          ? (<div></div>)
          : currentIndex > 0 ? (
          <LeftChevron className="left-arrow" onClick={prev}>
            <ScaledLeftArrow />
          </LeftChevron>
        ) : (
          <DeactivatedLeftChevron className="left-arrow">
            <ScaledLeftArrow />
          </DeactivatedLeftChevron>
        )}

        <ContentWrapper>
          <Content
            style={{
              transform: `translateX(-${currentIndex * (100 / maxDisplayCount)}%)`,
            }}
          >
            <RelatedCard
              maxDisplayCount={maxDisplayCount}
              products={products}
              toggleModal={toggleModal}
              handleKeyDown={handleKeyDown}
              handleProductChange={handleProductChange}
              wishlistProducts={wishlistProducts}
              setWishlistProducts={setWishlistProducts}
            />
          </Content>
        </ContentWrapper>

        {/* {currentIndex < length - maxDisplayCount && (
          <RightChevron className="right-arrow" onClick={next}>
            <ScaledRightArrow />
          </RightChevron>
        )} */}

          { length <= maxDisplayCount
            ? (<div></div>)
            : currentIndex < length - maxDisplayCount ? (
            <RightChevron className="right-arrow" onClick={next}>
              <ScaledRightArrow />
            </RightChevron>
          ) : (
            <DeactivatedRightChevron className="right-arrow">
              <ScaledRightArrow />
            </DeactivatedRightChevron>
          )}

      </CardsWrapper>

      {display && (
        <ComparisonModal
          toggleModal={toggleModal}
          product={clickedProduct}
          mainProduct={mainProduct}
        />
      )}
    </div>
  );
}
