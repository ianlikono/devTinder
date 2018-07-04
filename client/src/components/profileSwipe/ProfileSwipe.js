import { Button, Card, Carousel } from 'antd';
import React from 'react';
import styled from 'styled-components';

const buttonStyles = {
  width: 200,
  background: 'linear-gradient(262deg, #ff7854, #fd267d)',
  borderColor: '#ff7854',
  boxShadow: '0 3px 10px 0 rgba(0, 17, 25, 0.27)',
  letterSpacing: '.02em',
  fontWeight: 600,
  borderRadius: 200,
};

const Wrapper = styled.div`
  background: #d8d6d6;
  width: 80vw;
  border-left: 5px solid #e5e9ec;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CarouselContent = styled.div`
  text-align: center;
  line-height: 400px;
  background: #364d79;
  overflow: hidden;
`;

function onChange(a, b, c) {
  console.log(a, b, c);
}

export default () => (
  <Wrapper>
    <Button size="large" style={buttonStyles}>
      Edit Info
    </Button>
    <Card hoverable style={{ width: 450, height: 550 }}>
      <Carousel afterChange={onChange}>
        <CarouselContent>
          <h3>
1
          </h3>
        </CarouselContent>
        <CarouselContent>
          <h3>
2
          </h3>
        </CarouselContent>
        <CarouselContent>
          <h3>
3
          </h3>
        </CarouselContent>
        <CarouselContent>
          <h3>
4
          </h3>
        </CarouselContent>
      </Carousel>
    </Card>
  </Wrapper>
);
