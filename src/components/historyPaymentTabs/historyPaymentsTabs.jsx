import PaymentCard from "../paymentCard/PaymentCard.jsx";
import OverdueCard from "../overdue/Overdue.jsx";
import {Tabs} from "antd";
import React from "react";
const { TabPane } = Tabs;
const HistoryPaymentsTabs = ({payments, overdue}) => {


    return (
        <div>
            <Tabs defaultActiveKey="payments">
                <TabPane tab="Платежи" key="payments">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {payments.map(payment => (
                            <PaymentCard key={payment.id} payment={payment} />
                        ))}
                    </div>
                </TabPane>
                <TabPane tab="Просрочки" key="overdue">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {overdue.map(overdue => (
                            <OverdueCard key={overdue.id} overdue={overdue} />
                        ))}
                    </div>
                </TabPane>
            </Tabs>
        </div>
    )
}

export default HistoryPaymentsTabs;