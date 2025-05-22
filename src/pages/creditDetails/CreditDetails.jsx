// Детали кредита:
//      Идентификатор
//      Статус: [Погашен/Не погашен]
//      Сумма
//      Валюта
//      Процентная ставка
//      Дата выдачи
//      Дата возврата
//      Остаток по кредиту
//      Крайний срок выплаты по кредиту
//      Список платежей
//      Под капотом:
//         [Для пользователя|Администратора]: Идентификатор работника
//         [Для работника|Администратора]: Идентификатор пользователя
//      Список платежей
//      Список просрочек

import React, {useEffect, useState} from 'react';
import { Card, Typography, Row, Col, Button } from 'antd';
import moment from 'moment';
import HistoryPaymentsTabs from "../../components/historyPaymentTabs/historyPaymentsTabs.jsx";


const { Title, Paragraph } = Typography;

const creditDetails = {
    id: 1,
    status: 'Не погашен',
    amount: 150000,
    currency: '₽',
    interestRate: '12%',
    issueDate: '2023-05-15',
    returnDate: '2024-05-15',
    remainingAmount: 120000,
    deadline: '2024-06-10',
    payments: [
        {
            id: 1,
            status: 'Успешно',
            amount: 15000,
            paymentMethod: 'Банковский перевод',
            paymentDate: '2023-06-15',
            creditId: 1,
        },
        {
            id: 2,
            status: 'Успешно',
            amount: 15000,
            paymentMethod: 'Карта',
            paymentDate: '2023-07-15',
            creditId: 1,
        },
        {
            id: 3,
            status: 'Не успешно',
            amount: 15000,
            paymentMethod: 'Наличные',
            paymentDate: '2023-08-15',
            creditId: 1,
        },
    ],
    overdue: [
        {
            id: 1,
            status: 'Не оплачено',
            amount: 15000,
            chargeDate: '2023-09-01',
            creditId: 1,
        },
        {
            id: 2,
            status: 'Оплачено',
            amount: 15000,
            chargeDate: '2023-09-10',
            creditId: 1,
        },
    ],
    employeeId: 2001,
    userId: 1001,
};

const CreditDetailsPage = ({ role = 'admin' }) => {

    const [credit, setCredit] = useState({})
    const [overdue, setOverdue] = useState([])
    const [payments, setPayments] = useState([])


    useEffect(() => {
        setCredit(creditDetails)
        setPayments(creditDetails.payments)
        setOverdue(creditDetails.overdue);
    }, []);
    return (
        <div style={{ padding: '24px', width: '900px', margin: '0 auto' }}>
            {/* Верхняя карточка */}
            <Card
                style={{
                    marginBottom: 24,
                    borderRadius: 12,
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                }}
                extra={
                    <div style={{ display: 'flex',  justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                        <strong>Статус:</strong>
                        <span style={{textAlign: 'left',color: creditDetails.status === 'Не погашен' ? 'red' : 'green'}}>
                            {creditDetails.status}
                        </span>
                        {creditDetails.status === 'Не погашен' ? (
                            role === 'user' ? (
                                <Button type="primary" size="middle" style={{ borderRadius: 4 }}>
                                    Внести платёж
                                </Button>
                            ) : role === 'employee' ? (
                                <Button type="primary" size="middle" style={{ borderRadius: 4 }}>
                                    Начислить просрочку
                                </Button>
                            ) : null
                        ) : null}
                    </div>
                    }
                title={
                    <div style={{ display: 'flex',  justifyContent: 'left', alignItems: 'center', gap: '10px' }}>
                        <span>Договор №{creditDetails.id}</span>
                    </div>}>
                <Row gutter={20}>
                    <Col span={12} style={{textAlign: 'left'}}>
                    <Paragraph>
                            <strong>Сумма кредита:</strong> {credit.amount} ₽
                        </Paragraph>
                        <Paragraph>
                            <strong>Дата выдачи:</strong> {moment(credit.issueDate).format('DD.MM.YYYY')}
                        </Paragraph>
                        <Paragraph>
                            <strong>Остаток:</strong> {credit.remainingAmount} ₽
                        </Paragraph>
                        {(role === 'user' || role === 'admin') && (
                            <Paragraph>
                                <strong>Идентификатор сотрудника:</strong> {creditDetails.employeeId}
                            </Paragraph>
                        )}
                    </Col>
                    <Col span={12} style={{textAlign: 'left'}}>
                        <Paragraph>
                            <strong>Процентная ставка:</strong> {credit.interestRate}
                        </Paragraph>
                        <Paragraph>
                            <strong>Дата возврата:</strong> {moment(credit.returnDate).format('DD.MM.YYYY')}
                        </Paragraph>
                        <Paragraph>
                            <strong>Крайний срок:</strong> {moment(credit.deadline).format('DD.MM.YYYY')}
                        </Paragraph>
                        {(role === 'employee' || role === 'admin') && (
                            <Paragraph>
                                <strong>Идентификатор пользователя:</strong> {credit.userId}
                            </Paragraph>
                        )}
                    </Col>
                </Row>
            </Card>
            <Card
                title="История платежей"
                style={{
                    borderRadius: 12,
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                    marginBottom: 24,
                }}>
                <HistoryPaymentsTabs payments={payments}  overdue={overdue} />
            </Card>
        </div>
    );
};

export default CreditDetailsPage;