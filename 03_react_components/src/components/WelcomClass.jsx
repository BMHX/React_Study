import { Component} from 'react';
import PropType from 'prop-types';

class Welcomeclass extends Component {
    render() {
        return (
            <h1> hello ,{this.props.name} </h1>
        );
    }
}

Welcomeclass.propTypes = {
    name: PropType.string,
};

export default Welcomeclass;