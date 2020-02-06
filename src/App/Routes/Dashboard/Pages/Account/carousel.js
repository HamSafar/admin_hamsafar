import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap'

class Carousel extends Component {
    state = {
        index: 0,
        direction: null
    }
  
    handleSelect = (selectedIndex, e) => {
        this.setState({
            index: selectedIndex,
            direction: e.direction
        })
    };

    render() {
        return (
            <Carousel 
                activeIndex={this.state.index} 
                direction={this.state.direction} 
                onSelect={this.handleSelect}
                style={{
                    background: 'blue',
                    height: '100%'
                }}
            >
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="https://irancook.ir/wp-content/uploads/2019/09/%D8%A7%DA%A9%D8%A8%D8%B1-%D8%AC%D9%88%D8%AC%D9%87-640x480.jpg"
                    alt="First slide"
                    />
                    <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="https://cdnw.elicdn.com/Blog/wp-content/uploads/2019/02/32423.jpg"
                    alt="Second slide"
                    />

                    <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="https://blog.okala.com/wp-content/uploads/2019/06/%D8%B7%D8%B1%D8%B2-%D8%AA%D9%87%DB%8C%D9%87-%D8%A7%DA%A9%D8%A8%D8%B1-%D8%AC%D9%88%D8%AC%D9%87.jpg"
                    alt="Third slide"
                    />

                    <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                    </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        );
    }
}

export default Carousel;