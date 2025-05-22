import React, {useEffect, useState} from 'react';
import { Card, Button, Typography, Row, Col } from 'antd';
import moment from 'moment';

const { Title, Paragraph } = Typography;

// Пример данных для демонстрации
const employeess = [
    {
        id: 1,
        registrationDate: '2023-01-15',
        openContracts: 5,
        completedContracts: 10,
        lastSalaryPayment: '2023-10-01',
    },
    {
        id: 2,
        registrationDate: '2023-02-20',
        openContracts: 3,
        completedContracts: 8,
        lastSalaryPayment: '2023-09-15',
    },
    {
        id: 3,
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
                            <Button type="primary" size="middle" style={{ borderRadius: 4 }}>
                                Перейти
                            </Button>
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
        </div>
    );
};

export default EmployeesList;