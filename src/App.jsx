
import './App.css'
import {useEffect, useState} from "react";
import NavigationPanel from "./components/navbar/NavBar.jsx";
import { Route, Routes} from "react-router-dom";
import ApplicationsList from "./pages/appliesList/AppliesList.jsx";
import CreditList from "./pages/creditList/CreditList.jsx";
import CreditDetailsPage from "./pages/creditDetails/CreditDetails.jsx";
import ApplyCreditForm from "./forms/applyCreditForm/ApplyCreditForm.jsx";
import RegistrationForm from "./forms/auth/RegistrationForm.jsx";
import AuthForm from "./forms/auth/AuthForm.jsx";
import EmployeeList from "./pages/employee/EmployeeList.jsx";
import EmployeeCreditList from "./components/DealsOfEmployee.jsx";
import HomePage from "./pages/homePage/HomePage.jsx";
import {parseJwt} from "./auth.js";
function App() {
    const [role, setRole] = useState(''); // Замените на реальную роль пользователя
    useEffect(() => {
        // Получаем токен из localStorage
        const token = localStorage.getItem('authToken');

        if (token) {
            // Парсим токен и извлекаем роль
            const decodedToken = parseJwt(token);

            if (decodedToken && decodedToken.role) {
                setRole(decodedToken.role); // Устанавливаем роль пользователя
            }
        }
    }, []);
    return (
        <div>
            <NavigationPanel role={role} />

                <div style={{ minHeight: '100vh', minWidth: '100vw', display: 'flex', flexDirection: 'column', backgroundColor: '#fff' }}>

                    <div style={{ flex: 1, marginTop: '60px', padding: '24px' }}>
                        <Routes>
                            <Route path="/applications" element={<ApplicationsList role={role} />} />
                            <Route path="/credits" element={<CreditList role={role} />} />
                            <Route path="/credits/:id" element={<CreditDetailsPage role={role} />} />
                            <Route path="/" element={<HomePage />}/>
                            <Route path="/apply" element={<ApplyCreditForm role={role} />} />
                            {
                                role === 'admin' && (<Route path="/employees" element={<EmployeeList />}/>)

                            }
                            {
                                role === 'admin' && (<Route path="/employees/:employeeId/credits" element={<CreditList role={role} />} />)
                            }
                            {
                                role === 'admin' && (<Route path="/employees/:employeeId/credits/:creditId" element={<EmployeeCreditList />} />)
                            }
                        </Routes>
                    </div>
                </div>

        </div>


    );
}

export default App;