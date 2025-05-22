import React, {useEffect, useState} from 'react';
import { Button, Card, Row, Col } from 'antd';
import moment from 'moment';

const creditss = [
    {
        id: 1,
        date: '2023-05-15',
        deadline: '2024-05-15',
        initialAmount: 150000,
        remainingAmount: 120000,
        userId: 1001,
        employeeId: 2001,
    },
    {
        id: 2,
        date: '2023-06-10',
        deadline: '2024-06-10',
        initialAmount: 200000,
        remainingAmount: 0,
        userId: 1002,
        employeeId: 2002,
    },
    {
        id: 3,
        date: '2023-07-01',
        deadline: '2024-07-01',
        initialAmount: 100000,
        remainingAmount: 80000,
        userId: 1003,
        employeeId: 2003,
    },
];

const CreditList = ({ role = 'employee' }) => {
    const [credits, setCredits] = useState([])
    useEffect(() => {
        setCredits(creditss)
        // TODO Вызов запроса на получение списка кредитов
    }, []);
    return (

        <div style={{ padding: '24px', width: '900px', margin: '0 auto'}}>
            {credits.map(credit => (
                <Card
                    key={credit.id} title={<p style={{ textAlign: 'left', fontSize: 16 }}>{`Кредит №${credit.id}`}</p>}
                    style={{marginBottom: '36px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',}}
                    extra={
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ color: credit.remainingAmount === 0 ? 'green' : 'red' }}>Статус: {credit.remainingAmount === 0 ? 'Выплачен' : 'Не выплачен'}</span>
                            <Button type="primary" size="middle" style={{ borderRadius: 4 }}>Перейти</Button>
                        </div>}>
                    <Row gutter={30}>
                        <Col span={12}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                    <strong>Дата получения:</strong><span>{moment(credit.date).format('DD.MM.YYYY')}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                    <strong>Дедлайн:</strong><span>{moment(credit.deadline).format('DD.MM.YYYY')}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                    <strong>Изначальная сумма:</strong><span>{credit.initialAmount} ₽</span>
                                </div>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                    <strong>Остаток:</strong>
                                    <span>{credit.remainingAmount} ₽</span>
                                </div>
                                {(role === 'user' || role === 'admin') && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                        <strong>Идентификатор сотрудника:</strong>
                                        <span>{credit.employeeId}</span>
                                    </div>
                                )}
                                {(role === 'employee' || role === 'admin') && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                        <strong>Идентификатор пользователя:</strong>
                                        <span>{credit.userId}</span>
                                    </div>
                                )}
                            </div>
                        </Col>
                    </Row>
                </Card>
            ))}
        </div>
    );
};

export default CreditList;