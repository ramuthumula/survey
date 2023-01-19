import reactDom from "react-dom";
import { BrowserRouter,Route,Routes } from "react-router-dom";

const Routes=()=>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/UserHome" element={<UserHome />}/>
            </Routes>
        </BrowserRouter>
    );
}