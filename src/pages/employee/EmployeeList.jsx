import React, { useEffect, useState } from 'react';
import { Card, Button, Typography, Row, Col, Input, Space, Modal, Spin } from 'antd';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { getEmployees } from '../../api'; // Укажите правильный путь к вашему API


const { Title } = Typography;

const EmployeesList = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Состояния для модального окна
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [salary, setSalary] = useState('');

    const navigate = useNavigate();

    // Загрузка работников с бэкенда
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const data = await getEmployees(); // Вызов API
                console.log(data)
                // Преобразование полей в нужный формат
                const normalizedData = data.map(emp => ({
                    id: emp.id,
                    fullName: `${emp.first_name} ${emp.last_name}`,
                    email: emp.email,
                    role: emp.user_role,
                    registrationDate: emp.created_at,
                    // Пример подстановки данных, если их нет в ответе
                    openContracts: emp.open_contracts || 0,
                    completedContracts: emp.completed_contracts || 0,
                    lastSalaryPayment: emp.last_salary_payment || null
                }));
                setEmployees(normalizedData);
            } catch (err) {
                setError(`Не удалось загрузить список работников: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    // Открытие модального окна
    const showModal = (employee) => {
        setSelectedEmployee(employee);
        setIsModalVisible(true);
    };

    // Закрытие модального окна
    const handleCancel = () => {
        setIsModalVisible(false);
        setSalary('');
    };

    // Обработка выплаты зарплаты
    const handlePay = async () => {
        if (!salary || isNaN(salary) || Number(salary) <= 0) {
            alert('Пожалуйста, введите корректную сумму зарплаты.');
            return;
        }

        try {
            //await paySalary(selectedEmployee.id, salary);
            alert(`Зарплата в размере ${salary} успешно выплачена.`);
            setIsModalVisible(false);
            setSalary('');
        } catch (err) {
            alert(`Ошибка при выплате зарплаты: ${err.message}`);
        }
    };

    // Переход к кредитам
    const handleViewCredits = (employeeId) => {
        navigate(`/employees/${employeeId}/credits`);
    };

    return (
        <div style={{ padding: '24px', maxWidth: '900px', margin: '0 auto' }}>
            <Title level={2}>Список работников</Title>

            {/* Индикатор загрузки */}
            {loading && (
                <div style={{ textAlign: 'center', marginTop: 50 }}>
                    <Spin size="large" />
                    <p>Загрузка данных...</p>
                </div>
            )}

            {/* Сообщение об ошибке */}
            {error && (
                <div style={{ color: 'red', textAlign: 'center', marginTop: 30 }}>
                    <p>{error}</p>
                </div>
            )}

            {/* Список работников */}
            {!loading && !error && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                    {employees.map(employee => (
                        <Card
                            key={employee.id}
                            title={<p style={{ textAlign: 'left', fontSize: 16 }}>Работник: {employee.fullName}</p>}
                            style={{
                                marginBottom: '36px',
                                borderRadius: 12,
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                            }}
                            extra={
                                <div>
                                    <Button
                                        type="primary"
                                        size="middle"
                                        style={{ borderRadius: 4, marginRight: '25px' }}
                                        onClick={() => showModal(employee)}
                                    >
                                        Выплатить зарплату
                                    </Button>
                                    <Button
                                        type="primary"
                                        size="middle"
                                        style={{ borderRadius: 4 }}
                                        onClick={() => handleViewCredits(employee.id)}
                                    >
                                        Перейти
                                    </Button>
                                </div>
                            }
                        >
                            <Row gutter={30}>
                                {/* Левая колонка */}
                                <Col span={12}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                            <strong>Дата регистрации:</strong>
                                            <span>{moment(employee.registrationDate).format('DD.MM.YYYY')}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                            <strong>Открытые договоры:</strong>
                                            <span>{employee.openContracts}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                            <strong>Завершенные договоры:</strong>
                                            <span>{employee.completedContracts}</span>
                                        </div>
                                    </div>
                                </Col>

                                {/* Правая колонка */}
                                <Col span={12}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                            <strong>Email:</strong>
                                            <span>{employee.email}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                            <strong>Последняя выплата:</strong>
                                            <span>
                                                {employee.lastSalaryPayment
                                                    ? moment(employee.lastSalaryPayment).format('DD.MM.YYYY')
                                                    : 'Не было'}
                                            </span>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                    ))}
                </div>
            )}

            {/* Модальное окно для выплаты зарплаты */}
            <Modal
                title={`Выплата зарплаты работнику: ${selectedEmployee?.fullName || ''}`}
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Назад
                    </Button>,
                    <Button key="pay" type="primary" onClick={handlePay}>
                        Выплатить
                    </Button>,
                ]}
            >
                <Space direction="vertical" style={{ width: '100%' }}>
                    <label style={{ fontWeight: 'bold' }}>Сумма зарплаты:</label>
                    <Input
                        placeholder="Введите сумму"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                        type="number"
                        min="0"
                        style={{ width: '100%' }}
                    />
                </Space>
            </Modal>
        </div>
    );
};

export default EmployeesList;