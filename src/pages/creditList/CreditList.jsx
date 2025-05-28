import React, { useEffect, useState } from 'react';
import { Button, Card, Row, Col } from 'antd';
import moment from 'moment';
import {useNavigate, useParams} from 'react-router-dom';
import {getDeals, getDealsOfUser} from '../../api'; // Импортируем функцию getDeals

const CreditList = ({ role  }) => {
    const [credits, setCredits] = useState([]); // Состояние для хранения кредитов
    const navigate = useNavigate();
    const {employeeId} = useParams();
    useEffect(() => {
        // Вызываем функцию getDeals для получения списка кредитов
        const fetchCredits = async () => {
            try {
                if (role === 'user' || role === 'employee'){
                    getDeals().then(
                        (data) => {
                            const mappedData = data.map((item) => ({
                                id: item.id,
                                date: item.issued_at, // Преобразуем issued_at в date
                                deadline: item.return_at, // Преобразуем return_at в deadline
                                initialAmount: item.sum, // Преобразуем sum в initialAmount
                                remainingAmount: item.status === 'active' ? item.sum : 0, // Остаток зависит от статуса
                                userId: item.user_id, // Преобразуем user_id в userId
                                employeeId: item.employee_id, // Преобразуем employee_id в employeeId
                                currency: item.currency, // Добавляем валюту
                                percent: item.percent, // Добавляем процент
                            }));

                            setCredits(mappedData);
                        }
                    ); // Получаем данные с бекенда
                } else {
                    getDealsOfUser(employeeId).then(
                        (data) => {
                            const mappedData = data.map((item) => ({
                                id: item.id,
                                date: item.issued_at, // Преобразуем issued_at в date
                                deadline: item.return_at, // Преобразуем return_at в deadline
                                initialAmount: item.sum, // Преобразуем sum в initialAmount
                                remainingAmount: item.status === 'active' ? item.sum : 0, // Остаток зависит от статуса
                                userId: item.user_id, // Преобразуем user_id в userId
                                employeeId: item.employee_id, // Преобразуем employee_id в employeeId
                                currency: item.currency, // Добавляем валюту
                                percent: item.percent, // Добавляем процент
                            }));

                            setCredits(mappedData);
                        }
                    ); // Получаем данные с бекенда
                }



                // Преобразуем данные в нужный формат
                 // Сохраняем преобразованные данные в состояние
            } catch (error) {
                console.error('Не удалось загрузить список кредитов:', error);
            }
        };

        fetchCredits(); // Вызываем функцию при монтировании компонента
    }, []); // Пустой массив зависимостей — вызывается только один раз

    return (
        <div style={{ padding: '24px', width: '900px', margin: '0 auto' }}>
            <div style={{ marginBottom: 25, display: "flex", justifyContent: 'space-between' }}>
                <Button key="back" onClick={() => navigate(-1)}>
                    Назад
                </Button>
                {!!employeeId && (<p>Список договоров работника</p>)}
            </div>

            {credits.length > 0 ? (
                credits.map((credit) => (
                    <Card
                        key={credit.id}
                        title={<p style={{ textAlign: 'left', fontSize: 16 }}>{`Кредит №${credit.id}`}</p>}
                        style={{ marginBottom: '36px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)' }}
                        extra={
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{ color: credit.remainingAmount === 0 ? 'green' : 'red' }}>
                                    Статус: {credit.remainingAmount === 0 ? 'Выплачен' : 'Не выплачен'}
                                </span>
                                <Button
                                    type="primary"
                                    size="middle"
                                    style={{ borderRadius: 4 }}
                                    onClick={() => {
                                        navigate(`/credits/${credit.id}`);
                                    }}
                                >
                                    Перейти
                                </Button>
                            </div>
                        }
                    >
                        <Row gutter={30}>
                            <Col span={12}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                        <strong>Дата получения:</strong>
                                        <span>{moment(credit.date).format('DD.MM.YYYY')}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                        <strong>Дедлайн:</strong>
                                        <span>{moment(credit.deadline).format('DD.MM.YYYY')}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                        <strong>Изначальная сумма:</strong>
                                        <span>{credit.initialAmount} {credit.currency}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                        <strong>Процентная ставка:</strong>
                                        <span>{credit.percent}%</span>
                                    </div>
                                </div>
                            </Col>
                            <Col span={12}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                        <strong>Остаток:</strong>
                                        <span>{credit.remainingAmount} {credit.currency}</span>
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
                ))
            ) : (
                <p style={{ textAlign: 'center', fontSize: 16, color: "black" }}>Нет доступных кредитов.</p>
            )}
        </div>
    );
};

export default CreditList;