
// Платёж:
//      Идентификатор
//      Статус
//      Сумма
//      Метод оплаты
//      Дата платежа
//      Под капотом:
//          Идентификатор кредитного договора

import {Card, Col, Row, Typography} from "antd";
import moment from "moment/moment.js";
import React from "react";
const { Title, Paragraph } = Typography;
const PaymentCard = ({ payment }) => (
    <Card
        style={{marginBottom: 16, borderRadius: 12, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'}}
        title={<Paragraph style={{textAlign: 'left'}}><strong>Идентификатор:</strong> {payment.id}</Paragraph>}
        extra={<div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
            <strong>Статус:</strong>
            <span style={{color: payment.status === 'Успешно' ? 'green' : 'red'}}>{' '}{payment.status}</span>
        </div>}>
        <Row gutter={20}>
            <Col span={12} style={{textAlign: 'left'}}>
                <Paragraph><strong>Сумма:</strong> {payment.amount} ₽</Paragraph>
                <Paragraph><strong>Дата платежа:</strong> {moment(payment.paymentDate).format('DD.MM.YYYY')}</Paragraph>
            </Col>
            <Col span={12} style={{textAlign: 'left'}}>
                <Paragraph><strong>Метод оплаты:</strong> {payment.paymentMethod}</Paragraph>
            </Col>
        </Row>
    </Card>
);

export default PaymentCard;