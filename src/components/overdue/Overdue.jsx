// Просрочка:
//      Идентификатор
//      Статус [Оплачено/Не оплачено]
//      Сумма
//      Дата начисления
//      Под капотом:
//              Идентификатор договора

import {Button, Card, Col, Row, Typography} from "antd";
import moment from "moment";
import React from "react";

const { Paragraph } = Typography;
const OverdueCard = ({ overdue }) => (
    <Card
        style={{marginBottom: 16, borderRadius: 12, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
            backgroundColor: overdue.status === 'Не оплачено' ? '#ffebee' : '#e8f5e9', width: '100%'}}
        title={<Paragraph style={{textAlign: 'left'}}><strong>Идентификатор:</strong> {overdue.id}</Paragraph>}
        extra={
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <strong>Статус:</strong><span style={{color: overdue.status === 'Оплачено' ? 'green' : 'red'}}>{' '}{overdue.status}</span>
                {overdue.status === 'Не оплачено' ? <Button type="primary">Оплатить</Button> : <> </>}
            </div>}>
        <Row gutter={20}>
            <Col span={12} style={{textAlign: 'left'}}>
                <Paragraph><strong>Сумма:</strong> {overdue.amount} ₽</Paragraph>
                <Paragraph><strong>Дата начисления:</strong> {moment(overdue.chargeDate).format('DD.MM.YYYY')}</Paragraph>
            </Col>
            <Col span={12} style={{textAlign: 'left'}}>
                <Paragraph><strong>Договор ID:</strong> {overdue.deal_id}</Paragraph>
            </Col>
        </Row>
    </Card>
);

export default OverdueCard;