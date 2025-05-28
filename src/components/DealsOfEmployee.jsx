import React, { useEffect, useState } from 'react';
import {Card, Row, Col, Button, Typography} from 'antd';
import moment from 'moment';
import { useParams, useNavigate } from 'react-router-dom';

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

const EmployeeCreditList = () => {
    const { employeeId } = useParams();
    const [credits, setCredits] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const filteredCredits = creditss.filter((credit) => credit.employeeId === Number(employeeId));
        setCredits(filteredCredits);
    }, [employeeId]);

    return (
        <div style={{padding: '24px', width: '900px', margin: '0 auto'}}>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <Button onClick={() => {navigate('/employees')}}> Назад</Button>
                <h1 style={{zIndex: 1, color: "black", margin: "auto"}}>Кредиты работника {creditss[0].employeeId}</h1>
            </div>

            {credits.length > 0 ? (
                credits.map((credit) => (
                    <Card
                        key={credit.id}
                        title={<p style={{textAlign: 'left', fontSize: 16}}>{`Кредит №${credit.id}`}</p>}
                        style={{marginBottom: '36px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'}}
                        extra={
                            <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                                <span style={{color: credit.remainingAmount === 0 ? 'green' : 'red'}}>
                                    Статус: {credit.remainingAmount === 0 ? 'Выплачен' : 'Не выплачен'}
                                </span>
                                <Button type="primary" size="middle" style={{borderRadius: 4}} onClick={
                                    () => {
                                        navigate(`/credits/${credit.id}}`);
                                    }
                                }>
                                    Перейти
                                </Button>
                            </div>
                        }
                    >
                        <Row gutter={30}>
                            <Col span={12}>
                                <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                                    <div style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
                                        <strong>Дата получения:</strong>
                                        <span>{moment(credit.date).format('DD.MM.YYYY')}</span>
                                    </div>
                                    <div style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
                                        <strong>Дедлайн:</strong>
                                        <span>{moment(credit.deadline).format('DD.MM.YYYY')}</span>
                                    </div>
                                    <div style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
                                        <strong>Изначальная сумма:</strong>
                                        <span>{credit.initialAmount} ₽</span>
                                    </div>
                                </div>
                            </Col>
                            <Col span={12}>
                                <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                                    <div style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
                                        <strong>Остаток:</strong>
                                        <span>{credit.remainingAmount} ₽</span>
                                    </div>
                                    <div style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
                                        <strong>Идентификатор сотрудника:</strong>
                                        <span>{credit.employeeId}</span>
                                    </div>
                                    <div style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
                                        <strong>Идентификатор пользователя:</strong>
                                        <span>{credit.userId}</span>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                ))
            ) : (
                <p style={{textAlign: 'center', fontSize: 16}}>У данного работника нет кредитов.</p>
            )}
        </div>
    );
};

export default EmployeeCreditList;