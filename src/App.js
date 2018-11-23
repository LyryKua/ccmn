import React, {Component} from 'react';

// import SearchAppBar from './SearchAppBar';

import MyAppBar from './MyAppBar';
import MyNavBar from './MyNavBar';
import MyDrawer from './MyDrawer';

class App extends Component {
    render() {
        return (
            <div>
                {/*<MyAppBar/>*/}
                <MyDrawer/>
                {/*<MyNavBar/>*/}
            </div>
        );
    }
}

export default App;
