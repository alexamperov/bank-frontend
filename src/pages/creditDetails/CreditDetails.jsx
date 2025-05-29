import React, { useEffect, useState } from 'react';
import {Card, Typography, Row, Col, Button, message} from 'antd';
import moment from 'moment';
import { useNavigate, useParams } from "react-router-dom";
import {getDealByID, getPayments, getDelays, createPayment} from '../../api';
import PayForm from '../../forms/payForm';
import HistoryPaymentsTabs from "../../components/historyPaymentTabs/historyPaymentsTabs.jsx"; // Исправленный импорт формы

const { Title, Paragraph } = Typography;

const CreditDetailsPage = ({ role = 'admin' }) => {
    const [credit, setCredit] = useState({});
    const [payments, setPayments] = useState([]);
    const [overdue, setOverdue] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false); // Состояние для модального окна
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dealData = await getDealByID(id);
                setCredit(dealData);
                setPayments(await getPayments(id));
                setOverdue(await getDelays(id));
                console.log(dealData)
            } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
            }
        };
        fetchData();
    }, [id]);

    if (!credit) {
        return <p style={{ textAlign: 'center', fontSize: 16 }}>Загрузка данных...</p>;
    }

    // Функция для обработки платежа
    const handlePay = async (amount) => {
        try {
            // Здесь вызовите API для внесения платежа, например:
            // await apiClient.post('/payments', { deal_id: id, amount });
            createPayment(id, amount ).then(() => {
                getPayments(id).then(res => {setPayments(res)});
                setIsModalVisible(false);
            })
            message.success(`Платеж на сумму ${amount} ${credit.currency} успешно внесен`);
            // После успешного платежа обновите данные
            const updatedPayments = await getPayments(id);
            setPayments(updatedPayments);
            setIsModalVisible(false);
        } catch (error) {
            message.error('Ошибка при внесении платежа');
            console.error('Ошибка:', error);
        }
    };

    return (
        <div style={{ padding: '24px', width: '900px', margin: '0 auto' }}>
            {/* Кнопка "Назад" */}
            <div style={{ display: "block", textAlign: "left", marginBottom: '25px' }}>
                <Button onClick={() => navigate(-1)}>Назад</Button>
            </div>

            {/* Карточка кредита */}
            <Card
                style={{ marginBottom: 24, borderRadius: 12, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)' }}
                title={<span>Договор №{credit.id}</span>}
                extra={
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <strong>Статус:</strong>
                        <span style={{ color: credit.status === 'active' ? 'red' : 'green' }}>
                            {credit.status === 'active' ? 'Не погашен' : 'Погашен'}
                        </span>
                        {credit.status === 'active' && role === 'user' && (
                            <Button type="primary" onClick={() => setIsModalVisible(true)}>
                                Внести платёж
                            </Button>
                        )}
                        {credit.status === 'active' && role === 'employee' && (
                            <Button type="primary">Начислить просрочку</Button>
                        )}
                    </div>
                }
            >
                <Row gutter={20}>
                    <Col span={12}>
                        <Paragraph><strong>Сумма кредита:</strong> {credit.sum} {credit.currency}</Paragraph>
                        <Paragraph><strong>Дата выдачи:</strong> {moment(credit.issued_at).format('DD.MM.YYYY')}</Paragraph>
                        <Paragraph><strong>Остаток:</strong> {credit.status === 'active' ? credit.sum : 0} {credit.currency}</Paragraph>
                        {(role === 'user' || role === 'admin') && (
                            <Paragraph><strong>Сотрудник:</strong> {credit.employee_id}</Paragraph>
                        )}
                    </Col>
                    <Col span={12}>
                        <Paragraph><strong>Процентная ставка:</strong> {credit.percent}%</Paragraph>
                        <Paragraph><strong>Дата возврата:</strong> {moment(credit.return_at).format('DD.MM.YYYY')}</Paragraph>
                        <Paragraph><strong>Крайний срок:</strong> {moment(credit.return_at).format('DD.MM.YYYY')}</Paragraph>
                        {(role === 'employee' || role === 'admin') && (
                            <Paragraph><strong>Пользователь:</strong> {credit.user_id}</Paragraph>
                        )}
                    </Col>
                </Row>
            </Card>

            {/* История платежей */}
            <Card title="История платежей" style={{ borderRadius: 12, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)', marginBottom: 24 }}>
                <HistoryPaymentsTabs payments={payments} overdue={overdue} />
            </Card>

            {/* Модальное окно для платежа */}
            <PayForm
                isVisible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                onPay={handlePay}
                currency={credit.currency} // Передаем валюту для отображения в форме
            />
        </div>
    );
};

export default CreditDetailsPage;