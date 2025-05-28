import React, {useEffect, useState} from 'react';
import {Card, Button, Typography, Row, Col, Input, Space, Modal} from 'antd';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
const { Title, Paragraph } = Typography;

// Пример данных для демонстрации
const employeess = [
    {
        id: 2001,
        registrationDate: '2023-01-15',
        openContracts: 5,
        completedContracts: 10,
        lastSalaryPayment: '2023-10-01',
    },
    {
        id: 2002,
        registrationDate: '2023-02-20',
        openContracts: 3,
        completedContracts: 8,
        lastSalaryPayment: '2023-09-15',
    },
    {
        id: 2003,
        registrationDate: '2023-03-10',
        openContracts: 7,
        completedContracts: 12,
        lastSalaryPayment: '2023-11-20',
    },
];

const EmployeesList = () => {
    const [employees, setEmployees] = useState([]);
    useEffect(() => {
        setEmployees(employeess);
    }, []);

    const [isModalVisible, setIsModalVisible] = useState(false); // Видимость модального окна
    const [selectedEmployee, setSelectedEmployee] = useState(null); // Выбранный работник
    const [salary, setSalary] = useState(''); // Состояние для хранения значения зарплаты

    // Открытие модального окна для конкретного работника
    const showModal = (employee) => {
        setSelectedEmployee(employee);
        setIsModalVisible(true);
    };

    // Закрытие модального окна
    const handleCancel = () => {
        setIsModalVisible(false);
        setSalary(''); // Очищаем поле зарплаты при закрытии
    };


    //TODO СДЕЛАТЬ ЗАПРОС Обработка выплаты зарплаты
    const handlePay = () => {
        if (!salary) {
            alert('Пожалуйста, введите сумму зарплаты.');
            return;
        }
        alert(`Зарплата в размере ${salary} успешно выплачена работнику ${selectedEmployee.name}.`);
        setIsModalVisible(false);
        setSalary(''); // Очищаем поле после выплаты
    };


    const navigate = useNavigate();
    const handleViewCredits = (employeeId) => {
        navigate(`/employees/${employeeId}/credits`);
    };

    return (
        <div style={{ padding: '24px', maxWidth: '900px', margin: '0 auto' }}>

                <Typography.Title level={2}>Список работников</Typography.Title>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {employees.map(employee => (
                    <Card
                        key={employee.id}
                        title={<p style={{ textAlign: 'left', fontSize: 16 }}>Работник №{employee.id}</p>}
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
                                    style={{ borderRadius: 4 , marginRight: '25px'}}
                                    onClick={() => showModal(employee)}
                                >
                                    Выплатить зарплату
                                </Button>
                                <Button type="primary" size="middle" style={{ borderRadius: 4 }} onClick={() => {handleViewCredits(employee.id)}}>
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
                                        <strong>Количество открытых договоров:</strong>
                                        <span>{employee.openContracts}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                        <strong>Количество завершенных договоров:</strong>
                                        <span>{employee.completedContracts}</span>
                                    </div>
                                </div>
                            </Col>

                            {/* Правая колонка */}
                            <Col span={12}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                        <strong>Дата последней выплаты зарплаты:</strong>
                                        <span>{moment(employee.lastSalaryPayment).format('DD.MM.YYYY')}</span>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                ))}
            </div>
            {/* Модальное окно */}
            <Modal
                title={`Выплата зарплаты работнику ${selectedEmployee?.name || ''}`}
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
                    <label style={{ fontWeight: 'bold' }}>Зарплата:</label>
                    <Input
                        placeholder="Введите сумму"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                        type="number"
                        min="0"
                    />
                </Space>
            </Modal>
        </div>
    );
};

export default EmployeesList;