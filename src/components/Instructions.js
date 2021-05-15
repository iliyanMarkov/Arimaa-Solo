import React, {useState, memo} from 'react';

import one from './InstructionsImg/1.JPG'
import two from './InstructionsImg/2.JPG'
import there from './InstructionsImg/3.JPG'
import four from './InstructionsImg/4.JPG'
import five from './InstructionsImg/5.JPG'
import six from './InstructionsImg/6.JPG'
import seven from './InstructionsImg/7.JPG'
import eight from './InstructionsImg/8.JPG'
import nine from './InstructionsImg/9.JPG'
import ten from './InstructionsImg/10.JPG'
import eleven from './InstructionsImg/11.JPG'
import twelve from './InstructionsImg/12.JPG'
import thirteen from './InstructionsImg/13.JPG'
import fourteen from './InstructionsImg/14.JPG'
import fifteen from './InstructionsImg/15.JPG'
import sixteen from './InstructionsImg/16.JPG'
import seventeen from './InstructionsImg/17.JPG'
import eighteen from './InstructionsImg/18.JPG'
import nineteen from './InstructionsImg/19.JPG'
import twenty from './InstructionsImg/20.JPG'
import twenty_one from './InstructionsImg/21.JPG'
import twenty_two from './InstructionsImg/22.JPG'

const instructionPhotos = {
    1: one,
    2: two,
    3: there,
    4: four,
    5: five,
    6: six,
    7: seven,
    8: eight,
    9: nine,
    10: ten,
    11: eleven,
    12: twelve,
    13: thirteen,
    14: fourteen,
    15: fifteen,
    16: sixteen,
    17: seventeen,
    18: eighteen,
    19: nineteen,
    20: twenty,
    21: twenty_one,
    22: twenty_two,
}

export const Instructions = memo(() => {
    const [currentPicture, setCurrentPicture] = useState(1)

    const nextPhoto = ()  => {
        if (currentPicture < 22) {
            setCurrentPicture(currentPicture + 1)
        }
    }
    
    const previousPhoto = ()  => {
        if (currentPicture > 1) {
            setCurrentPicture(currentPicture - 1)
        }
    } 

    return ( 
        <>
            <div className="box">
            	<a className="tutorial" href="#popup">Tutorial</a>
            </div>

            <div id="popup" className="overlay">
            	<div className="instructions">
            		<a className="close" href="http://localhost:3000/#">&times;</a>
            		<div>
                        <a className="previous" href="#popup" onClick={previousPhoto}>Previous</a>
                        <a className="next" href="#popup" onClick={nextPhoto}>Next</a>
            		    {
                            <img
                                alt='The instruction images'
                                className="images"
                                src={instructionPhotos[currentPicture]}
                            /> 
                        }
            		</div>
            	</div>
            </div>
        </>
    )
})
