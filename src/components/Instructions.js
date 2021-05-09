import React, {useState, memo} from 'react';

import one from './InstructionsImg/1.PNG'
import two from './InstructionsImg/2.PNG'
import there from './InstructionsImg/3.PNG'
import four from './InstructionsImg/4.PNG'
import five from './InstructionsImg/5.PNG'
import six from './InstructionsImg/6.PNG'
import seven from './InstructionsImg/7.PNG'
import eight from './InstructionsImg/8.PNG'
import nine from './InstructionsImg/9.PNG'
import ten from './InstructionsImg/10.PNG'
import eleven from './InstructionsImg/11.PNG'
import twelve from './InstructionsImg/12.PNG'
import thirteen from './InstructionsImg/13.PNG'
import fourteen from './InstructionsImg/14.PNG'
import fifteen from './InstructionsImg/15.PNG'
import sixteen from './InstructionsImg/16.PNG'
import seventeen from './InstructionsImg/17.PNG'
import eighteen from './InstructionsImg/18.PNG'
import nineteen from './InstructionsImg/19.PNG'
import twenty from './InstructionsImg/20.PNG'
import twenty_one from './InstructionsImg/21.PNG'
import twenty_two from './InstructionsImg/22.PNG'

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
            <div class="box">
            	<a class="tutorial" href="#popup">Tutorial</a>
            </div>

            <div id="popup" class="overlay">
            	<div class="instructions">
            		<a class="close" href="#">&times;</a>
            		<div>
                        <a class="previous" href="#popup" onClick={previousPhoto}>Previous</a>
                        <a class="next" href="#popup" onClick={nextPhoto}>Next</a>
            		    {
                            <img
                                class="images"
                                src={instructionPhotos[currentPicture]}
                            /> 
                        }
            		</div>
            	</div>
            </div>
        </>
    )
})
