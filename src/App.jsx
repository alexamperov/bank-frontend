
import './App.css'
import {useState} from "react";
import NavigationPanel from "./components/navbar/NavBar.jsx";
import { Route, Routes} from "react-router-dom";
import ApplicationsList from "./pages/appliesList/AppliesList.jsx";
import CreditList from "./pages/creditList/CreditList.jsx";
import CreditDetailsPage from "./pages/creditDetails/CreditDetails.jsx";
import ApplyCreditForm from "./forms/applyCreditForm/ApplyCreditForm.jsx";
import RegistrationForm from "./forms/auth/RegistrationForm.jsx";
import AuthForm from "./forms/auth/AuthForm.jsx";
import EmployeeList from "./pages/employee/EmployeeList.jsx";
function App() {
    const [role] = useState('admin'); // Замените на реальную роль пользователя

    return (
        <div>
            <NavigationPanel role={role} />

                <div style={{ minHeight: '100vh', minWidth: '100vw', display: 'flex', flexDirection: 'column', backgroundColor: '#fff' }}>

                    <div style={{ flex: 1, marginTop: '60px', padding: '24px' }}>
                        <Routes>
                            <Route path="/applications" element={<ApplicationsList role={role} />} />
                            <Route path="/credits" element={<CreditList role={role} />} />
                            <Route path="/credits/:id" element={<CreditDetailsPage role={role} />} />
                            <Route path="/cr" element={<CreditDetailsPage role={role} />} />
                            <Route path="/c" element={<ApplyCreditForm />} />
                            <Route path="/register" element={<RegistrationForm />}/>
                            <Route path="/auth" element={<AuthForm />}/>
                            {
                                role === 'admin' && (<Route path="/employees" element={<EmployeeList />}/>)
                            }

                        </Routes>
                    </div>
                </div>

        </div>


    );
}

export default App;