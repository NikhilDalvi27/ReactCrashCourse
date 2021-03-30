import PropTypes from 'prop-types'
import Button from "./Button";
import { useLocation } from 'react-router-dom';

//todo Note in the input parameter
// the passed object (Prop in this case) is destructured

//todo inline styles are mainpulated using {{}}
// BUT using a function you can do it using {}
// <h1 style={headingStyle}>{title}</h1>



const Header  = ({title , onAdd ,showAdd})=>{
    const location = useLocation();

    return (
        <header className='header'>
            <h1>{title}</h1>
            {location.pathname==='/' &&
                <Button color={showAdd ? 'red' : 'green'} text={showAdd ? 'Close' : 'Add'} onClick={onAdd}/>}
        </header>
    )
}


//todo Props are basically like parameters
// these are default props in case if the props
// are not passed to the component

Header.defaultProps ={
    title: 'Task Tracker'
}


//todo this is kind of default variable type for particular property of the input Prop
// and to mention if a prop is required or not
Header.propTypes = {
    title: PropTypes.string.isRequired,
}

// todo this for applying external styling in JS
//  const headingStyle ={
//     color :'red',
//     backgroundColor:'black'
// }


export default Header